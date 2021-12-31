import { config } from "dotenv";
import { nanoid } from "nanoid";
import dbConnect from "../utils/database.js";
import jwt from "jsonwebtoken";
import InterfacePostModel from "./interfaces/interfacePostModel.js";
import { error, session } from "neo4j-driver";

// fetching data from .env file
config();

const { SECRET_CODE_TOKEN } = process.env;

class PostModel extends InterfacePostModel {
  /**
   * This function get a specific user based on his id
   * @param {string} id
   */
  async getPost(id) {
    const session = dbConnect();

    try {
      const query = `
        MATCH (post:Post {id: $id})
        RETURN post
      `;
      const result = await session.run(query, { id: id });

      if (result.records.length > 0) {
        const postData = result.records[0].get("post").properties;

        return { data: postData };
      } else {
        return { data: null };
      }
    } catch (err) {
      return { error: "Error while getting a post" };
    } finally {
      await session.close();
    }
  }

  /**
   * This method retrieves all the avalaible posts
   */
  async getAllPosts() {
    const session = dbConnect();

    try {
      const query = `
        MATCH (post:Post)
        RETURN post
      `;
      const result = await session.run(query);

      const postData = result.records.map((record) => {
        return record.get("post").properties;
      });

      return { data: postData };
    } catch (err) {
      return { error: "Error while getting the posts" };
    } finally {
      await session.close();
    }
  }

  /**
   * This method create a new post
   * @param {string} content
   * @param {Array} files_list
   * @param {boolean} published
   * @param {string} region
   * @param {string} tribe
   * @param {string} idUser
   */
  async createPost(content, files_list, published, region, tribe, idUser) {
    const session = dbConnect();

    try {
      const query = `
        MATCH (user${published ? ":Expert" : ":Subscriber"} {id: $idUser})
        CREATE 
        (post:Post 
          { 
            id: $id,
            content: $content, 
            creation_date: $creation_date,
            modification_date: $modification_date, 
            files_list: $files_list, 
            published: $published, 
            region: $region,
            tribe: $tribe
          }
        ) - [${published ? ":PUBLISHED_BY" : ":PROPOSED_BY"}] -> (user)
        CREATE (user) - [${published ? ":PUBLISHED" : ":PROPOSED"}] -> (post)
        RETURN post
      `;

      const result = await session.run(query, {
        id: nanoid(20),
        content: content,
        creation_date: Date.now(),
        modification_date: Date.now(),
        files_list: files_list,
        published: published,
        region: region,
        tribe: tribe,
        idUser: idUser,
      });

      if (result.records.length > 0) {
        const postData = result.records[0].get("post").properties;

        return { data: postData };
      } else {
        return { data: null };
      }
    } catch (err) {
      console.log(err)
      return { error: "Error while creating the post" };
    } finally {
      await session.close();
    }
  }

  /**
   * This function deletes a post based on it's id's
   * @param {string} idPost
   * @param {string} idUser
   */
  async deletePost(idPost, idUser) {
    const session = dbConnect();

    try {
      const query = `
        MATCH (post:Post{id: $idPost}) -[:PUBLISHED_BY]-> (user:Expert{id: $idUser})
        DETACH DELETE post
      `;

      console.log({idPost, idUser, query})

      await session.run(query, {idPost, idUser});

      return {data: "The post has successfully been deleted"}
    } catch (err) {
      console.log(err)
      return { error: "The post has not been found" };
    } finally {
      await session.close();
    }
  }

  /**
   * This function updates a post based on it's id and the form data
   * @param {string} idPost
   * @param {string} content
   * @param {Array} files_list
   * @param {boolean} published
   * @param {string} region
   * @param {string} tribe
   * @param {string} idUser
   */
  async updatePost(
    idPost,
    content,
    files_list,
    region,
    tribe,
    idUser
  ) {
    const session = dbConnect();

    try {
      const query = `
      MATCH (post:Post {id: $idPost}) - [:PUBLISHED_BY] -> (user:Expert {id: $idUser})
      SET
        post.content = $content, 
        post.modification_date = $modification_date, 
        post.files_list = $files_list,
        post.region = $region,
        post.tribe = $tribe
      RETURN post
    `;
      const response = await session.run(query, {
        idPost,
        idUser,
        content,
        modification_date: Date.now(),
        files_list,
        region,
        tribe
      });

      if (response.records.length > 0) {
        const postData = response.records[0].get("post").properties;

        return { data: postData };
      } else {
        return { data: null };
      }
    } catch (err) {
      return { error: "The post has not been found" };
    } finally {
      await session.close();
    }
  }
}

export default PostModel;
