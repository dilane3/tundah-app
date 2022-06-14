import {
  DELETE_POST,
  UPDATE_POST,
  ADD_POSTS,
  ADD_POST
} from "./wikiPostType"

const deletePost = (idPost) => {
  return {
    type: DELETE_POST,
    payload: idPost
  }
}

const updatePost = (idPost, data) => {
  return {
    type: UPDATE_POST,
    payload: {
      idPost,
      data
    }
  }
}

const addPosts = (posts) => {
  return {
    type: ADD_POSTS,
    payload: posts
  }
}

const addPost = (post) => {
  return {
    type: ADD_POST,
    payload: post
  }
}

export {
  deletePost,
  updatePost,
  addPosts,
  addPost
}