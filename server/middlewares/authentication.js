import { config } from "dotenv";
import jwt from "jsonwebtoken";
import Subscriber from "../entities/Subscriber.js";
import Expert from "../entities/Expert.js";
import UserModel from "../models/UserModel.js";
import PostModel from "../models/PostModel.js";
import Admin from "../entities/Admin.js";

// fetching data from .env file
config();

const { SECRET_CODE_TOKEN } = process.env;

const authenticationMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    jwt.verify(token, SECRET_CODE_TOKEN, async (error, result) => {
      if (error) {
        return res.status(401).json({ message: "Not authorized" });
      }

      const userModel = new UserModel();
      const postModel = new PostModel();

      const { data } = await userModel.getUser(result.username);

      if (data) {
        const postdata = (await postModel.getMyPosts(data.id)).data;
        const { data: usersData, error } =
          await userModel.getFollowersAndFollowings(data.id);

        if (usersData) {
          const { followers, followings } = usersData;

          let user;

          if (data.role === 0) {
            user = new Subscriber({
              ...data,
              posts: postdata,
              followers,
              followings,
            });
          } else if (data.role === 1) {
            user = new Expert({
              ...data,
              posts: postdata,
              followers,
              followings,
            });
          } else {
            user = new Admin({ ...data, posts: [], followers, followings });
          }

          req.user = user;

          next();
        } else {
          return res.status(401).json({ message: "Not authorized" });
        }
      } else {
        return res.status(401).json({ message: "Not authorized" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Not authorized" });
  }
};

export default authenticationMiddleware;
