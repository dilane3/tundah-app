import { config } from 'dotenv'
import neo4j from 'neo4j-driver'

config()

const {
  DATABASE_URI,
  USERNAME_DB,
  PASSWORD_DB,
  DATABASE_NAME
} = process.env

export default function() {
  const driver = neo4j.driver(DATABASE_URI, neo4j.auth.basic(USERNAME_DB, PASSWORD_DB))

  return driver.session({database: DATABASE_NAME})
}