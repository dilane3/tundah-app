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
  * @param {string} idUser
  * @param {string} idPost
  */
  async createComment(content, idUser, idPost){
    const session = dbConnect();

    try {
      const query =`
        MATCH (user: Subscriber {id: $idUser})
        MATCH (post: Post {id: $idPost})
        CREATE(comment:comment
          {
            id: $id,
            content: $content, 
            creation_date: $creation_date,
            edited: $edited, 
          }
        ) - [:COMMENT_BY] -> (user)
        CREATE (comment) - [:ABOUT_THIS] -> (post)
        RETURN comment
      `
      const result = await session.run(query, {
        id: nanoid(20),
        content, 
        creation_date: Date.now(),
        edited:false, 
      })

      if (result.records.length > 0) {
        const commentData = result.records[0].get("comment").properties;

        return { data: commentData };
      } else {
        return { data: null };
      }

    } catch(error){
      return { error: "Error while creating comment!"}
    } finally {
      await session.close();
    }
  }

  /**
  * This method update a comment
  * @param {string} idComment
  * @param {string} idUser
  * @param {string} content
  * @param {boolean} edited
  */
   async updateComment (idComment, idUser, content, edited) {
    const session = dbConnect();

    try {
      const query =`
        MATCH (comment:Comment {id: $idComment}) - [:COMMENT_BY] -> (user:Susbcriber{id: $idUser})
        MATCH (comment) - [:ABOUT_THIS] -> (post:Post{id: $idPost})
        SET
        comment.content = $content,
        comment.edited = $edited, 
        RETURN comment
      `
      const result = await session.run(query, {
        idUser,
        idUser,
        content,
        edited:true,
      })

      if (result.records.length > 0){
        const commentData = result.records[0].get("comment").properties

        return {data: commentData}
      } else {
        return {data: null}
      }

    } catch(error){
      return { error: "The comment has not been found !"}
    } finally {
      await session.close();
    }
  }
      
  /**
  * This method delate a comment
  * @param {string} id 
  * @param {string} cotent
  * @param {boolean} edited
  */
   async delateComment (idComment, idUser, content) {
    const session = dbConnect();

    try {
      const query = `
        MATCH (comment:Comment {id: $idComment}) - [:COMMENT_BY] -> (user:Susbcriber{id: $idUser})
        MATCH (comment) - [:ABOUT_THIS] -> (post:Post{id: $idPost})
        DETACH DELETE comment
        RETURN comment
      `;

      const result = await session.run(query, {
        idComment: idComment,
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