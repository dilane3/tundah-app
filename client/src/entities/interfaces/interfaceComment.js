class InterfaceComment {
  constructor() {
    if (this.constructor === InterfaceComment) {
      throw new Error(
        "ERROR: You are not able to create object with this class"
      );
    }
  }
}

export default InterfaceComment;
