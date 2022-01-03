import createPost from "./createPost.js";

export default {
  paths: {
    '/posts/create': {
      ...createPost
    }
  }
}