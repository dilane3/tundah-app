import Subscriber from "../entities/Subscriber.js"
import Expert from "../entities/Expert.js"
import UserModel from "../models/UserModel.js"

class UserController {
  static getUser = async (req, res) => {
    const {id} = req.params

    if (id) {
      const userModel = new UserModel()

      const {data, error} = await userModel.getUser(id)

      if (data !== undefined) {
        res.json(data)
      } else {
        res.json(error)
      }
    } else {
      res.status(500).json({message: "You need to provide an id"})
    }
  }

  static signup = (req, res) => {
    // to do
  }

  static signin = (req, res) => {
    // to do
  }

  static updateUser = (req, res) => {
    // to do
  }

  static deleteUser = (req, res) => {
    // to do
  }
}

export default UserController