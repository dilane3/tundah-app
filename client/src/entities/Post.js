import Comment from "./Comment.js";
import InterfacePost from "./interfaces/interfacePost.js";

class Post extends InterfacePost {
  id;
  title;
  content;
  creation_date;
  modification_date;
  files_list;
  post_type;
  comments;
  sharedTimes;
  commentsData;
  likes;
  author;

  constructor(data) {
    super();

    this.initialization(data);
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
        comments,
        sharedTimes,
        commentsData,
        author,
        likes,
      } = data;

      this.id = id;
      this.title = title ? title : "hello";
      this.content = content;
      this.creation_date = Number(creation_date);
      this.modification_date = Number(modification_date);
      this.files_list = files_list;
      this.post_type = post_type;
      this.comments = comments;
      this.sharedTimes = sharedTimes;
      this.commentsData = commentsData ? commentsData : [];
      this.author = author;
      this.likes = likes;
    }
  }

  /**
   * @returns string
   */
  get getId() {
    return this.id;
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
   * @returns number
   */
  get getComments() {
    return this.comments;
  }

  /**
   * @returns number
   */
  get getSharedTimes() {
    return this.sharedTimes;
  }

  get getCommentsData() {
    return this.commentsData;
  }

  /**
   * @returns User
   */
  get getAuthor() {
    return this.author;
  }

  /**
   * @returns Array of Userid
   */
  get getLikes() {
    return this.likes;
  }

  get getData() {
    return this;
  }

  updatePost(data) {
    const {
      title,
      content,
      modification_date,
      files_list,
      region,
      tribe,
      subAuthors,
    } = data;

    this.title = title;
    this.content = content;
    this.modification_date = modification_date;
    this.files_list = files_list;
    this.region = region;
    this.tribe = tribe;
    this.subAuthors = subAuthors;
  }

  addComments(comments) {
    this.commentsData = comments.map((comment) => new Comment(comment));

    return this;
  }

  addComment(comment) {
    this.commentsData.push(new Comment(comment));
  }

  incrementNumberComment() {
    this.comments += 1;
  }

  getComment(idComment) {
    const index = this.commentsData.findIndex(
      (comment) => comment.id === idComment
    );

    return index;
  }

  likePost(idUser) {
    if (!this.likes.includes(idUser)) {
      return { ...this, likes: [...this.likes, idUser] };
    } else {
      const newLikes = this.getLikes.filter((like) => like !== idUser);

      return { ...this, likes: [...newLikes] };
    }
  }
}

export default Post;
