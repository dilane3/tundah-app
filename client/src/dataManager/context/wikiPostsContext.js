import React from "react";

const wikiPostsContext = React.createContext({
    wikiPosts: [],
    next: false,
    skip: 0,
    deleteWikiPost: (idPost) => {},
    updateWikiPost: (idPost, data) => {},
    addWikiPosts: (posts) => {},
    addWikiPost: (post) => {},
    setMoreWikiPostArgs: (next, skip) => {}
})

export default wikiPostsContext;