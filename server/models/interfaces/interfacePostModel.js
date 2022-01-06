class InterfacePostModel {
  constructor() {
    if (this.constructor === InterfacePostModel) {
      throw new Error(
        "ERROR: You are not able to create object with this class"
      );
    }
  }

  /**
   * This method create a new subscriber
   * @param {string} title
   * @param {string} content
   * @param {Array} files_list
   * @param {boolean} published
   * @param {string} region
   * @param {string} tribe
   * @param {string} idUser
   */
  createPost(title, content, files_list, published, region, tribe,  idUser) {
    throw new Error("ERROR: You have to implement this function");
  }

  /**
   * This method retrieve a specific post based on his id
   * @param {string} id
   */
  getPost(id) {
    throw new Error("Error you have to implemnt this function");
  }

  /**
   * This method retrieves all the posts
   */
  getAllPosts() {
    throw new Error("Error you have to implemnt this function");
  }
  /**
   * This method deletes a post
   * @param {string} idPost
   * @param {string} idUser
   */
  deletePost(idPost, idUser) {
    throw new Error("ERROR: You have to implement this function");
  }

  /**
   * This method updates a post
   * @param {string} idPost
   * @param {string} content
   * @param {Array} files_list
   * @param {boolean} published
   * @param {string} region 
   * @param {string} tribe
   * @param {string} idUser
   */
  updatePost(idPost, content, files_list, published, region, tribe, idUser) {
    throw new Error("ERROR: You have to implement this function");
  }
}

export default InterfacePostModel;
