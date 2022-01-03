import express from 'express'
import CommentController from '../controllers/commentController.js'
import authenticationMiddleware from '../middlewares/authentication.js'

const commentRouter = express.Router()

const {
  getComment,
  createComment,
  updateComment,
  deleteComment
} = CommentController

commentRouter.get("/:id", authenticationMiddleware, getComment)
commentRouter.post("/create", authenticationMiddleware, createComment)
commentRouter.patch("/update/:id", authenticationMiddleware, updateComment)
commentRouter.delete("/delete/:id", authenticationMiddleware, deleteComment)

export default commentRouter