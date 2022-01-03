import createComment from "./createComment.js";
import deleteComment from "./deleteComment.js";
import getComment from "./getComment.js";
import updateComment from "./updateComment.js";

export default {
  paths: {
    "/comments/:id": {
      ...getComment
    },

    "/comments/create": {
      ...createComment
    },

    "/comments/update/:id": {
      ...updateComment
    },

    "/comments/delete/:id": {
      ...deleteComment
    }
  }
}