import { config } from "dotenv";
import Comment from "../entities/Comment.js"
import CommentModel from "../models/CommentModel.js"

// fetching data from .env file
config();

const { SECRET_CODE_TOKEN } = process.env;

class CommentController {
  static getComment = async (req, res) => {
    const {id} = req.params

    if (id) {
      const commentModel = new CommentModel()

      const {data, error} = await commentModel.getComment(id)

      if (data !== undefined) {
        res.status(200).json(data)
      } else {
        res.status(404).json(error)
      }
    } else {
      res.status(400).json({message: "You need to provide an id"})
    }
  }

  // Algorithm
  /**
   * we get the post id from the url
   * we verify if the id post is found
   * *we create a new commentModel object
   * *then we use it to retrieve all the comments with the getAllComments method
   * *we use retrieve this in data and error
   * *if data is not undefined
   * * *we return the data
   * *else
   * * *we return the error
   * else
   * *we send and error message
   * @param {*} req
   * @param {*} res
   * */
  static getAllComments = async (req, res) => {
    const {idPost} = req.params;
    console.log(idPost)
    if (idPost) {
      const commentModel = new CommentModel();

      const {data, error} = await commentModel.getAllComments(idPost);

      if (data !== undefined) {
        res.status(200).json(data)
      } else {
        res.status(404).json(error)
      }
    } else {
      res.status(500).json({message: "Provide an id post"})
    }
    

  }

  // Algorithm
  /**
   * we first delete the id send by the form
   * then we retrieve the infos from the form body
   * we create a new commentModel Object
  */
  static createComment = async (req, res) => {
    const {
      content,
      idPost
    } = req.body

    const user = req.user;

    if (content){
      const { data, error } = await user.writeComment({content, idUser: user.getId, idPost});

      if (data !== undefined) {
        res.status(201).json({ message: "New comment successfully created !" , data});
      } else {
        res.status(400).json({ error });
      }
    } else {
      res.status(500).json({ message: "Somethings happened while creating a comment"})  
    }
  }
  
  // Algorithm
  /**
   * We first retrieve the id from the request url
   * Then we retrieve the form informations
   * if the id and form informations exist
   * * we retrieve the user and post object
   * * we create a commentModel object
   * * we call the updatecomment method and retrieve the data and error variable
   * * if data exits
   *   * sucess
   * * else
   *   * data doesn't exist
   * else
   *  * we got an incomplete request
   * @param {*} req
   * @param {*} res
   */

  static updateComment = async (req, res) => {
    const { id } = req.params;
   
    const {
      content,
      idPost
    } = req.body;

    if (id && content){
      const user = req.user;
      // const post = req.post;
      console.log("texte")
      const commentModel = new CommentModel();
      const {data, error} = await commentModel.updateComment(
        id,
        content,
        user.getId,
        idPost
      );

      if (data) {
        res.status(200).json(data);
      } else {
        if (data === undefined)
          res.status(500).json(error);
        else if (data === null)
          res.status(404).json({message: "comment doesn't exist"})
      } 
    } else {
      res.status(400).json({ message: "Provide a good comment id"});
    }
  }
  // Algorithm
  /**
   * We first verify if the post id was sent
   *  * then we create a commentModel object and call it's deletecomment method on it using that id
   *  * we return the length on array containing the removed object
   *  * if the length is greater than 0
   *  ** then the suppression has been successfull
   *  ** else the post doesn;t exist anymore
   * If the id is not sent
   *  * then we have a bad request return or server error
   * @param {*} req
   * @param {*} res
   */
  static deleteComment = async (req, res) => {
    const { id } = req.params;
    const {idPost} = req.body

    if(id && idPost){
      const commentModel = new CommentModel();
      const user = req.user;
      
      const {data, error} = await commentModel.deleteComment(
        id,
        user.getId,
        idPost
      );

      if (data !== undefined) {
        res.status(200)
          .json({ message: "The comment has successfully been deleted" });
      } else {
        res.status(500).json(error);
      }
    } else {
      res.status(500).json({ message: "id of comment or post are missing" });
    }
  }
}

export default CommentController