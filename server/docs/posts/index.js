import createPost from "./createPost.js";
import deletePost from "./deletePost.js";
import getAllPost from "./getAllPost.js";
import getPost from "./getPost.js";
import likePost from "./likePost.js";
import updatePost from "./updatePost.js";
import validatePost from "./validatePost.js";

export default {
  paths: {
    '/posts/': {
      ...getAllPost
    },

    '/posts/:id': {
      ...getPost
    },

    '/posts/create': {
      ...createPost
    },

    '/posts/like/:id': {
      ...likePost
    },

    '/posts/delete/:id': {
      ...deletePost
    },

    '/posts/update/:id': {
      ...updatePost
    },

    '/posts/validate/:id': {
      ...validatePost
    }
  }
}