import React from 'react'

const researchContext = React.createContext({
  postsResults: [],
  query: "",
  addResults: (postsResults) => {},
  changeQuery: (query) => {}
})

export default researchContext