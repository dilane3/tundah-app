import {
  DELETE_POST,
  ADD_POSTS,
  ADD_POST
} from "./wikiPostType"
import Post from '../../../entities/Post'

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case DELETE_POST: {
      const posts = [...state]

      if (action.payload) {
        const index = posts.findIndex(post => post.getId === action.payload)
  
        if (index > -1) {
          posts.splice(index, 1)
        }
      }

      return posts
    }

    case ADD_POSTS: {
      const posts = [...state]

      console.log(action.payload)

      if (action.payload) {
        for (let post of action.payload) {
          const p = posts.find(ps => ps.id === post.id)

          if (!p)
            posts.push((new Post(post)).getData)
        }
      }

      return posts
    }

    case ADD_POST: {
      const posts = [...state]

      if (action.payload) {
        posts.push(action.payload)
      }

      return posts
    }

    default: return state
  }
}

export default postsReducer