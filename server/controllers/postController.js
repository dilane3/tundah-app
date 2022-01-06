import { config } from "dotenv";
import Subscriber from "../entities/Subscriber.js";
import Expert from "../entities/Expert.js";
import Post from "../entities/Post.js";
import PostModel from "../models/PostModel.js";
import { response } from "express";
import { error } from "neo4j-driver";

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
    const {skip, limit} = req.query

    console.log(req.query)

    if (skip, limit) {
      const { data, error } = await postModel.getAllPosts(skip, limit);

      console.log(data)
  
      if (data !== undefined) {
        res.status(200).json(data);
      } else {
        res.status(404).json(error);
      }
    } else {
      return res.status(400).json({message: "Provide both skip and limit integer values"})
    }

  };

  // Algorithm
  /**
   * we first delete the id send by the form
   * then we retrieve the infos from the form body
   * we create a new postModel Object
   * */
  static createPost = async (req, res) => {
    const { content, files_list, region, tribe } = req.body;

    const user = req.user;
    console.log(user)

    if (content && region && tribe) {
      const { data, error } = await user.createPost(
        content,
        files_list,
        region,
        tribe
      );

      if (data !== undefined) {
        res
          .status(201)
          .json({ message: "New post successfully created", data });
      } else {
        res.status(404).json({ error });
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
    const { content, files_list, region, tribe } = req.body;

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
      res.status(500).json({ message: "Error during the post update" });
    }
  };

  // Algorithm
  /**
   * We first retrieve the post id from the api link
   * we then verify if the id exist
   * if it exist
   * * we retrieve the current user from the api req.user
   * * we also create a new postModel object
   * * we then verify if the user is connected and it's role to see if he is an expert
   * * if he is an expert
   *  * we the perform the operation and send the success response
   *  * else we send a not authorized operation response
   *
   * @param {*} req
   * @param {*} res
   */
   static updatePostValidation = async (req, res) => {
    const { id } = req.params;

    if (id) {
      const user = req.user;

      if (user.getRole === 1) {
        const { data, error } = await user.validatePost(id);

        if (data !== undefined) {
          res
            .status(200)
            .json({ messsage: "The post has successfully been approved!!" });
        } else {
          res.status(404).json(error);
        }
      } else {
        res.status(401).json({
          message: "You are not an expert, you cannot validate a post!",
        });
      }
    } else {
      res
        .status(500)
        .json({ message: "An error occured during the operation" });
    }
  };

  // Algorithm
  /**
   * * We first retrieve the id from the api requests
   * * we then verify if the id exists
   *  * if the id exist we execute the function and retrieve the returned value
   *   * if the returned data is not undefined,
   *    * then we send the success return to the api call
   *   * else we send the error to the api call
   *  * else we return the server error
   * @param {*} req
   * @param {*} res
   */
  static likePost = async (req, res) => {
    const { id } = req.params;

    if (id) {
      const user = req.user;

      const post = new Post();

      const { data, error } = await user.likePost(id);

      if (data !== undefined) {
        res
          .status(200)
          .json({data});
      } else {
        res.status(404).json(error);
      }
    } else {
      res
        .status(500)
        .json({ message: "An error occured during the process!!" });
    }
  };
}

export default PostController;
