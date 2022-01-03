class InterfaceComment {
    constructor() {
      if (this.constructor === InterfaceComment) {
        throw new Error(
          "ERROR: You are not able to create object with this class"
        );
      }
    }

    /**
     * This methods allow a user to write a comment
     * @param {Object} datas
     */
    writeComment(datas) {
        throw new Error("Error you have to implement this function");
    }
  }
  
  export default InterfaceComment;
  