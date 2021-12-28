import { config } from 'dotenv'
import jwt from 'jsonwebtoken'

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

    jwt.verify(token, SECRET_CODE_TOKEN, (error, data) => {
      if (error) {
        return res.status(401).json({message: "Not authorized"})
      }

      // should be reviewed
      req.user = data

      // here we verify if the user exist in the database

      next()
    })
  } catch (err) {
    return res.status(401).json({message: "Not authorized"})
  }
}

export default authenticationMiddleware