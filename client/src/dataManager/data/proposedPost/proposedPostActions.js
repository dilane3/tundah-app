import {
  DELETE_POST,
  UPDATE_POST,
  ADD_POSTS,
  ADD_POST,
  VALIDATE_POST
} from "./type"

const deleteProposedPost = (idPost) => {
  return {
    type: DELETE_POST,
    payload: idPost
  }
}

const updateProposedPost = (idPost, data) => {
  return {
    type: UPDATE_POST,
    payload: {
      idPost,
      data
    }
  }
}

const addProposedPosts = (posts) => {
  return {
    type: ADD_POSTS,
    payload: posts
  }
}

const addProposedPost = (post) => {
  return {
    type: ADD_POST,
    payload: post
  }
}

const validateProposedPost = (idPost) => {
  return {
    type: VALIDATE_POST,
    payload: idPost
  }
}

export {
  deleteProposedPost,
  updateProposedPost,
  addProposedPosts,
  addProposedPost,
  validateProposedPost
}