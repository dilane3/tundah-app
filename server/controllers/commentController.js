import Comment from "../entities/Comment.js"
import Subscriber from "../entities/Subscriber.js"
import Expert from "../entities/Expert.js"
import CommentModel from "../models/CommentModel.js"

class CommentController {
  static getComment = async (req, res) => {
    const {id} = req.params

    if (id) {
      const commentModel = new CommentModel()

      const {data, error} = await commentModel.getComment(id)

      if (data !== undefined) {
        res.json(data)
      } else {
        res.json(error)
      }
    } else {
      res.status(400).json({message: "You need to provide an id"})
    }
  }

  static createComment = (req, res) => {
    delete req.body._id;
    const commentData = req.body;

    const user = req.user
  }

  static updateComment = (req, res) => {
    // to do
  }

  static deleteComment = (req, res) => {
    // to do
  }
}

export default CommentController