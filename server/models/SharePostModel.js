import dbConnect from "../utils/database.js";
import PostModel from "./PostModel.js";

class SharePostModel extends PostModel {
  async sharePost(userId, postId) {
    const session = dbConnect();

    try {
      const { data: alreadyShared, error } = await this.alreadySharedPost(
        userId,
        postId
      );
      let query;
      let res;

      if (!error && alreadyShared) {
        query = `
          MATCH (:Subscriber{id: $userId}) -[share:SHARED]-> (:Post{id: $postId})
          DELETE share
        `;
        res = { message: "Post unshared successfully", status: false };
      } else {
        query = `
          MATCH (user:Subscriber{id: $userId}), 
                (post:Post{id: $postId})
          CREATE (user) -[:SHARED]-> (post)
        `;
        res = { message: "Post shared successfully", status: true };
      }

      await session.run(query, { userId, postId });

      return { data: res };
    } catch (err) {
      console.log(err);

      return { error: "An error occured" };
    } finally {
      await session.close();
    }
  }

  async alreadySharedPost(userId, postId) {
    const session = dbConnect();

    try {
      const query = `
        MATCH (:Subscriber{id: $userId}) -[share:SHARED]-> (:Post{id: $postId})
        RETURN share
      `;

      const result = await session.run(query, { userId, postId });

      if (result.records.length > 0) {
        return { data: true };
      }

      return { data: false };
    } catch (err) {
      return { error: "An error occured" };
    } finally {
      await session.close();
    }
  }
}

export default SharePostModel;
