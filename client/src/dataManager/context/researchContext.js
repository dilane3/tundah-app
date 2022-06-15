import React from "react";

const researchContext = React.createContext({
  postsResults: [],
  usersResults: [],
  query: "",
  target: "",
  addResults: (postsResults) => {},
  addUserResults: (usersResults) => {},
  changeQuery: (query) => {},
  setTarget: (target) => {},
});

export default researchContext;
