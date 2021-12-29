import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
import Subscriber from '../entities/Subscriber.js'
import Expert from '../entities/Expert.js'
import UserModel from '../models/UserModel.js'

// fetching data from .env file
config()

const {
  SECRET_CODE_TOKEN
} = process.env

const authenticationMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader.split(" ")[1]

    if (!token) {
      return res.status(401).json({message: "Not authorized"})
    }

    jwt.verify(token, SECRET_CODE_TOKEN, async (error, result) => {
      if (error) {
        return res.status(401).json({message: "Not authorized"})
      }

      const userModel = new UserModel()

      const {data} = await userModel.getUser(result.id)

      if (data) {
        let user;

        if (data.role === 0) {
          user = new Subscriber(data)
        } else {
          user = new Expert(data)
        }
        
        req.user = user

        next()
      } else {
        return res.status(401).json({message: "Not authorized"})
      }      
    })
  } catch (err) {
    return res.status(401).json({message: "Not authorized"})
  }
}

export default authenticationMiddleware