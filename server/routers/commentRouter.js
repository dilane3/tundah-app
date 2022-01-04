import express from 'express'
import CommentController from '../controllers/commentController.js'
import authenticationMiddleware from '../middlewares/authentication.js'

const commentRouter = express.Router()

const {
  getComment,
  getAllComments,
  createComment,
  updateComment,
  deleteComment
} = CommentController

commentRouter.get("/:id", getComment)
commentRouter.get("/:idPost", authenticationMiddleware, getAllComments)
commentRouter.post("/create", authenticationMiddleware, createComment)
commentRouter.patch("/update/:id", authenticationMiddleware, updateComment)
commentRouter.delete("/delete/:id", authenticationMiddleware, deleteComment)

export default commentRouter