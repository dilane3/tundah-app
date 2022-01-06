import UserModel from "../models/UserModel.js";
import Post from "./Post.js";
import Comment from './Comment.js'

class Subscriber {
  id;
  name;
  username;
  email;
  password;
  description;
  role;
  date;
  profil;
  country;
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
   * @returns string
   */
   get getDescription() {
    return this.description
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
   * @returns string
   */
  get getCountry() {
    return this.country
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
        description,
        date,
        role,
        profil,
        posts,
        country
      } = data
    
      this.id = id
      this.name = name
      this.username = username
      this.email = email
      this.password = password
      this.description = description
      this.date = date
      this.role = role
      this.profil = profil
      this.posts = posts
      this.country = country
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
  async likePost(idPost) {
    const post = new Post()

    return (await post.likePost(idPost, this.getId))
  }

  /**
   * This method allow a user to write a comment
   * @param {any} datas 
   */
  async writeComment(datas) {
    const {content, idUser, idPost} = datas
    const comment = new Comment()

    return (await comment.writeComment({content, idUser, idPost}))
  }
}

export default Subscriber