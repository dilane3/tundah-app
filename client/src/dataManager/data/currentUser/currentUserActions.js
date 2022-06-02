import {
  LOGIN,
  LOGOUT,
  DELETE_POST,
  UPDATE_POST,
  CREATE_POST,
  UPDATE_PROFIL,
  UPDATE_USER,
  LIKE_POST,
  ADD_FOLLOWER,
  ADD_FOLLOWING,
  DELETE_FOLLOWER,
  DELETE_FOLLOWING,
} from "./type";

/**
 * This action allow the user to connect himself.
 * The data object contains all the personal information
 * @param {Object} data
 * @returns
 */
const login = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};

const logout = () => {
  return {
    type: LOGOUT,
  };
};

const deletePost = (idPost) => {
  return {
    type: DELETE_POST,
    payload: idPost,
  };
};

const editPost = (idPost, data) => {
  return {
    type: UPDATE_POST,
    payload: {
      idPost,
      data,
    },
  };
};

const createPost = (post) => {
  return {
    type: CREATE_POST,
    payload: post,
  };
};

const updateProfil = (profil) => {
  return {
    type: UPDATE_PROFIL,
    payload: profil,
  };
};

const updateUser = (data) => {
  return {
    type: UPDATE_USER,
    payload: data,
  };
};

const likeUserPost = (idPost) => {
  return {
    type: LIKE_POST,
    payload: idPost,
  };
};

const addFollower = (user) => {
  return {
    type: ADD_FOLLOWER,
    payload: user,
  };
};

const addFollowing = (user) => {
  return {
    type: ADD_FOLLOWING,
    payload: user,
  };
};

const deleteFollower = (userId) => {
  return {
    type: DELETE_FOLLOWER,
    payload: userId,
  };
};

const deleteFollowing = (userId) => {
  return {
    type: DELETE_FOLLOWING,
    payload: userId,
  };
};

export {
  login,
  logout,
  deletePost,
  editPost,
  createPost,
  updateProfil,
  updateUser,
  likeUserPost,
  addFollower,
  addFollowing,
  deleteFollower,
  deleteFollowing,
};
