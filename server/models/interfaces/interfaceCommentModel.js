class InterfaceCommentModel {
    constructor() {
      if (this.constructor === InterfaceCommentModel) {
        throw new Error('ERROR: You are not able to create object with this class')
      }
    }
  
   /**
  * This method create a new comment
  * @param {string} idUser
  * @param {string} idPost
  * @param {string} idComment
  * @param {string} content
  * @param {boolean} edited
  */ 
    createComment(content, idUser, idPost, idComment) {
      throw new Error('ERROR: You have to implement this function')
    }

    /**
    * This function get a specific comment based on his id
    * @param {string} id
    */
    getComment(id) {
      throw new Error('ERROR: You have to implement this function')
    }

    /**
     * This method retrieves all the comments
    */
    getAllComments() {
      throw new Error("Error you have to implemnt this function");
    }
  
    /**
    * This method update a comment
    * @param {string} idUser
    * @param {string} idPost
    * @param {string} content
    * @param {boolean} edited
    * 
    */
    updateComment (idComment, idUser, content, edited) {
      throw new Error('ERROR: You have to implement this function')
    }
  
    /**
    * This method delate a comment
    * @param {string} idComment
    * @param {string} idUser
    * @param {string} idPost 
    * @param {string} cotent
    */
    deleteComment (idComment, idUser, content) {
      throw new Error('ERROR: You have to implement this function')
    }
  }
  
  export default InterfaceCommentModel




