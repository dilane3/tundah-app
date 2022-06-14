import { insertToken } from "..";
import { instance as axiosInstance } from "../../utils/url";

// API Callfor post wiki
class PostWikiApi {
  
  static async getAll() {
      
    try {
      const instance = insertToken(axiosInstance);

      const { data, error } = await instance.get(`/posts?skip=${skip}&limit=${2}`)

      if (data) {
        return { data};
      }

      return { error };
    } catch (err) {
      console.log(err);

      return { error: "An error occured while getting wiki posts" };
    }
  }
}

export default PostWikiApi;
