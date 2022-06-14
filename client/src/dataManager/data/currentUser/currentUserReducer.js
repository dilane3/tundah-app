import Subscriber from "../../../entities/Subscriber";
import {
  LOGIN,
  LOGOUT,
  DELETE_POST,
  UPDATE_POST,
  CREATE_POST,
  UPDATE_PROFIL,
  UPDATE_USER,
  LIKE_POST,
  ADD_FOLLOWER,
  ADD_FOLLOWING,
  DELETE_FOLLOWING,
  DELETE_FOLLOWER,
} from "./type";

const currentUserReducer = (state, action) => {
  switch (action.type) {
    case LOGIN: {
      const user = new Subscriber(action.payload).getUserData;

      console.log(user);
      return user;
    }

    case LOGOUT: {
      return null;
    }

    case DELETE_POST: {
      if (action.payload) {
        const user = new Subscriber(state);

        user.deletePost(action.payload);

        return user.getUserData;
      }

      return state;
    }

    case UPDATE_POST: {
      if (action.payload) {
        const user = new Subscriber(state);

        const posts = user.getPosts();

        const index = posts.findIndex(
          (post) => post.getId === action.payload.idPost
        );

        if (index > -1) {
          posts[index].updatePost(action.payload.data);

          user.setAllPost(posts);
        }

        return user.getUserData;
      }

      return state;
    }

    case CREATE_POST: {
      if (action.payload) {
        const user = new Subscriber(state);

        user.createPost(action.payload);

        return user.getUserData;
      }

      return state;
    }

    case UPDATE_PROFIL: {
      if (action.payload) {
        const user = new Subscriber(state);

        user.setProfil(action.payload);

        console.log({ user });

        return user.getUserData;
      }

      return state;
    }

    case UPDATE_USER: {
      if (action.payload) {
        const user = new Subscriber(state);

        user.updateUser(action.payload);

        return user.getUserData;
      }

      return state;
    }

    case LIKE_POST: {
      const idPost = action.payload;

      if (idPost) {
        const user = new Subscriber(state);

        user.likePost(idPost);
        console.log(user.getPosts);

        return new Subscriber(user.getUserData);
      }

      return state;
    }

    case ADD_FOLLOWER: {
      const userData = action.payload;

      if (userData) {
        const user = new Subscriber(state);

        user.addFollower(new Subscriber(userData));

        return user;
      }

      return state;
    }

    case ADD_FOLLOWING: {
      const userData = action.payload;

      if (userData) {
        const user = new Subscriber(state);

        user.addFollowing(new Subscriber(userData));

        return user;
      }

      return state;
    }

    case DELETE_FOLLOWING: {
      const userId = action.payload;

      if (userId) {
        const user = new Subscriber(state);

        user.deleteFollowing(userId);
        console.log(user.getFollowings);

        return user;
      }

      return state;
    }

    case DELETE_FOLLOWER: {
      const userId = action.payload;

      if (userId) {
        const user = new Subscriber(state);

        user.deleteFollower(userId);

        return user;
      }

      return state;
    }

    default:
      return state;
  }
};

export default currentUserReducer;
