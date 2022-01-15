import React from 'react'

const postsContext = React.createContext({
  posts: [],
  next: false,
  skip: 0,
  deletePost: (idPost) => {},
  updatePost: (idPost, data) => {},
  addPosts: (posts) => {},
  addPost: (post) => {},
  setMorePostArgs: (next, skip) => {}
})

export default postsContext