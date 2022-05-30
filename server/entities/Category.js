class Category {
  id;
  name;

  constructor (data) {
    const {
      id, 
      name
    } = data

    if (id && name) {
      this.id = id
      this.name = name
    } else {
      throw new Error("Provide id and name before instantiate a category object")
    }
  }

  // Getters

  /**
   * @returns string
   */
  get getId () {
    return this.id
  }

  /**
   * @returns string
   */
  get getName () {
    return this.name
  }
}

export default Category