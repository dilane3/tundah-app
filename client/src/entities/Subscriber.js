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

      const postData = posts ? posts.map(post => new Post(post)):[]
    
      this.id = id
      this.name = name
      this.username = username
      this.email = email
      this.date = date
      this.role = role
      this.profil = profil
      this.posts = postData
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

  get getProposedPosts() {
    const posts = []

    this.posts.forEach(post => {
      if (!post.getPublished) posts.push(post)
    })

    return posts
  }

  get getPublishedPosts() {
    const posts = []
    
    this.posts.forEach(post => {
      if (post.getPublished) posts.push(post)
    })

    return posts
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

  likePost (idPost) {
    const posts = [...this.posts]

    const index = posts.findIndex(post => post.id === idPost)

    if (index > -1) {
      let post = new Post(posts[index])
      console.log({post})

      post = post.likePost(this.id)
      console.log({post})

      posts[index] = post

      this.posts = posts
    }
  }
}

export default Subscriber