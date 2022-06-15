import InterfaceWikiPost from './interfaces/InterfaceWikiPost'

class WikiPost extends InterfaceWikiPost {
  id;
  title;
  content;
  creation_date;
  modification_date;
  files_list;
  post_type;
  author;

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
        post_type, 
        author
      } = data
    
      this.id = id
      this.title = title ? title:"hello"
      this.content = content
      this.creation_date = Number(creation_date)
      this.modification_date = Number(modification_date)
      this.files_list = files_list
      this.post_type = post_type
      this.author = author
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
  get getPostType() {
    return this.post_type;
  }

  /**
   * @returns User
   */
  get getAuthor() {
    return this.author
  }

  get getData() {
    return this
  }

  updatePost(data) {
    const {
      title,
      content,
      modification_date,
      files_list
    } = data

    this.title = title
    this.content = content
    this.modification_date = modification_date
    this.files_list = files_list
  }

}

export default WikiPost;
