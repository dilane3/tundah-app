import { insertToken } from "..";
import { instance as axiosInstance } from "../../utils/url";

// API Call for User
class PostApi {
  /**
   * Follow and UnFollow a user
   * data is an Object that contains the userId and the type of the operation (follow | unfollow)
   * @param {Object} data
   * @returns
   */
  static async simpleSharePost(data) {
    try {
      const instance = insertToken(axiosInstance);

      const { data: res, error } = await instance.post(
        "/posts/share/simple",
        data
      );

      if (res) {
        return { data: res };
      }

      return { error };
    } catch (err) {
      console.log(err);

      return { error: "An error occured" };
    }
  }
}

export default PostApi;
