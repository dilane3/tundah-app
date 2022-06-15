import Subscriber from "../../entities/Subscriber";
import { useState } from "react";
import FollowersSuggestionContext from "../context/followersSuggestionContext";

const FollowersSuggestionProvider = ({ children }) => {
  const [suggestions, setSuggestions] = useState([]);

  // Some handlers
  const handleAddSuggestions = (suggestionList) => {
    const suggestions = [];

    for (let user of suggestionList) {
      suggestions.push(new Subscriber(user));
    }

    setSuggestions(suggestions);
  };

  const handleRemoveSuggestion = (userId) => {
    const prevSuggestions = [...suggestions];

    const index = prevSuggestions.findIndex((user) => user.getId === userId);

    if (index > -1) {
      prevSuggestions.splice(index, 1);

      setSuggestions(prevSuggestions);
    }
  };

  const contextValue = {
    suggestions,
    addSuggestions: handleAddSuggestions,
    removeSuggestion: handleRemoveSuggestion,
  };
  return (
    <FollowersSuggestionContext.Provider value={contextValue}>
      {children}
    </FollowersSuggestionContext.Provider>
  );
};

export default FollowersSuggestionProvider;
