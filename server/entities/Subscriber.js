import UserModel from "../models/UserModel.js";

class Subscriber {
  id;
  name;
  username;
  email;
  password;
  role;
  date;
  dataManager;
  posts;

  constructor(data) {
    this.dataManager = new UserModel()

    this.initialization(data)
  }

  get getId() {
    return this.id
  }

  /**
   * @returns string
   */
  get getName() {
    return this.name
  }

  /**
   * @returns string
   */
  get getUsername() {
    return this.username
  }

  /**
   * @returns string
   */
  get getEmail() {
    return this.email
  }

  /**
   * @returns string
   */
  get getPassword() {
    return this.password
  }

  /**
   * @returns Number
   */
  get getDate() {
    return this.date
  }

  /**
   * @returns Array of Post
   */
  get getPosts() {
    return this.posts
  }

  /**
   * 
   * @param {Object} data
   * @returns void 
   */
  initialization(data) {
    if (data) {
      const {
        id,
        name,
        username,
        email,
        password,
        date,
        role
      } = data
    
      this.id = id
      this.name = name
      this.username = username
      this.email = email
      this.password = password
      this.date = date
      this.role = role
    }
  }

  /**
   * This method allow the subscriber to create a post
   * @param {any} datas 
   */
  createPost(datas) {
    // to do
  }

  /**
   * This method allow a user to like a post
   * @param {string} idPost 
   */
  likePost(idPost) {
    // to do
  }

  /**
   * This method allow a user to write a comment
   * @param {any} datas 
   */
  writeComment(datas) {
    // to do
  }
}

export default Subscriber