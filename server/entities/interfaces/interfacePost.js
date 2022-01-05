class InterfacePost {
    constructor() {
      if (this.constructor === InterfacePost) {
        throw new Error(
          "ERROR: You are not able to create object with this class"
        );
      }
    }

    /**
     * This method implements the post proposal functionnality
     * @param {Object} datas
     * @param {string} idUser 
     */
    proposePost(datas, idUser){
        throw new Error("Error: You have to implement this function")
    }

    /**
     * This methods implements the post like functionnality
     * @param {*} idPost
     * @param {*} idUser 
     */
    likePost(idPost, idUser) {
        throw new Error("Error you have to implement this function");
    }
  
    /**
     * This method implements the post publishing functionnality
     * @param {*} datas 
     * @param {string} idUser 
     */
    publishPost(datas, userId) {
        throw new Error("Error you have to implement this function");
    }

    /**
     * This method implements the post validation functionnality
     * @param {string} idPost
     * @param {string} idUser 
     */
    validatePost(idPost, idUser) {
        throw new Error("Error you have to implement this function");
    }
  }
  
  export default InterfacePost;
  