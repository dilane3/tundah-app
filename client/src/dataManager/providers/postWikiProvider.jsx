import { useReducer, useState } from "react";
import { addWikiPosts } from "../data/postWiki/wikiPostAction";
import wikiPostsReducer from "../data/postWiki/wikiPostReducer";
import postsWikiContext from "../context/postWikiContext";

const PostWikiProvider = ({ children }) => {
  const [wikiPosts, dispatch] = useReducer(wikiPostsReducer, []);
  const [wikiPostsArgs, setWikiPostsArgs] = useState({
    next: false,
    skip: 0,
  });

  // posts wiki actions
  const postsAddWikiPosts = (posts) => {
    dispatch(addWikiPosts(posts));
  };

  const setMoreWikiPostArgs = (next, skip) => {
    setWikiPostsArgs((state) => ({ ...state, next, skip }));
  };

  const postsWikiContextValue = {
    wikiPosts,
    ...wikiPostsArgs,
    addPosts: postsAddWikiPosts,
    setMoreWikiPostArgs,
  }

  return (
    <postsWikiContext.Provider value={postsWikiContextValue}>
      {children}
    </postsWikiContext.Provider>
  )
}

export default PostWikiProvider