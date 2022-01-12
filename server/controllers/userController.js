import { config } from "dotenv"
import UserModel from "../models/UserModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validateEmail } from "../utils/validator.js"

// fetching data from .env file
config()

const {
  SECRET_CODE_TOKEN,
  EXPIRE_IN
} = process.env

class UserController {
  static getUser = async (req, res) => {
    const {id} = req.params

    if (id) {
      const user = req.user

      const {data, error} = await user.dataManager.getUser(id)

      if (data !== undefined) {
        res.json({...data, password: undefined})
      } else {
        res.json(error)
      }
    } else {
      res.status(500).json({message: "You need to provide an id"})
    }
  }

  static getCurrentUser = async (req, res) => {
    const user = req.user

    return res.status(200).json({...user, password: undefined, profil: `${req.protocol}://${req.headers.host}/static/images/profil/${user.getProfil}`})
  }

  static signup = async (req, res) => {
    let {name, username, email, password, country, role} = req.body

    console.log({req: req})

    if (name && username && email && password && [0, 1].includes(role) && country) {

      if (validateEmail(email)) {
        // removing space at the start and at the end of these string valuer
        name = name.trim()
        username = username.trim()
        email = email.trim()
        password = password.trim()

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
            country,
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
  
            const token = jwt.sign({payload}, SECRET_CODE_TOKEN, {expiresIn: `${EXPIRE_IN} min`})
  
            return res.status(201).json({...data, token, password: undefined})
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
    let {username, password} = req.body

    if (username && password) {
      const userModel = new UserModel()


      // removing space at the start and at the end of these string valuer
      username = username.trim()
      password = password.trim()

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
          const token = jwt.sign(payload, SECRET_CODE_TOKEN, {expiresIn: `${EXPIRE_IN} min`})

          return res.status(200).json({...user, token, password: undefined})
        } else {
          console.log({username, password})
          return res.status(500).json(error)
        }
      } else {
        return res.status(500).json(error)
      }
    } else {
      return res.sendStatus(500)
    }
  }

  static updateUser = async (req, res) => {
    const user = req.user
    const {
      name, 
      username, 
      email, 
      password, 
      description,
      country
    } = req.body

    console.log("Hello")

    if (name && username && email && password && description && country) {
      // used for hashing password
      const saltRounds = 10;
  
      bcrypt.hash(password.toLowerCase(), saltRounds, async (err, hash) => {
        if (err)
          return res.sendStatus(500)

        const {data, error} = await user.dataManager.updateUser(
          user.getId, 
          name, 
          username, 
          email, 
          description,
          hash, 
          country
        )

        if (data !== undefined) {
          const payload = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          }
          const token = jwt.sign(payload, SECRET_CODE_TOKEN, {expiresIn: `${EXPIRE_IN} min`})

          return res.status(200).json({...data, token, password: undefined})
        } else {
          if (data === null) {
            return res.status(404).json({message: "User not found"})
          }

          return res.status(500).json(error)
        }
      })
    } else {
      return res.status(400).json({message: "Provide all the required data"})
    }
  }

  static deleteUser = (req, res) => {
    const user = req.user

    // to do
  }

  static uploadProfilPhoto = async (req, res) => {
    const user = req.user
    const file = req.file

    if (file) {
      const {data, error} = await user.setProfil(file.filename)

      if (data) {
        return res.status(200).json({...data, profil: `${req.protocol}://${req.headers.host}/static/images/profil/${data.profil}`})
      } else {
        return res.status(500).json(error)
      }
    } else {
      return res.sendStatus(500)
    }
  }

  static deleteProfil = async (req, res) => {
    const user = req.user
    console.log({user})
    
    const {data, error} = await user.dataManager.deleteProfil(user.getId)

    if (data !== undefined) {
      res.status(200).json({...data, profil: `${req.protocol}://${req.headers.host}/static/images/profil/${data.profil}`})
    } else {
      res.status(500).json({message: error})
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

  static uniqueEmail = async (req, res) => {
    const {email} = req.body 

    if (email && validateEmail(email)) {
      const userModel = new UserModel()

      const {data, error} = await userModel.verifyUnicity(email, "email")

      if (data !== undefined) {
        return res.status(200).json({data})
      } else {
        return res.status(500).json(error)
      }
    } else {
      return res.status(400).json({message: "Provide an email address"})
    }
  }

  static uniqueUsername = async (req, res) => {
    const {username} = req.body

    if (username) {
      const userModel = new UserModel()

      const {data, error} = await userModel.verifyUnicity(username, "username")

      if (data !== undefined) {
        return res.status(200).json({data})
      } else {
        return res.status(500).json(error)
      }
    } else {
      return res.status(400).json({message: "Provide an username"})
    }
  }
}

export default UserController