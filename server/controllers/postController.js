import { config } from "dotenv";
import Subscriber from "../entities/Subscriber.js";
import Expert from "../entities/Expert.js";
import Post from "../entities/Post.js";
import PostModel from "../models/PostModel.js";
import { response } from "express";

// fetching data from .env file
config();

const { SECRET_CODE_TOKEN } = process.env;

class PostController {
  // Algorithm
  /**
   * We get the post id from the url
   * We verify if the id is not null
   * * if true, we create a new postModel Object
   * * we execute the getPost(id) method and retrieve the data and error
   * * if the data is not undefined we send is back
   * * else we send the error
   * else we send an error message
   * @param {*} req
   * @param {*} res
   * */
  static getPost = async (req, res) => {
    const { id } = req.params;

    console.log(id);

    if (id) {
      const postModel = new PostModel();

      const { data, error } = await postModel.getPost(id);

      if (data !== undefined) {
        res.status(200).json(data);
      } else {
        res.status(404).json(error);
      }
    } else {
      res.status(500).json({ message: "You need to provide an id" });
    }
  };

  // Algorithm
  /**
   * we create a new postModel object
   * then we use it retrieve all the posts with the getAllPosts method
   * we use retrieve this in data and error
   * if data is not undefined
   * * we return the data
   * else
   * * we return the error
   * @param {*} req
   * @param {*} res
   * */
  static getAllPosts = async (req, res) => {
    const postModel = new PostModel();

    const { data, error } = await postModel.getAllPosts();

    if (data !== undefined) {
      res.status(200).json(data);
    } else {
      res.status(404).json(error);
    }
  };

  // Algorithm
  /**
   * we first delete the id send by the form
   * then we retrieve the infos from the form body
   * we create a new postModel Object
   * */
  static createPost = async (req, res) => {
    const {
      content,
      files_list,
      region,
      tribe
    } = req.body;

    const user = req.user;

    if (content && region && tribe) {
      const {data, error} = await user.createPost(content, files_list, region, tribe)

      if (data !== undefined) {
        res.status(201).json({ message: "New post successfully created", data });
      } else {
        res.status(500).json({ error });
      }
    } else {
      res.status(500).json({ error: "Please specify the post content" });
    }
  };

  // Algorithm
  /**
   * We first verify if the post id was sent
   *  * then we create a postModel object and call it's deletePost method on it using that id
   *  * we return the length on array containing the removed object
   *  * if the length is greater than 0
   *  ** then the suppression has been successfull
   *  ** else the post doesn;t exist anymore
   * If the id is not sent
   *  * then we have a bad request return or server error
   * @param {*} req
   * @param {*} res
   */
  static deletePost = async (req, res) => {
    const { id } = req.params;

    if (id) {
      const postModel = new PostModel();
      const user = req.user;

      const { data, error } = await postModel.deletePost(id, user.getId, user.getRole);
        
      if (data !== undefined) {
        res
          .status(200)
          .json({ message: "The post has successfully been deleted" });
      } else {
        res.status(500).json(error);
      }
    } else {
      res.status(500).json({ message: "Error while deleting the post" });
    }
  };

  // Algorithm
  /**
   * We first retrieve the id from the request url
   * Then we retrieve the form informations
   * if the id exist
   * * we retrieve the user object
   * * we create a postModel object
   * * we call the updatePost method and retrieve the data and error variable
   * * if data exits
   *   * sucess
   * * else
   *   * data doesn't exist
   * else
   *  * we got an incomplete request
   * @param {*} req
   * @param {*} res
   */
  static updatePost = async (req, res) => {
    const { id } = req.params;
    const {
      content,
      files_list,
      region,
      tribe
    } = req.body;

    if (id && content && region && tribe) {
      const user = req.user;

      const postModel = new PostModel();

      if (user.getRole === 1) {
        const { data, error } = await postModel.updatePost(
          id,
          content,
          files_list,
          region,
          tribe,
          user.getId
        );
  
        if (data) {
          res
            .status(200)
            .json({ message: "The post has successfully been updated" });
        } else {
          if (data === undefined)
            res.status(500).json(error);
          else if (data === null)
            res.status(500).json({message: "Provide a good post id"})
        }
      } else {
        res.status(401).json({message: "Not authorized"})
      }
    } else {
      res
        .status(500)
        .json({ message: "Error during the post update" });
    }
  };
}

export default PostController;
