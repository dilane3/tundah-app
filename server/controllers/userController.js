import { config } from "dotenv"
import UserModel from "../models/UserModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validateEmail } from "../utils/validator.js"

// fetching data from .env file
config()

const {
  SECRET_CODE_TOKEN
} = process.env

class UserController {
  static getUser = async (req, res) => {
    const {id} = req.params

    if (id) {
      const user = req.user

      const {data, error} = await user.dataManager.getUser(id)

      if (data !== undefined) {
        res.json(data)
      } else {
        res.json(error)
      }
    } else {
      res.status(500).json({message: "You need to provide an id"})
    }
  }

  static test = (req, res) => {
    res.send("Hello")
  }

  static getCurrentUser = async (req, res) => {
    console.log("hello")
    const user = req.user

    console.log({user})

    return res.status(200).json(user)
  }

  static signup = async (req, res) => {
    const {name, username, email, password, role} = req.body

    if (name && username && email && password && [0, 1].includes(role)) {

      if (validateEmail(email)) {
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
  
            const token = jwt.sign(payload, SECRET_CODE_TOKEN, {expiresIn: "480 min"})
  
            return res.status(201).json({...data, token})
          } else {
            return res.status(500).json(error)
          }
        })
      } else {
        return res.status(500).json({message: "Your email adress is in the wrong format"})
      }
    } else {
      return res.status(500).json({message: "Provide all the required data"})
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
          const token = jwt.sign(payload, SECRET_CODE_TOKEN, {expiresIn: "120 min"})

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

  static uploadProfilPhoto = async (req, res) => {
    const user = req.user
    const file = req.file

    if (file) {
      const {data, error} = await user.setProfil(file.filename)

      if (data) {
        return res.status(200).json(data)
      } else {
        return res.status(500).json(error)
      }
    } else {
      return res.sendStatus(500)
    }
  }

  static addExpert = async (req, res) => {
    const user = req.user
    const {idSubscriber} = req.body

    if (idSubscriber) {
      if (user.getRole === 1) {
        const {data, error} = await user.addExpert(idSubscriber)

        if (data) {
          return res.status(200).json(data)
        } else {
          return res.status(500).json(error)
        }
      } else {
        return res.status(401).json({message: "You are not an expert, you can't do this operation"})
      }
    } else {
      return res.sendStatus(500)
    }
  }
}

export default UserController