import { config } from "dotenv"

// fetching data from .env file
config()

const {
  PORT
} = process.env

export default {
  servers: [
    {
      url: `http://localhost:${PORT}/api`,
      description: "Local Server"
    }
  ]
}