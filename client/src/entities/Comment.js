import InterfaceComment from './interfaces/interfaceComment.js'

class Comment extends InterfaceComment {
  id;
  content;
  creation_date;
  edited;
  idPost;
  author;
  responses;

  constructor(data) {
    super()

    this.initialization(data)
  };

  /**
   * 
   * @param {Object} data
   * @returns void 
   */
   initialization(data) {
    if (data) {
      const {
        id, 
        content, 
        creation_date, 
        edited, 
        idPost, 
        author, 
        responses
      } = data
    
      this.id = id
      this.content = content
      this.creation_date = creation_date
      this.edited = edited
      this.idPost = idPost
      this.author = author
      this.responses = responses
    }
  }

  /**
   * @returns string
   */
  get getId() {
    return this.id
  }

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
   * @returns string
   */
  get getAuthor() {
    return this.author
  }

  /**
   * @returns string
   */
  get getIdPost() {
    return this.idPost
  }

  /**
   * @returns Array of Comment
   */
  get getResponses() {
    return this.responses
  }

  /**
   * Update the content of the comment
   * @param {string} content 
   */
  setContent(content) {
    this.content = content
  }

  /**
   * Update the edited property
   * @param {boolean} edited 
   */
  setEditer(edited) {
    this.edited = edited
  }

  /**
   * Adding a comment response
   * @param {Comment} comment 
   */
  addCommentResponse (comment) {
    this.responses.push(comment)
  }

  deleteCommentResponse (idComment) {
    const index = this.responses.findIndex(comment => comment.getId === idComment)

    if (index > -1) {
      this.responses.splice(index, 1)
    }
  }
}

export default Comment;