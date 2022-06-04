import React from "react";

const currentUserContext = React.createContext({
  currentUser: null,
  login: (user) => {},
  logout: () => {},
  deletePost: (idPost) => {},
  editPost: (idPost, data) => {},
  createPost: (post) => {},
  updateProfil: (profil) => {},
  updateUser: (data) => {},
  likeUserPost: (idPost) => {},
  addFollower: (user) => {},
  addFollowing: (user) => {},
  deteleFollower: (userId) => {},
  deleteFollowing: (userId) => {},
});

export default currentUserContext;
