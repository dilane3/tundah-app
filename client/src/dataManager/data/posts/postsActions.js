import {
  DELETE_POST,
  UPDATE_POST,
  ADD_POSTS,
  ADD_POST,
  ADD_COMMENT,
  ADD_COMMENTS,
  LIKE_POST,
  SHARE_POST,
  DELETE_COMMENT,
} from "./type";

const deletePost = (idPost) => {
  return {
    type: DELETE_POST,
    payload: idPost,
  };
};

const updatePost = (idPost, data) => {
  return {
    type: UPDATE_POST,
    payload: {
      idPost,
      data,
    },
  };
};

const addPosts = (posts) => {
  return {
    type: ADD_POSTS,
    payload: posts,
  };
};

const addPost = (post) => {
  return {
    type: ADD_POST,
    payload: post,
  };
};

const sharePost = (post) => {
  return {
    type: SHARE_POST,
    payload: post,
  };
};

const addComment = (idPost, comment, responseTo = null) => {
  return {
    type: ADD_COMMENT,
    payload: {
      idPost,
      comment,
      responseTo,
    },
  };
};

const deleteComment = (idComment, idPost) => {
  return {
    type: DELETE_COMMENT,
    payload: {
      idComment,
      idPost,
    },
  };
};

const addComments = (idPost, comments) => {
  return {
    type: ADD_COMMENTS,
    payload: {
      idPost,
      comments,
    },
  };
};

const likePost = (idPost, idUser) => {
  return {
    type: LIKE_POST,
    payload: {
      idPost,
      idUser,
    },
  };
};

export {
  deletePost,
  updatePost,
  addPosts,
  addPost,
  sharePost,
  addComment,
  addComments,
  likePost,
  deleteComment,
};
