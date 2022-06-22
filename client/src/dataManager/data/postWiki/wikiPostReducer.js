import { ADD_WIKIPOSTS } from "./type";
import Post from "../../../entities/Post";

const wikiPostsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_WIKIPOSTS: {
      const posts = [...state];

      if (action.payload) {
        for (let post of action.payload) {
          const p = posts.find((ps) => ps.id === post.id);

          if (!p) posts.push(new Post(post));
        }
      }

      return posts;
    }

    default: {
      console.log(action);

      return state;
    }
  }
};

export default wikiPostsReducer;
