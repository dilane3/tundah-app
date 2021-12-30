import express from 'express'
import PostController from '../controllers/postController.js'
import authenticationMiddleware from '../middlewares/authentication.js'
import upload from '../utils/upload.js'

const postRouter = express.Router()

const {
  getPost,
  getAllPosts,
  createPost,
  deletePost,
  updatePost
} = PostController

// Router for the retrieval of a post using it's id
// This can be performed by all the users
postRouter.get("/:id", getPost)

// Router for the the retrieval of all the posts
// This can be performed by all the users
postRouter.get("/", getAllPosts)

// Router for the creation of a post using the post form info and the user id
// This can be performed only by connected users
postRouter.post("/create", authenticationMiddleware, createPost)

// Router for the delete of a post using the post id
// This can be performed only by connected  expert users
postRouter.delete("/delete/:id", authenticationMiddleware, deletePost)

// Router for the update of a post using the post id and user id
// This can be performed only by connected expert users
postRouter.patch("/update/:id", authenticationMiddleware/*, upload.fields('file')*/, updatePost)

export default postRouter