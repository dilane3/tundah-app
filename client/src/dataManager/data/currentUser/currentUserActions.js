import {
  LOGIN,
  LOGOUT,
  DELETE_POST,
  UPDATE_POST,
  CREATE_POST,
  UPDATE_PROFIL,
  UPDATE_USER
} from "./type"

/**
 * This action allow the user to connect himself.
 * The data object contains all the personal information
 * @param {Object} data 
 * @returns 
 */
const login = (data) => {
  return {
    type: LOGIN,
    paylaod: data
  }
}

const logout = () => {
  return {
    type: LOGOUT
  }
}

const deletePost = (idPost) => {
  return {
    type: DELETE_POST,
    paylaod: idPost
  }
}

const editPost = (idPost, data) => {
  return {
    type: UPDATE_POST,
    paylaod: {
      idPost,
      data
    }
  }
}

const createPost = (post) => {
  return {
    type: CREATE_POST,
    paylaod: post
  }
}

const updateProfil = (profil) => {
  return {
    type: UPDATE_PROFIL,
    paylaod: profil
  }
}

const updateUser = (data) => {
  return {
    type: UPDATE_USER,
    paylaod: data
  }
}

export {
  login,
  logout,
  deletePost,
  editPost,
  createPost,
  updateProfil,
  updateUser
}