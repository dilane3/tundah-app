import express from 'express'
import CommentController from '../controllers/commentController.js'

const commentRouter = express.Router()

const {
  getComment,
  createComment,
  updateComment,
  deleteComment
} = CommentController

commentRouter.get("/:id", getComment)
commentRouter.post("/create", createComment)
commentRouter.patch("/update", updateComment)
commentRouter.delete("/delete", deleteComment)

export default commentRouter