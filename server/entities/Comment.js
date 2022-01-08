import CommentModel from "../models/CommentModel.js";
import InterfaceComment from './interfaces/interfaceComment.js'

class Comment extends InterfaceComment {
  content;
  creation_date;
  edited;
  dataManager;
  post;
  author;
  comment;

  constructor() {
    super()
    
    this.dataManager = new CommentModel()
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
  async writeComment(datas) {
    const {content, idUser, idPost, idComment} = datas

    if(content && idPost && !idComment){
      return (
        await this.dataManager.createComment(content, idUser, idPost, idComment)
      )

    } else if(content && idPost && idComment){
      return (
        await this.dataManager.responseComment (content, idUser, idPost, idComment)
      )
    }
  }

}

export default Comment;