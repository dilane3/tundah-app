import { createContext } from "react";

const FollowersSuggestionContext = createContext({
  suggestions: [],
  addSuggestions: (suggestionList) => {},
  removeSuggestion: (userId) => {},
});

export default FollowersSuggestionContext;
