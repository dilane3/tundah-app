import express from "express";
import PostController from "../controllers/postController.js";
import authenticationMiddleware from "../middlewares/authentication.js";
import uploadImage from "../utils/uploadImage.js";
import uploadVideo from '../utils/uploadVideo.js';

const postRouter = express.Router();

const {
  getPost,
  getAllPosts,
  getAllProposedPost,
  getSearchedPosts,
  createPost,
  likePost,
  updatePostValidation,
  deletePost,
  updatePost,
} = PostController;

// Router for the retrieval of a post using it's id
// This can be performed by all the users
postRouter.get("/:id", getPost);

// Router for the the retrieval of all the posts
// This can be performed by all the users
postRouter.get("/", getAllPosts);

// Router for the the retrieval of all the proposed posts
// This can be performed by all the users
postRouter.get("/proposed", getAllProposedPost)

// Router for the the retrieval of all the posts
// This can be performed by all the users
postRouter.get("/search/:value", getSearchedPosts);

// Router for the creation of a post using the post form info and the user id
// This can be performed only by connected users
postRouter.post(
  "/create/video", 
  authenticationMiddleware, 
  uploadVideo.single("video"),
  createPost
);

// Router for the creation of a post using the post form info and the user id with images
// This can be performed only by connected users
postRouter.post(
  "/create/images", 
  authenticationMiddleware, 
  uploadImage.array("images", 10),
  createPost
)

// Router for the like of a post using the post id and user id
// This can be performed only by connected users
postRouter.post("/like/:id", authenticationMiddleware, likePost);

// Router for the delete of a post using the post id
// This can be performed only by connected  expert users
postRouter.delete("/delete/:id", authenticationMiddleware, deletePost);

// Router for the update of a post using the post id and user id
// This can be performed only by connected expert users
postRouter.patch(
  "/update/:id",
  authenticationMiddleware,
  updatePost
);

// Router for the like of a post using the post id and user id
// This can be performed only by connected users
postRouter.patch(
  "/validate/:id",
  authenticationMiddleware,
  updatePostValidation
);

export default postRouter;
