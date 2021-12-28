import { config } from "dotenv"
import { nanoid } from "nanoid"
import dbConnect from "../utils/database.js"
import jwt from "jsonwebtoken"
import InterfaceUserModel from "./interfaces/interfaceUserModel.js"

// fetching data from .env file
config()

const {
  SECRET_CODE_TOKEN
} = process.env


class UserModel extends InterfaceUserModel {
  /**
   * This function get a specific user based on his id
   * @param {string} id
   */
   async getUser (id) {
    const session = dbConnect()

    try {
      const query = `
        MATCH (user:Subscriber{id: $id})
        RETURN user
      `

      const result = await session.run(query, {id})

      if (result.records.length > 0) {
        const userData = result.records[0].get('user').properties

        return {data: userData}
      } else {
        return {data: null}
      }
    } catch(err) {
      return {error: "Error while getting an user"}
    } finally {
      await session.close()
    }
  }

  /**
   * This method create a new subscriber
   * @param {string} name 
   * @param {string} username 
   * @param {string} email 
   * @param {string} password 
   * @param {0|1} role 
   */
  async signup({name, username, email, password, role}) {
    const session = dbConnect()

    try {
      const query = `
        CREATE (user:Subscriber${role ? ':Expert':''}{
          id: $id,
          name: $name, 
          username: $username, 
          email: $email, 
          password: $password, 
          role: $role,
          date: $date,
          profil: ${null}
        })
        RETURN user
      `

      console.log(query)

      const result = await session.run(query, {
        id: nanoid(20),
        name, 
        username, 
        email, 
        password, 
        role,
        date: Date.now()
      })

      if (result.records.length > 0) {
        const userData = result.records[0].get('user').properties

        return {data: userData}
      } else {
        return {error: "Error while creating an user"}
      }
    } catch(err) {
      return {error: "Error while creating an user"}
    } finally {
      await session.close()
    }
  }

  /**
   * This method retrieve a specific user based on his usename and password
   * @param {string} username 
   * @param {string} password
   */
  async signin(username, password) {
    // to do
  }

  /**
   * This function update a user
   * @param {string} id 
   * @param {string} name 
   * @param {string} username 
   * @param {string} email 
   * @param {string} password 
   */
  async updateUser (id, name, username, email, password) {
    // to do
  }

  /**
   * This function delete a user based on his id
   * @param {string} id 
   */
  async deleteUser (id) {
    // to do
  }
}

export default UserModel