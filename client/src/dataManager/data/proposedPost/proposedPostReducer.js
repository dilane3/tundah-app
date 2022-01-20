import {
  DELETE_POST,
  ADD_POSTS,
  ADD_POST,
  VALIDATE_POST
} from "./type"

const proposedPostsReducer = (state = [], action) => {
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
            posts.push(post)
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

    case VALIDATE_POST: {
      return state
    }

    default: return state
  }
}

export default proposedPostsReducer