import Expert from "../../../entities/Expert";
import Subscriber from "../../../entities/Subscriber";
import {
  LOGIN,
  LOGOUT,
  DELETE_POST,
  UPDATE_POST,
  CREATE_POST,
  UPDATE_PROFIL,
  UPDATE_USER,
  LIKE_POST
} from "./type"

const currentUserReducer = (state, action) => {
  switch (action.type) {
    case LOGIN: {
      const user = (new Subscriber(action.payload)).getUserData

      console.log(user)
      return user
    }

    case LOGOUT: {
      return null
    }

    case DELETE_POST: {
      if (action.payload) {
        const user = new Subscriber(state)

        user.deletePost(action.payload)

        return user.getUserData
      }

      return state
    }

    case UPDATE_POST: {
      if (action.payload) {
        const user = new Subscriber(state)

        const posts = user.getPosts()

        const index = posts.findIndex(post => post.getId === action.payload.idPost)

        if (index > -1) {
          posts[index].updatePost(action.payload.data)

          user.setAllPost(posts)
        }

        return user.getUserData
      }

      return state
    }

    case CREATE_POST: {
      if (action.payload) {
        const user = new Subscriber(state)

        user.createPost(action.payload)

        return user.getUserData
      }

      return state
    }

    case UPDATE_PROFIL: {
      if (action.payload) {
        const user = new Subscriber(state)

        user.setProfil(action.payload)

        console.log({user})

        return user.getUserData
      }

      return state
    }

    case UPDATE_USER: {
      if (action.payload) {
        const user = new Subscriber(state)

        user.updateUser(action.payload)

        return user.getUserData
      }

      return state
    }

    case LIKE_POST: {
      const idPost = action.payload 

      if (idPost) {
        const user = new Subscriber(state)

        user.likePost(idPost)

        return user.getUserData
      }

      return state
    }

    default: return state
  }
}

export default currentUserReducer