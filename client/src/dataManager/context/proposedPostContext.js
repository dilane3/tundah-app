import React from 'react'

const proposedPostsContext = React.createContext({
  proposedPosts: [],
  next: false,
  skip: 0,
  deletePost: (idPost) => {},
  updatePost: (idPost, data) => {},
  addPosts: (posts) => {},
  addPost: (post) => {},
  setMoreProposedPostsArgs: (next, skip) => {},
  validatePost: (idPost) => {}
})

export default proposedPostsContext