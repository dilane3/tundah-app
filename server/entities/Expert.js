import Post from "./Post.js";
import Subscriber from "./Subscriber.js";

class Expert extends Subscriber {
  constructor(data) {
    super(data)
  }

  /**
   * This method allow an user expert to create a post
   * @param {any} datas 
   */
  async createPost(content, files_list, region, tribe) {
    const post = new Post()

    return (await post.publishPost({content, files_list, region, tribe}, this.getId))
  }

  /**
   * This method allow an user expert to add user
   * @param {string} idSubscriber 
   */
  async addExpert(idSubscriber) {
    if (idSubscriber) {
      const {data, error} = await this.dataManager.addExpert(idSubscriber)

      return {data, error}
    } else {
      return {error: "Error occurs while adding an expert user"}
    }
  }

  /**
   * This method allow an use expert to validate a post
   * @param {string} idPost 
   */
  async validatePost(idPost) {
    const post = new Post()

    return (await post.validatePost(idPost, this.getId))
  }
}

export default Expert