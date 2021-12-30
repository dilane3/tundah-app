import PostModel from "../models/PostModel.js";

class Post {
  content;
  creation_date;
  modification_date;
  files_list;
  published
  region;
  tribe;

  constructor() {
    this.dataManager = new PostModel()
  }

  /**
   * @returns string
   */
  get getContent() {
    return this.content
  }

  /**
   * @returns number
   */
  get getCreationDate() {
    return this.creation_date
  }

  /**
   * @returns number
   */
  get getModificationDate() {
    return this.modification_date
  }

  /**
   * @returns array of strings
   */
  get getFilesList() {
    return this.files_list
  } 
  
  /**
   * @returns boolean
   */
   get getPublished() {
    return this.published
  }

  /**
   * @returns string
   */
  get getRegion() {
    return this.region
  }

  /**
   * @returns String
   */
  get getTribe() {
    return this.tribe
  }

  /**
   * This method allow the subscriber to propose a post
   * @param {any} datas 
   */
  proposePost(datas) {
    // to do
  }

  /**
   * This method allow a user to like a post
   * @param {string} idPost 
   * @param {string} idUser 
   */
  likePost(idPost) {
    // to do
  }

  /**
   * This method allows the user - expert to publish a post
   * @param {any} datas 
   */
  publishPost(datas) {
    // to do
  }

  /**
   * This method allow a user - expert to validate a post
   * @param {string} idPost 
   */
  validatePost(idPost) {
    // to do
  }
}

export default Post