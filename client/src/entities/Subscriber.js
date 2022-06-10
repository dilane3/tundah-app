import Post from "./Post.js";

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
  followers;
  followings;

  constructor(data) {
    this.initialization(data);
  }

  get getId() {
    return this.id;
  }

  /**
   * @returns string
   */
  get getName() {
    return this.name;
  }

  /**
   * @returns string
   */
  get getUsername() {
    return this.username;
  }

  /**
   * @returns string
   */
  get getEmail() {
    return this.email;
  }

  /**
   * @returns {0|1}
   */
  get getRole() {
    return this.role;
  }

  /**
   * @returns Number
   */
  get getDate() {
    return this.date;
  }

  /**
   * @returns string
   */
  get getProfil() {
    return this.profil;
  }

  /**
   * @returns Array of Post
   */
  get getPosts() {
    return this.posts;
  }

  /**
   * @returns string
   */
  get getCountry() {
    return this.country;
  }

  /**
   * @returns string
   */
  get getDescription() {
    return this.description;
  }

  /**
   * Initialize the user instance
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
        description,
        date,
        role,
        profil,
        posts,
        country,
        followers,
        followings,
      } = data;

      const postData = posts ? posts.map((post) => new Post(post)) : [];

      this.id = id;
      this.name = name;
      this.username = username;
      this.email = email;
      this.date = date;
      this.role = role;
      this.profil = profil;
      this.posts = postData;
      this.country = country;
      this.description = description;

      if (followers && followings) {
        const myFollowers = [];
        const myFollowings = [];

        for (let follower of followers) {
          myFollowers.push(new Subscriber(follower));
        }

        for (let following of followings) {
          myFollowings.push(new Subscriber(following));
        }

        this.followers = myFollowers;
        this.followings = myFollowings;
      }
    }
  }

  get getUserData() {
    return this;
  }

  setProfil(profil) {
    this.profil = profil;
  }

  updateUser(data) {
    const { name, username, email, country, description } = data;

    this.name = name;
    this.username = username;
    this.email = email;
    this.country = country;
    this.description = description;
  }

  get getPublishedPosts() {
    const posts = [];

    this.posts.forEach((post) => {
      if (post.getPublished) posts.push(post);
    });

    return posts;
  }

  get getFollowers() {
    return this.followers;
  }

  get getFollowings() {
    return this.followings;
  }

  deletePost(idPost) {
    const index = this.posts.findIndex((post) => post.getId === idPost);

    if (index > -1) {
      this.posts.splice(index, 1);
    }
  }

  setAllPost(posts) {
    this.posts = posts;
  }

  createPost(post) {
    this.posts.push(post);
  }

  likePost(idPost) {
    const posts = [...this.posts];

    const index = posts.findIndex((post) => post.id === idPost);

    if (index > -1) {
      let post = new Post(posts[index]);
      console.log({ post });

      post = post.likePost(this.id);
      console.log({ post });

      posts[index] = post;

      this.posts = posts;
    }
  }

  alreadyAFollower(userId) {
    return this.followers.some((user) => user.getId === userId);
  }

  alreadyFollowed(userId) {
    return this.followings.some((user) => user.getId === userId);
  }

  addFollower(user) {
    this.followers.push(user);
  }

  addFollowing(user) {
    this.followings.push(user);
  }

  deleteFollower(userId) {
    const userIndex = this.followers.findIndex((user) => user.getId === userId);

    if (userIndex > -1) {
      this.followers.splice(userIndex, 1);
    }
  }

  deleteFollowing(userId) {
    const userIndex = this.followings.findIndex(
      (user) => user.getId === userId
    );

    if (userIndex > -1) {
      this.followings.splice(userIndex, 1);
    }
  }
}

export default Subscriber;
