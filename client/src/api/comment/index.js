import { insertToken } from "..";
import { instance as axiosInstance } from "../../utils/url";

// API Call for User
class CommentApi {
  /**
   * Follow and UnFollow a user
   * data is an Object that contains the userId and the type of the operation (follow | unfollow)
   * @param {Object} data
   * @returns
   */
  static async delete({ idComment, idPost }) {
      console.log(idPost)
    try {
      const instance = insertToken(axiosInstance);

      const { data: res, error } = await instance.delete(`/comments/delete/${idComment}?idPost=${idPost}`);

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

export default CommentApi;
