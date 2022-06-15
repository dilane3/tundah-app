import { insertToken } from "..";
import { instance as axiosInstance } from "../../utils/url";

// API Call for User
class CategoryApi {
  /**
   * Retrieve the list of categories from the API
   * @returns
   */
  static async getAll() {
    try {
      const instance = insertToken(axiosInstance);

      const { data: res, error } = await instance.get("/category");

      if (res) {
        console.log({ res });
        return { data: res.data };
      }

      return { error };
    } catch (err) {
      console.log(err);

      return { error: "An error occured" };
    }
  }
}

export default CategoryApi;
