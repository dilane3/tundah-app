import { config } from "dotenv"

// fetching data from .env file
config()

const {
  PORT
} = process.env

export default {
  servers: [
    {
      url: `http://localhost:${5500}/api`,
      description: "Local Server"
    }
  ]
}