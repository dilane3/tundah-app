import {config} from 'dotenv'
import express from 'express'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import docs from './docs/index.js'

import userRouter from './routers/userRouter.js'
import commentRouter from './routers/commentRouter.js'
import postRouter from './routers/postRouter.js'
<<<<<<< HEAD
import categoryRouter from './routers/categoryRouter.js'
=======
import cathegoryRouter from "./routers/cathegoryRouter"
>>>>>>> 9f8eb5d35db55fb26707bb479b05abad52170fdb

// fetching data from .env file
config()

const app = express()

// declaration of constant
const {
  PORT
} = process.env

// const corsOptions = {
//   origin: ["https://tundah.vercel.app", "*"]
// }

const corsOptions = {
  origin: "*"
}

// use middelwares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions))
app.use("/static", express.static("public"))
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs))


app.use("/api/users", userRouter)
app.use("/api/comments", commentRouter)
app.use("/api/posts", postRouter)
app.use("/api/category", categoryRouter)


// app.set('view engine', 'ejs')
// app.get("/", (req, res) => {
//   res.render("index")
// })

app.get("/", (req, res) => {
  res.send("Tundah server app")
})

// launch app
app.listen(PORT, () => {
  console.log(`Server up and running on http://localhost:${PORT}`)
})
