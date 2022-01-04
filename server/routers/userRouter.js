import express from 'express'
import UserController from '../controllers/userController.js'
import authenticationMiddleware from '../middlewares/authentication.js'
import uploadImage from '../utils/uploadImage.js'

const userRouter = express.Router()

const {
  getUser,
  getCurrentUser,
  signup,
  signin,
  updateUser,
  deleteUser,
  uploadProfilPhoto,
  addExpert,
  test
} = UserController

userRouter.get("/current", authenticationMiddleware, getCurrentUser)
userRouter.get("/:id", authenticationMiddleware, getUser)
userRouter.post("/signup", signup)
userRouter.post("/signin", signin)
userRouter.patch("/update", authenticationMiddleware, updateUser)
userRouter.delete("/delete", deleteUser)
userRouter.post("/change_profil", authenticationMiddleware, uploadImage.single('profil'), uploadProfilPhoto)
userRouter.post("/add_expert", authenticationMiddleware, addExpert)

export default userRouter