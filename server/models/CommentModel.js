import { config } from "dotenv"
import { nanoid } from "nanoid";
import { error, session } from "neo4j-driver";

import InterfaceCommentModel from "../models/interfaces/interfaceCommentModel.js"
import dbConnect from "../utils/database.js"

// fetching data from .env file
config()

const {
  SECRET_CODE_TOKEN
} = process.env


class CommentModel extends InterfaceCommentModel {
  /**
  * This function get a specific comment based on his id
  * @param {string} id
  */
  async getComment (id) {
    const session = dbConnect()

    try{
      const query = `
        MATCH (comment:Comment{id: $id})
        RETURN comment
      `
      const result = await session.run(query, {'id': id} )

      if (result.records.length > 0){
        const commentData = result.records[0].get('comment').properties

        return {data: commentData}
      } else {
        return {data: null}
      }
    } catch (error){
      return {error: "Error while getting a comment"}
    } finally {
      await session.close()
    }
  }

  /**
  * This method create a new comment
  * @param {string} content
  *  @param {boolean} edited
  * @param {string} idUser
  * @param {string} idPost
  */
  async createComment(content, edited, idUser, idPost){
    const session = dbConnect();

    try {
      const query =`
        MATCH (user: Subscriber {id: $idUser})
        MATCH (post: Post {id: $idPost})
        WITH user, post
        CREATE(comment:Comment
          {
            id: $id,
            content: $content, 
            creation_date: $creation_date,
            edited: $edited 
          }
        ) - [:COMMENTED_BY] -> (user)
        CREATE (comment) - [:BELONGS_TO] -> (post)
        CREATE (post) - [:HAS_COMMENTS] -> (comment)
        RETURN comment
      `
      const result = await session.run(query, {
        id: nanoid(20),
        content: content, 
        creation_date: Date.now(),
        edited: edited, 
        idUser:idUser,
        idPost:idPost
      })
     
      if (result.records.length > 0) {
        const commentData = result.records[0].get("comment").properties;

        return { data: commentData };
      } else {
        return { data: null };
      }

    } catch(error){
      console.log(error)
      return { error: "Error while creating comment!"}
    } finally {
      await session.close();
    }
  }

  /**
  * This method update a comment
  * @param {string} id
  * @param {string} idUser
  * @param {string} idPost
  * @param {string} content
  * @param {boolean} edited
  */
   async updateComment (id, content, idUser, idPost) {
    const session = dbConnect();

    try {
      const query =`
        MATCH (comment:Comment {id: $id}) - [:COMMENTED_BY] -> (user:Subscriber{id: $idUser})
        MATCH (comment:Comment {id: $id}) - [:BELONGS_TO] -> (post:Post{id: $idPost})
        SET
          comment.content = $content,
          comment.edited = $edited 
        RETURN comment
      `
      const result = await session.run(query, {
        id,
        idUser,
        idPost,
        content,
        edited:true
      })
      console.log(result.records[0], query)
     
      if (result.records.length > 0){
        const commentData = result.records[0].get("comment").properties
        console.log(commentData)
        return {data: commentData}
      } else {
        return {data: null}
      }

    } catch(error){
      console.log(error)
      return { error: "The comment has not been found !"}
    } finally {
      await session.close();
    }
  }
      
  /**
  * This method delate a comment
  * @param {string} id 
  * @param {string} idUser
  * @param {string} idPost
  */
   async deleteComment (id, idUser, idPost) {
    const session = dbConnect();

    try {
      const query = `
        MATCH (comment:Comment {id: $id}) - [:COMMENT_BY] -> (user:Susbcriber{id: $idUser})
        MATCH (comment) - [:ABOUT_THIS] -> (post:Post{id: $idPost})
        DETACH DELETE comment
        RETURN comment
      `;

      const result = await session.run(query, {
        id: id,
        idPost: idPost,
        idUser: idUser,
      });
      const resultData = result.records.length;
      
      return { data: resultData };
    } catch (error) {
      return { error: "The comment has not been found" };
    } finally {
      await session.close();
    }
  }    
}    

export default CommentModel