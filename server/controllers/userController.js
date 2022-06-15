import { config } from "dotenv";
import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateEmail } from "../utils/validator.js";
import PostModel from "../models/PostModel.js";

// fetching data from .env file
config();

const { SECRET_CODE_TOKEN, EXPIRE_IN } = process.env;

class UserController {
  static getUser = async (req, res) => {
    const { username } = req.params;

    if (username) {
      // const user = req.user
      const userModel = new UserModel();
      const postModel = new PostModel();

      const { data, error } = await userModel.getUser(username);

      if (data !== undefined) {
        if (data !== null) {
          const postdata = (await postModel.getMyPosts(data.id)).data;
          const { data: followersData } =
            await userModel.getFollowersAndFollowings(data.id);

          const { followers, followings } = followersData;

          if (followers !== undefined && followings !== undefined) {
            if (postdata) {
              res.json({
                ...data,
                password: undefined,
                posts: postdata,
                followers,
                followings,
              });
            } else {
              res.json({
                ...data,
                password: undefined,
                posts: [],
                followers,
                followings,
              });
            }
          }
        } else {
          res.json(data);
        }
      } else {
        res.json(error);
      }
    } else {
      res.status(500).json({ message: "You need to provide an id" });
    }
  };

  static getCurrentUser = async (req, res) => {
    const user = req.user;

    return res
      .status(200)
      .json({ ...user, password: undefined, profil: user.getProfil });
  };

  static verifyUserExistence = async (userArray, user) => {
    userArray.forEach((result) => {
      if (user.id == result.id) {
        return true;
      } else {
        return false;
      }
    });
  };

  static getSearchedUsers = async (req, res) => {
    let { value } = req.params;

    if (value) {
      const userModel = new UserModel();

      var userArray = [];
      var errorArray = [];

      var search = value.split(" ");
      console.log(search);

      if (search.length > 0 && search.length < 2) {
        const { data, error } = await userModel.getSearchedUsers(search[0]);

        console.log({ data });

        userArray.push(...data);
        errorArray.push({ ...error });
      } else {
        const { data, error } = await userModel.getSearchedUsers(search[0]);

        userArray.push(...data);
        errorArray.push({ ...error });
        for (let i = 1; i < search.length; i++) {
          const { data, error } = await userModel.getSearchedUsers(search[i]);
          const newUsersArray = [...data];

          newUsersArray.forEach((result) => {
            if (!this.verifyUserExistence(userArray, result)) {
              userArray.push(result);
            } else {
              errorArray.push({ ...error });
            }
          });
        }
      }
      console.log("Next to this is the user array");
      console.log(userArray);

      console.log("Next to this is the user array length");
      console.log(userArray.length);

      if (userArray.length !== 0) {
        console.log("passed again");
        res.status(200).json(userArray);
      } else {
        res.status(404).json(errorArray);
      }
    } else {
      res.status(400).json({
        message:
          "You need to provide a value for the search operation to take on",
      });
    }
  };

  static signup = async (req, res) => {
    let { name, username, email, password, country, role } = req.body;

    if (
      name &&
      username &&
      email &&
      password &&
      [0, 1].includes(role) &&
      country
    ) {
      if (validateEmail(email)) {
        // removing space at the start and at the end of these string valuer
        name = name.trim();
        username = username.trim();
        email = email.trim();
        password = password.trim();

        // used for hashing password
        const saltRounds = 10;

        bcrypt.hash(password.toLowerCase(), saltRounds, async (err, hash) => {
          if (err) return res.sendStatus(500);

          const credentials = {
            name: name.toLowerCase(),
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: hash,
            country,
            role,
          };

          const userModel = new UserModel();

          const { data, error } = await userModel.signup(credentials);

          if (data) {
            const payload = {
              id: data.id,
              username,
              email,
              role,
            };

            const token = jwt.sign({ payload }, SECRET_CODE_TOKEN, {
              expiresIn: `${EXPIRE_IN} min`,
            });

            return res
              .status(201)
              .json({ ...data, token, password: undefined });
          } else {
            return res.status(500).json(error);
          }
        });
      } else {
        return res
          .status(500)
          .json({ message: "Your email adress is in the wrong format" });
      }
    } else {
      return res.status(400).json({ message: "Provide all the required data" });
    }
  };

