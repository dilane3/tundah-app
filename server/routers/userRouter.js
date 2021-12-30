import express from 'express'
import UserController from '../controllers/userController.js'
import authenticationMiddleware from '../middlewares/authentication.js'
import uploadImage from '../utils/uploadImage.js'

const userRouter = express.Router()

const {
  getUser,
  signup,
  signin,
  updateUser,
  deleteUser,
  uploadProfilPhoto,
  addExpert
} = UserController

userRouter.get("/:id", authenticationMiddleware, getUser)
userRouter.post("/signup", signup)
userRouter.post("/signin", signin)
userRouter.patch("/:id", updateUser)
userRouter.delete("/:id", deleteUser)
userRouter.post("/change_profil", authenticationMiddleware, uploadImage.single('profil'), uploadProfilPhoto)
userRouter.post("/add_expert", authenticationMiddleware, addExpert)

export default userRouter