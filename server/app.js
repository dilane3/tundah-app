import {config} from 'dotenv'
import express from 'express'
import cors from 'cors'

import userRouter from './routers/userRouter.js'
import commentRouter from './routers/commentRouter.js'

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
app.use("/static", express.static("public"))

// use routers
app.use("/api/users", userRouter)
// app.use("/api/posts", postRouter)
app.use("/api/comments", commentRouter)


app.set('view engine', 'ejs')
app.get("/", (req, res) => {
  res.render("index")
})

// launch app
app.listen(PORT, () => {
  console.log(`Server up and running on http://localhost:${PORT}`)
})
