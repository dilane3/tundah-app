import React from 'react'

const postsContext = React.createContext({
  posts: [],
  next: false,
  skip: 0,
  deletePost: (idPost) => {},
  updatePost: (idPost, data) => {},
  addPosts: (posts) => {},
  addPost: (post) => {},
  addComments: (comments) => {},
  addComment: (comment) => {},
  likePost: (idPost, idUser) => {},
  setMorePostArgs: (next, skip) => {}
})

export default postsContext