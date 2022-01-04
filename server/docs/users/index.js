import addExpert from "./addExpert.js";
import getCurrentUser from "./getCurrentUser.js";
import getUser from "./getUser.js";
import signin from "./signin.js";
import signup from "./signup.js";
import updateProfilePhoto from "./updateProfilePhoto.js";

export default {
  paths: {
    '/users/current': {
      ...getCurrentUser
    },

    '/users/{id}': {
      ...getUser
    },

    '/users/signup': {
      ...signup
    },

    '/users/signin': {
      ...signin
    },

    '/users/change_profil': {
      ...updateProfilePhoto
    },

    '/users/add_expert': {
      ...addExpert
    }
  }
}