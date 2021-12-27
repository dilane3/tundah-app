import {config} from 'dotenv'
import express from 'express'
import cors from 'cors'
import userRouter from './routers/userRouter.js'

// fetching data from .env file
config()

const app = express()

// declaration of constant
const {
  PORT
} = process.env

const corsOptions = {
  origin: "*"
}

// use middelwares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions))

// use routers
app.use("/api/users", userRouter)

// launch app
app.listen(PORT, () => {
  console.log(`Server up and running on http://localhost:${PORT}`)
})
