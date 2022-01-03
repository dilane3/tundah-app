import createComment from "./createComment.js";

export default {
  paths: {
    "/comments/create": {
      ...createComment
    }
  }
}