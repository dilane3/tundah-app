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
      let message;

      if (!error && alreadyShared) {
        query = `
          MATCH (:Subscriber{id: $userId}) -[share:SHARED]-> (:Post{id: $postId})
          DELETE share
        `;
        message = "Post unshared successfully";
      } else {
        query = `
          MATCH (user:Subscriber{id: $userId}), 
                (post:Post{id: $postId})
          CREATE (user) -[:SHARED]-> (post)
        `;
        message = "Post shared successfully";
      }

      console.log({ alreadyShared, message });

      await session.run(query, { userId, postId });

      return { data: message };
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
