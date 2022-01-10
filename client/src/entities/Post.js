import InterfacePost from './interfaces/interfacePost.js'

class Post extends InterfacePost {
  id;
  title;
  content;
  creation_date;
  modification_date;
  files_list;
  published;
  region;
  tribe;
  comments;
  likes;
  author;
  subAuthors;

  constructor(data) {
    super()

    this.initialization(data)
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
        title, 
        content, 
        creation_date, 
        modification_date, 
        files_list, 
        published, 
        region, 
        tribe, 
        comments, 
        author,
        subAuthors,
        likes
      } = data
    
      this.id = id
      this.title = title
      this.content = content
      this.creation_date = creation_date
      this.modification_date = modification_date
      this.files_list = files_list
      this.published = published
      this.region = region
      this.tribe = tribe
      this.comments = comments
      this.author = author
      this.subAuthors = subAuthors
      this.likes = likes
    }
  }

  /**
   * @returns string
   */
   get getId() {
    return this.id
  }

  /**
   * @returns string
   */
   get getTitle() {
    return this.title;
  }

  /**
   * @returns string
   */
  get getContent() {
    return this.content;
  }

  /**
   * @returns number
   */
  get getCreationDate() {
    return this.creation_date;
  }

  /**
   * @returns number
   */
  get getModificationDate() {
    return this.modification_date;
  }

  /**
   * @returns array of strings
   */
  get getFilesList() {
    return this.files_list;
  }

  /**
   * @returns boolean
   */
  get getPublished() {
    return this.published;
  }

  /**
   * @returns string
   */
  get getRegion() {
    return this.region;
  }

  /**
   * @returns String
   */
  get getTribe() {
    return this.tribe;
  }

  /**
   * @returns number
   */
  get getComments() {
    return this.comments
  }

  /**
   * @returns User
   */
  get getAuthor() {
    return this.author
  }

  /**
   * @returns Array of User
   */
  get getSubAuthors() {
    return this.subAuthors
  }

  /**
   * @returns Array of Userid
   */
  get getLikes() {
    return this.likes
  }

  updatePost(data) {
    const {
      title,
      content,
      modification_date,
      files_list,
      region,
      tribe,
      subAuthors
    } = data

    this.title = title
    this.content = content
    this.modification_date = modification_date
    this.files_list = files_list
    this.region = region
    this.tribe = tribe
    this.subAuthors = subAuthors
  }

  addComments (comments) {
    this.comments = comments
  }

  addComment (comment) {
    this.comments.push(comment)
  }

  getComment (idComment) {
    const index = this.comments.findIndex(comment => comment.getId === idComment)

    return index
  }

  likePost (idUser) {
    if (!this.likes.contains(idUser)) {
      this.likes.push(idUser)
    } else {
      const index = this.likes.findIndex(like => like === idUser)

      this.likes.splice(index, 1)
    }
  }
}

export default Post;
