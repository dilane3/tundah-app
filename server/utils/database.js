import { config } from "dotenv";
import neo4j from "neo4j-driver";

// fetching data from .env file
config();

const { DATABASE_URI, USERNAME_DB, PASSWORD_DB, DATABASE_NAME } = process.env;

// console.log(typeof DATABASE_URI)

export default function () {
  const driver = neo4j.driver(
    DATABASE_URI,
    neo4j.auth.basic(USERNAME_DB, PASSWORD_DB)
  );

  // return driver.session();
  return driver.session({ database: DATABASE_NAME });
}
