import express from 'express'
import UserController from '../controllers/userController.js'
import authenticationMiddleware from '../middlewares/authentication.js'
import upload from '../utils/upload.js'

const userRouter = express.Router()

const {
  getUser,
  signup,
  signin,
  updateUser,
  deleteUser,
  uploadProfilPhoto
} = UserController

userRouter.get("/:id", authenticationMiddleware, getUser)
userRouter.post("/signup", signup)
userRouter.post("/signin", signin)
userRouter.patch("/:id", updateUser)
userRouter.delete("/:id", deleteUser)
userRouter.post("/change_profil", authenticationMiddleware, upload.single('file'), uploadProfilPhoto)

export default userRouter