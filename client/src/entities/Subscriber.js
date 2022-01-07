import Post from "./Post.js";
import Comment from './Comment.js'

class Subscriber {
  id;
  name;
  username;
  email;
  description;
  role;
  date;
  profil;
  country;
  posts;

  constructor(data) {
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
      this.date = date
      this.role = role
      this.profil = profil
      this.posts = posts
      this.country = country
    }
  }

  get getUserData() {
    return this
  }

  setProfil(profil) {
    this.profil = profil
  }

  updateUser(data) {
    const {
      name,
      username,
      email,
      country,
      description
    } = data

    this.name = name
    this.username = username
    this.email = email
    this.country = country
    this.description = description
  }

  get getProposePosts() {
    return this.posts.map(post => {
      if (!post.getPublished) return post
    })
  }

  get getPublishedPosts() {
    return this.posts.map(post => {
      if (post.getPublished) return post
    })
  }

  deletePost (idPost) {
    const index = this.posts.findIndex((post) => post.getId === idPost)

    if (index > -1) {
      this.posts.splice(index, 1)
    }
  }

  setAllPost (posts) {
    this.posts = posts
  }

  createPost (post) {
    this.posts.push(post)
  }
}

export default Subscriber