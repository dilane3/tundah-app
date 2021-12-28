import express from 'express'
import UserController from '../controllers/userController.js'

const userRouter = express.Router()

const {
  getUser,
  signup,
  signin,
  updateUser,
  deleteUser
} = UserController

userRouter.get("/:id", getUser)
userRouter.post("/signup", signup)
userRouter.post("/signin", signin)
userRouter.patch("/:id", updateUser)
userRouter.delete("/:id", deleteUser)

export default userRouter