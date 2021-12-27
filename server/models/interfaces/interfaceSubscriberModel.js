class InterfaceSubscriberModel {
  constructor() {
    if (this.constructor === InterfaceSubscriberModel) {
      throw new Error('ERROR: You are not able to create object with this class')
    }
  }

  /**
   * This method create a new subscriber
   * @param {string} name 
   * @param {string} username 
   * @param {string} email 
   * @param {string} password 
   * @param {0 | 1} role 
   */
  signup(name, username, email, password, role) {
    throw new Error('ERROR: You have to implement this function')
  }

  /**
   * This method retrieve a specific user based on his usename and password
   * @param {string} username 
   * @param {string} password 
   */
  signin(username, password) {
    throw new Error('ERROR: You have to implement this function')
  }

  /**
   * This method retrieve a specific user base on his id
   * @param {string} id 
   */
  getUser(id) {
    throw new Error('ERROR: You have to implement this function')
  }

  /**
   * This method update a user
   * @param {string} id 
   * @param {string} name 
   * @param {string} username 
   * @param {string} email 
   * @param {string} password 
   */
  updateUser(id, name, username, email, password) {
    throw new Error('ERROR: You have to implement this function')
  }

  /**
   * This method delete a user
   * @param {string} id 
   */
  deleteUser(id) {
    throw new Error('ERROR: You have to implement this function')
  }
}

export default InterfaceSubscriberModel