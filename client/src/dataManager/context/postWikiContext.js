import React from 'react'

const postsWikiContext = React.createContext({
  wikiPosts: [],
  next: false,
  skip: 0,
  
  addPosts: (wikiPosts) => {},
//   deletePost: (idPost) => {},
//   updatePost: (idPost, data) => {},
//   addPost: (post) => {},
  setMoreWikiPostArgs: (next, skip) => {}
})

export default postsWikiContext