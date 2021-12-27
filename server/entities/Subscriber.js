import UserModel from "../models/UserModel";

class Subscriber {
  name;
  username;
  email;
  password;
  role;
  date;
  dataManager;
  posts;

  constructor() {
    this.dataManager = new UserModel()
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