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
        subAuthors
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

  get getComments() {
    return this.comments
  }

  get getAuthor() {
    return this.author
  }

  get getSubAuthors() {
    return this.subAuthors
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
}

export default Post;
