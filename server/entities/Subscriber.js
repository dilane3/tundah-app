import UserModel from "../models/UserModel.js";
import Post from "./Post.js";

class Subscriber {
  id;
  name;
  username;
  email;
  password;
  role;
  date;
  profil;
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
   * @returns {0|1}
   */
  get getRole() {
    return this.role
  }

  /**
   * @returns Number
   */
  get getDate() {
    return this.date
  }

  /**
   * @returns string
   */
  get getProfil() {
    return this.profil
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
        role,
        profil,
        posts
      } = data
    
      this.id = id
      this.name = name
      this.username = username
      this.email = email
      this.password = password
      this.date = date
      this.role = role
      this.profil = profil
      this.posts = posts
    }
  }

  async setProfil(profil) {
    const {data, error} = await this.dataManager.updateProfil(this.getId, profil)

    if (data) {
      this.profil = data.profil
    }

    return {data, error}
  }

  /**
   * This method allow the subscriber to create a post
   * @param {any} datas 
   */
  async createPost(content, files_list, region, tribe) {
    const post = new Post()

    const {data, error} = await post.proposePost({content, files_list, region, tribe}, this.getId)
    
    return {data, error}
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