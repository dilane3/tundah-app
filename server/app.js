import {config} from 'dotenv'
import express from 'express'
import cors from 'cors'

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

app.get("/", (req, res) => {
  res.send("hello")
})

// launch app
app.listen(PORT, () => {
  console.log(`Server up and running on http://localhost:${PORT}`)
})