  static signin = async (req, res) => {
    let { username, password } = req.body;

    if (username && password) {
      const userModel = new UserModel();

      // removing space at the start and at the end of these string valuer
      username = username.trim();
      password = password.trim();

      const { data, error } = await userModel.signin(username);

      console.log({ data });

      if (data) {
        const user =
          bcrypt.compareSync(password.toLowerCase(), data.password) && data;

        if (user) {
          const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
          };
          const token = jwt.sign(payload, SECRET_CODE_TOKEN, {
            expiresIn: `${EXPIRE_IN} min`,
          });

          return res.status(200).json({ ...user, token, password: undefined });
        } else {
          console.log({ username, password });
          return res.status(500).json(error);
        }
      } else {
        return res.status(500).json(error);
      }
    } else {
      return res.sendStatus(500);
    }
  };

  static updateUser = async (req, res) => {
    const user = req.user;
    const { name, username, email, password, description, country } = req.body;

    console.log("Hello");

    if (name && username && email && password && description && country) {
      // used for hashing password
      const saltRounds = 10;

      bcrypt.hash(password.toLowerCase(), saltRounds, async (err, hash) => {
        if (err) return res.sendStatus(500);

        const { data, error } = await user.dataManager.updateUser(
          user.getId,
          name,
          username,
          email,
          description,
          hash,
          country
        );

        if (data !== undefined) {
          const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
          };
          const token = jwt.sign(payload, SECRET_CODE_TOKEN, {
            expiresIn: `${EXPIRE_IN} min`,
          });

          return res.status(200).json({ ...data, token, password: undefined });
        } else {
          if (data === null) {
            return res.status(404).json({ message: "User not found" });
          }

          return res.status(500).json(error);
        }
      });
    } else {
      return res.status(400).json({ message: "Provide all the required data" });
    }
  };

  static deleteUser = (req, res) => {
    const user = req.user;

    // to do
  };

  static uploadProfilPhoto = async (req, res) => {
    const user = req.user;
    const file = req.file;

    if (file) {
      const { data, error } = await user.setProfil(file.filename);

      if (data) {
        return res.status(200).json({ ...data });
      } else {
        return res.status(500).json(error);
      }
    } else {
      return res.sendStatus(500);
    }
  };

  static deleteProfil = async (req, res) => {
    const user = req.user;
    console.log({ user });

    const { data, error } = await user.dataManager.deleteProfil(user.getId);

    if (data !== undefined) {
      res.status(200).json({ ...data });
    } else {
      res.status(500).json({ message: error });
    }
  };

  static addExpert = async (req, res) => {
    const user = req.user;
    const { idSubscriber } = req.body;

    if (idSubscriber) {
      if (user.getRole === 1) {
        const { data, error } = await user.addExpert(idSubscriber);

        if (data) {
          return res.status(200).json(data);
        } else {
          return res.status(500).json(error);
        }
      } else {
        return res.status(401).json({
          message: "You are not an expert, you can't do this operation",
        });
      }
    } else {
      return res.sendStatus(500);
    }
  };

  static uniqueEmail = async (req, res) => {
    const { email } = req.body;

    if (email && validateEmail(email)) {
      const userModel = new UserModel();

      const { data, error } = await userModel.verifyUnicity(email, "email");

      if (data !== undefined) {
        return res.status(200).json({ data });
      } else {
        return res.status(500).json(error);
      }
    } else {
      return res.status(400).json({ message: "Provide an email address" });
    }
  };

  static uniqueUsername = async (req, res) => {
    const { username } = req.body;

    if (username) {
      const userModel = new UserModel();

      const { data, error } = await userModel.verifyUnicity(
        username,
        "username"
      );

      if (data !== undefined) {
        return res.status(200).json({ data });
      } else {
        return res.status(500).json(error);
      }
    } else {
      return res.status(400).json({ message: "Provide an username" });
    }
  };

  static followUser = async (req, res) => {
    const { userId, type } = req.body;

    const currentUser = req.user;

    if (userId) {
      const userModel = new UserModel();
      let data;
      let error;

      if (type === "follow") {
        const result = await userModel.followUser(currentUser.getId, userId);

        data = result.data;
        error = result.error;
      } else {
        const result = await userModel.unFollowUser(currentUser.getId, userId);

        data = result.data;
        error = result.error;
      }

      if (data) {
        return res.status(201).json({ data });
      }

      return res.status(500).json({ error });
    }

    return res
      .status(400)
      .json({ error: "Provide the id of the target user to follow" });
  };

  static followCategory = async (req, res) => {

    const { userId, categoryId } = req.body

    if(!userId || !categoryId) return res.status(400).json({ error: "Provide user id and category id" })

    const { data, error } = await UserModel.followCategory(userId, categoryId)

    if(data) return res.status(201).json({data})

    return res.status(500).json({error})
  }
}

export default UserController;
