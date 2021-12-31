import { internal } from "neo4j-driver-core";

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
     * @param {*} content 
     * @param {*} files_list 
     * @param {*} published 
     * @param {*} region 
     * @param {*} tribe 
     * @param {*} idUser 
     */
    proposePost(content, files_list, region, tribe, idUser){
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
     */
    publishPost(datas) {
        throw new Error("Error you have to implement this function");
    }

    /**
     * This method implements the post validation functionnality
     * @param {string} idPost
     */
    validatePost(idPost) {
        throw new Error("Error you have to implement this function");
    }
  }
  
  export default InterfacePost;
  