class InterfaceCategoryModel {
  constructor() {
    if (this.constructor === InterfaceCategoryModel) {
      throw new Error('ERROR: You are not able to create object with this class')
    }
  }

  /**
  * This method create a new comment
  * @param {string} nameCategory
  */ 
  static create(nameCategory) {
    throw new Error('ERROR: You have to implement this function')
  }

  /**
  * This function get a specific comment based on his id
  * @param {string} id
  */
  static get(id) {
    throw new Error('ERROR: You have to implement this function')
  }

  /**
   * This method retrieves all the comments
  */
  static getAll() {
    throw new Error("Error you have to implemnt this function");
  }

  /**
  * This method update a comment
  * @param {string} idCategory
  * @param {string} nameCategory
  * 
  */
  static update (idCategory, nameCategory) {
    throw new Error('ERROR: You have to implement this function')
  }

  /**
  * This method delate a comment
  * @param {string} idCategory
  */
  static delete (idCategory) {
    throw new Error('ERROR: You have to implement this function')
  }
}

export default InterfaceCategoryModel




