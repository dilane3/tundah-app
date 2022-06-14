class InterfaceWikiPost {
    constructor() {
      if (this.constructor === InterfaceWikiPost) {
        throw new Error(
          "ERROR: You are not able to create object with this class"
        );
      }
    }
  }
  
  export default InterfaceWikiPost;
  