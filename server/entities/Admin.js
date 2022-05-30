import Subscriber from "./Subscriber.js";

class Admin extends Subscriber {
  constructor(data) {
    super(data)
  }

  /**
   * Delete a user
   * @param {string} userId 
   */
  async deleteUser (userId) {
    // Something here
  }

  /**
   * Make a subscriber expert
   * @param {string} userId 
   */
  async addExpert (userId) {
    // Something here
  }

  /**
   * Create a category
   * @param {string} categoryName 
   */
  async addCategory (categoryName) {
    // Something here
  }
}

export default Admin