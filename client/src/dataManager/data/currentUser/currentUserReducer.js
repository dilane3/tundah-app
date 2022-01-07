import Expert from "../../../entities/Expert";
import Subscriber from "../../../entities/Subscriber";
import {
  LOGIN,
  LOGOUT,
  DELETE_POST,
  UPDATE_POST,
  CREATE_POST,
  UPDATE_PROFIL,
  UPDATE_USER
} from "./type"

const currentUserReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN: {
      let user;

      if (action.payload.role === 1) {
        user = new Expert(action.payload)
      } else {
        user = new Subscriber(action.payload)
      }

      return user
    }

    case LOGOUT: {
      return null
    }

    case DELETE_POST: {
      if (action.payload) {
        const user = {...state}

        user.deletePost(action.payload)

        return user
      }

      return state
    }

    case UPDATE_POST: {
      if (action.payload) {
        const user = {...state}

        const posts = user.getPosts()

        const index = posts.findIndex(post => post.getId === action.payload.idPost)

        if (index > -1) {
          posts[index].updatePost(action.payload.data)

          user.setAllPost(posts)
        }

        return user
      }

      return state
    }

    case CREATE_POST: {
      if (action.payload) {
        const user = {...state}

        user.createPost(action.payload)

        return user
      }

      return state
    }

    case UPDATE_PROFIL: {
      if (action.payload) {
        const user = {...state}

        user.setProfil(action.payload)

        return user
      }

      return state
    }

    case UPDATE_USER: {
      if (action.payload) {
        const user = {...state}

        user.updateUser(action.payload)

        return user
      }

      return state
    }

    default: return state
  }
}

export default currentUserReducer