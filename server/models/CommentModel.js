import { config } from "dotenv"
import { nanoid } from "nanoid";

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
      const result = await session.run(query, {id})

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

  async getCommentsAuthor(result) {
    const session = dbConnect()

    try {
      const comments = []

      for (let record of result.records) {
        const comment = record.get("comment").properties
        let query = `
          MATCH (comment:Comment{id: $id}) -[:COMMENTED_BY]-> (user:Subscriber)
          RETURN user
        `
        const response = await session.run(query, {id: comment.id})

        comments.push({...comment, idAuthor: response.records[0].get("user").properties.id})
      }

      return comments
    } catch (err) {
      console.log(err)
      return null
    } finally {
      session.close()
    }
  }

  /**
   * This method retrieves all the avalaible comments that belongs to a specific post
   *  * @param {string} idPost
   */
   async getAllComments(idPost) {
    const session = dbConnect();

    try {
      const query = `
        MATCH (post:Post{id: $idPost}) - [HAS_COMMENTS] -> (comment:Comment)
        RETURN comment
      `;
      const result = await session.run(query,{
        idPost
      });

      let commentData = (await this.getCommentsAuthor(result))
      console.log(commentData)

      if (!commentData) {
        commentData = result.records.map((record) => {
          return record.get("comment").properties;
        });
      }

      return { data: commentData };
    } catch (err) {
      console.log(err)
      return { error: "Error while getting the comments" };
    } finally {
      await session.close();
    }
  }

  /**
  * This method create a new comment
  *  @param {string} idComment
  * @param {string} content
  *  @param {boolean} edited
  * @param {string} idUser
  * @param {string} idPost
  */
  async createComment(content, idUser, idPost, idComment){
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
            edited: ${false} 
          }
        ) - [:COMMENTED_BY] -> (user)
        CREATE (comment) - [:BELONGS_TO] -> (post)
        CREATE (post) - [:HAS_COMMENT] -> (comment)
        RETURN comment
      `
      console.log("text")
      console.log({idComment, query})
      const result = await session.run(query, {
        id: nanoid(20),
        content, 
        creation_date: Date.now(),
        idUser,
        idPost,
        idComment
      })
      
      if (result.records.length > 0) {
        let commentData = result.records[0].get("comment").properties;

        console.log("text")
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
  * This method response to an existing comment
  *  @param {string} idComment
  * @param {string} content
  *  @param {boolean} edited
  * @param {string} idUser
  * @param {string} idPost
  */
   async responseComment(content, idUser, idPost, idComment){
    const session = dbConnect();

    try {
      const query =`
        MATCH (user: Subscriber {id: $idUser})
        MATCH (post: Post {id: $idPost})
        MATCH (commenthost: Comment{id: $idComment})
        WITH user, post, commenthost
        CREATE(comment:Comment
          {
            id: $id,
            content: $content, 
            creation_date: $creation_date,
            edited: ${false} 
          }
        ) - [:COMMENTED_BY] -> (user)
        CREATE (comment) - [:BELONGS_TO] -> (post)
        CREATE (post) - [:HAS_COMMENT] -> (comment)
        CREATE (commenthost) - [:HAS_RESPONSE] -> (comment)
        RETURN comment
      `
      
      const result = await session.run(query, {
        id: nanoid(20),
        content, 
        creation_date: Date.now(),
        idUser,
        idPost,
        idComment
      })
      
      if (result.records.length > 0) {
        let commentData = result.records[0].get("comment").properties;

        console.log("text")
        return { data: commentData };
      } else {
        return { data: null };
      }

    } catch(error){
      console.log(error)
      return { error: "Error while answering comment!"}
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
      console.log({result: result.records[0], query})
     
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
        MATCH (comment:Comment {id: $id}) -[:COMMENTED_BY]-> (user:Subscriber{id: $idUser})
        MATCH (comment) -[:BELONGS_TO]-> (post:Post{id: $idPost})
        DETACH DELETE comment
      `;

      await session.run(query, {
        id,
        idPost,
        idUser,
      });

      return { data: "The comment has successfully been deleted" };
    } catch (error) {
      return { error: "The comment has not been found" };
    } finally {
      await session.close();
    }
  }    
}    

export default CommentModel