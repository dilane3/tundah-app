import { config } from "dotenv"
import Subscriber from "../entities/Subscriber.js"
import Expert from "../entities/Expert.js"
import UserModel from "../models/UserModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// fetching data from .env file
config()

const {
  SECRET_CODE_TOKEN
} = process.env

class UserController {
  static getUser = async (req, res) => {
    const {id} = req.params

    if (id) {
      const userModel = new UserModel()

      const {data, error} = await userModel.getUser(id)

      if (data !== undefined) {
        res.json(data)
      } else {
        res.json(error)
      }
    } else {
      res.status(500).json({message: "You need to provide an id"})
    }
  }

  static signup = async (req, res) => {
    const {name, username, email, password, role} = req.body

    if (name && username && email && password && [0, 1].includes(role)) {
      // used for hashing password
      const saltRounds = 10;

      bcrypt.hash(password.toLowerCase(), saltRounds, async (err, hash) => {
        if (err)
          return res.sendStatus(500)

        const credentials = {
          name: name.toLowerCase(), 
          username: username.toLowerCase(), 
          email: email.toLowerCase(), 
          password: hash, 
          role
        }

        const userModel = new UserModel()

        const {data, error} = await userModel.signup(credentials)

        if (data) {
          const payload = {
            id: data.id,
            username,
            email,
            role
          }

          const token = jwt.sign(payload, SECRET_CODE_TOKEN, {expiresIn: "3 min"})

          return res.status(201).json({...data, token})
        } else {
          return res.status(500).json(error)
        }
      })
    } else {
      return res.sendStatus(500)
    }
  }

  static signin = async (req, res) => {
    const {username, password} = req.body

    if (username && password) {
      const userModel = new UserModel()

      const {data, error} = await userModel.signin(username)

      if (data) {
        const user = bcrypt.compareSync(password.toLowerCase(), data.password) && data

        if (user) {
          const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          }
          const token = jwt.sign(payload, SECRET_CODE_TOKEN, {expiresIn: "3 min"})

          return res.status(200).json({...user, token})
        } else {
          return res.status(500).json(error)
        }
      } else {
        return res.status(500).json(error)
      }
    } else {
      return res.sendStatus(500)
    }
  }

  static updateUser = (req, res) => {
    // to do
  }

  static deleteUser = (req, res) => {
    // to do
  }
}

export default UserController