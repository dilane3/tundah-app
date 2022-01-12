import React from 'react'

const researchContext = React.createContext({
  postsResults: [],
  query: "",
  addResults: (posts) => {},
  changeQuery: (query) => {}
})

export default researchContext