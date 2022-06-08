import { insertToken } from "..";
import { instance as axiosInstance } from "../../utils/url";

// API Call for User
class UserApi {
  /**
   * Follow and UnFollow a user
   * data is an Object that contains the userId and the type of the operation (follow | unfollow)
   * @param {Object} data
   * @returns
   */
  static async follow(data) {
    try {
      const instance = insertToken(axiosInstance);

      const { data: res, error } = await instance.post("/users/follow", data);

      if (res) {
        return { data: res };
      }

      return { error };
    } catch (err) {
      console.log(err);

      return { error: "An error occured" };
    }
  }

  static async getUser(username) {
    try {
      const instance = insertToken(axiosInstance);

      const { data: res, error } = await instance.get(`/users/${username}`);

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

export default UserApi;