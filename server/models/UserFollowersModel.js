import UserModel from "./UserModel.js";
import dbConnect from "../utils/database.js";

class UserFollowersModel extends UserModel {
  async getFollowersSuggestion(currentUser) {
    // const session = dbConnect();

    const MyFollowings = currentUser.getFollowings;

    try {
      const suggestions = [];

      for (let following of MyFollowings) {
        const {
          data: { followings },
          error,
        } = await this.getFollowersAndFollowings(following.getId);

        if (followings !== undefined) {
          for (let user of followings) {
            if (
              !suggestions.some((sug) => sug.id === user.id) &&
              !MyFollowings.some((fol) => fol.id === user.id) &&
              currentUser.getId !== user.id
            ) {
              suggestions.push(user);
            }
          }
        }
      }

      console.log({ suggestions });

      return { data: suggestions };
    } catch (error) {
      console.log(error);

      return { error: "An error occured while getting suggestion of users" };
    }
  }
}

export default UserFollowersModel;
