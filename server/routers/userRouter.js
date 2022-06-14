import express from "express";
import UserController from "../controllers/userController.js";
import authenticationMiddleware from "../middlewares/authentication.js";
import uploadImage from "../utils/uploadImage.js";

const userRouter = express.Router();

const {
  getUser,
  getCurrentUser,
  getSearchedUsers,
  signup,
  signin,
  updateUser,
  deleteUser,
  uploadProfilPhoto,
  deleteProfil,
  addExpert,
  uniqueEmail,
  uniqueUsername,
  followUser,
  getFollowersSuggestion,
} = UserController;

userRouter.get("/current", authenticationMiddleware, getCurrentUser);
userRouter.get("/:username", authenticationMiddleware, getUser);
userRouter.get("/search/:value", getSearchedUsers);
userRouter.get(
  "/followers/suggestion",
  authenticationMiddleware,
  getFollowersSuggestion
);
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
userRouter.patch("/update", authenticationMiddleware, updateUser);
userRouter.delete("/delete", deleteUser);
userRouter.post(
  "/change_profil",
  authenticationMiddleware,
  uploadImage.single("profil"),
  uploadProfilPhoto
);
userRouter.post("/delete_profil", authenticationMiddleware, deleteProfil);
userRouter.post("/add_expert", authenticationMiddleware, addExpert);
userRouter.post("/check_email", uniqueEmail);
userRouter.post("/check_username", uniqueUsername);
userRouter.post("/follow", authenticationMiddleware, followUser);

export default userRouter;
