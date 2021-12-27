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
   * This method create a new subscriber
   * @param {string} name 
   * @param {string} username 
   * @param {string} email 
   * @param {string} password 
   * @param {0|1} role 
   */
  async signup(name, username, email, password, role) {
    // to do
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
   * This function get a specific user based on his id number
   * @param {Number} id 
   * @returns User | Error message
   */
  async getUser (id) {
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