import {
  DELETE_POST,
  UPDATE_POST,
  ADD_POSTS,
  ADD_POST,
  ADD_COMMENT,
  ADD_COMMENTS
} from "./type"

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

const addComment = (idPost, comment, responseTo = null) => {
  return {
    type: ADD_COMMENT,
    payload: {
      idPost,
      comment,
      responseTo
    }
  }
}

const addComments = (idPost, comments) => {
  return {
    type: ADD_COMMENTS,
    payload: {
      idPost,
      comments
    }
  }
}

export {
  deletePost,
  updatePost,
  addPosts,
  addPost,
  addComment,
  addComments
}