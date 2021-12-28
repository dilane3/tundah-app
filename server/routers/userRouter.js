import express from 'express'
import UserController from '../controllers/userController.js'
import authenticationMiddleware from '../middlewares/authentication.js'

const userRouter = express.Router()

const {
  getUser,
  signup,
  signin,
  updateUser,
  deleteUser
} = UserController

userRouter.get("/:id", authenticationMiddleware, getUser)
userRouter.post("/signup", signup)
userRouter.post("/signin", signin)
userRouter.patch("/:id", updateUser)
userRouter.delete("/:id", deleteUser)

export default userRouter