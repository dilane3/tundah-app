class InterfacePost {
  constructor() {
    if (this.constructor === InterfacePost) {
      throw new Error(
        "ERROR: You are not able to create object with this class"
      );
    }
  }
}

export default InterfacePost;
