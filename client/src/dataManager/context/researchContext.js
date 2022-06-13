import React from "react";

const researchContext = React.createContext({
  postsResults: [],
  query: "",
  target: "",
  addResults: (postsResults) => {},
  changeQuery: (query) => {},
  setTarget: (target) => {},
});

export default researchContext;
