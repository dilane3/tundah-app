import CommentModel from "../models/CommentModel.js";
import Subscriber from "../entities/Subscriber.js"

class Comment {
  content;
  creation_date;
  edited;
  dataManager;
  //post;
  author;
  comment;

  constructor() {
    this.dataManager = new CommentModel()
    this.author = new Subscriber()
  };

  /**
   * @returns string
   */
   get getContent() {
    return this.content
  }

  /**
  * @returns Number
  */
  get getCreationDate() {
    return this.date
  }

  /**
  * @returns Boolean
  */
   get getEdited() {
    return this.edited
  }
  /**
   * This method allow a user to write a comment
   * @param {any} datas 
   */
  writeComment(datas) {
    // to do
  }

}

export default Comment;