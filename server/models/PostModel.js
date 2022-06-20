import { config } from "dotenv";
import { nanoid } from "nanoid";
import dbConnect from "../utils/database.js";
import jwt from "jsonwebtoken";
import InterfacePostModel from "./interfaces/interfacePostModel.js";
import { error, session } from "neo4j-driver";
import PostEnum from "./enums/PostEnum.js";

// fetching data from .env file
config();

const { SECRET_CODE_TOKEN } = process.env;

class PostModel extends InterfacePostModel {
  /**
   * This function get a specific user based on his id
   * @param {string} id
   */
  async getPost(id) {
    const session = dbConnect();

    try {
      const query = `
        MATCH (post:Post {id: $id})
        RETURN post
      `;
      const result = await session.run(query, { id });
      console.log({ id });

      if (result.records.length > 0) {
        const postData = result.records[0].get("post").properties;

        console.log("postData here", postData);

        if (postData.published) {
          const { commentsNumber } = await this.getCommentNumber(postData.id);
          const { likes } = await this.getLikes(postData.id);

          return { data: { ...postData, comments: commentsNumber, likes } };
        }

        return { data: postData };
      } else {
        return { data: null };
      }
    } catch (err) {
      return { error: "Error while getting a post" };
    } finally {
      await session.close();
    }
  }

  // /**
  //  * This function get posts based on their category
  //  * @param {string} id
  //  */
  // async getPostsByCategory(id) {
  //   const session = dbConnect();

  //   try {
  //     const query = `
  //       MATCH (post:Post) - [:HAS_CATEGORY] -> (category:Category {id = $id})
  //       RETURN post
  //     `;
  //     const result = await session.run(query, { id });
  //     console.log({ id });

  //     if (result.records.length > 0) {
  //       const postData = result.records[0].get("post").properties;

  //       if (postData.published) {
  //         const { commentsNumber } = await this.getCommentNumber(postData.id);
  //         const { likes } = await this.getLikes(postData.id);

  //         return { data: { ...postData, comments: commentsNumber, likes } };
  //       }

  //       return { data: postData };
  //     } else {
  //       return { data: null };
  //     }
  //   } catch (err) {
  //     return { error: "Error while getting a post" };
  //   } finally {
  //     await session.close();
  //   }
  // }

  /**
   * This function return the researched posts using it's title
   * Independent of the substring position
   * And is case insensitive
   * @param {string} value
   * @returns post(s)
   */
  async getSearchedPosts(value) {
    const session = dbConnect();

    try {
      const query = `
        MATCH (post:Post{post_type: "social"})
        WHERE post.title =~ '(?i).*(${value.toLowerCase()}).*'
        RETURN post
        ORDER BY post.creation_date DESC
        `;

      const result = await session.run(query);
      console.log(result.records);

      const moreInfosData = await this.gettingMoreInfos(result, "post");

      if (moreInfosData.length > 0) {
        return { data: moreInfosData };
      } else {
        return { data: [] };
      }
    } catch (err) {
      console.log(err);
      return { error: "Sorry the post(s) has not been found" };
    } finally {
      session.close();
    }
  }

  /**
   * This function returns the number of posts available in the database
   */
  async getNumberPost(session, status) {
    try {
      const query = `
        MATCH (posts:Post{post_type: 'social'})
        RETURN posts
      `;

      const result = await session.run(query);
      console.log("number of wiki_post", result.records.length )
      return { postNumber: result.records.length };
    } catch (err) {
      console.log(err);
      return { error: "Error occured while getting posts number" };
    }
  }

  /**
   * This function return the number of comment linked to a specific post
   * @param {Session} session
   * @param {string} id
   */
  async getCommentNumber(id) {
    const session = dbConnect();

    try {
      const query = `
        MATCH (post:Post{id: $id}) -[commentsNumber:HAS_COMMENT]-> (:Comment)
        RETURN commentsNumber
      `;

      const result = await session.run(query, { id });

      return { commentsNumber: result.records.length };
    } catch (err) {
      return {
        error:
          "Error occured while getting comment number linked to a specific post",
      };
    } finally {
      await session.close();
    }
  }

  /**
   * This function return the number of comment linked to a specific post
   * @param {Session} session
   * @param {string} id
   */
  async getLikes(id) {
    const session = dbConnect();

    try {
      const query = `
        MATCH (posts:Post{id: $id}) -[numberLike:LIKED_BY]-> (users:Subscriber)
        RETURN users
      `;

      const result = await session.run(query, { id });

      const usersId = result.records.map((record) => {
        return record.get("users").properties?.id;
      });

      return { likes: usersId };
    } catch (err) {
      console.log(err);
      return {
        error:
          "Error occured while getting number of like linked to a specific post",
      };
    } finally {
      await session.close();
    }
  }

  async getAuthorOfPost(id) {
    const session = dbConnect();

    try {
      let author = null;

      // query for retrieving the user who has published the post
      const query1 = `
        MATCH (:Post{id: $id}) -[published_by:PUBLISHED_BY]-> (user:Subscriber)
        RETURN published_by, user
        LIMIT 1
      `;
      const result1 = await session.run(query1, { id });

      if (result1.records.length > 0) {
        // getting author who has published the post
        author = result1.records[0].get("user").properties;
      }
      return { author };
    } catch (err) {
      return { editors: [], author: null };
    } finally {
      await session.close();
    }
  }

  async gettingMoreInfos(result, field) {
    let postData = [];

    for (let record of result.records) {
      const post = record.get(field).properties;

      const { commentsNumber } = await this.getCommentNumber(post.id);
      const { likes } = await this.getLikes(post.id);
      const { editors, author } = await this.getAuthorOfPost(post.id);

      postData.push({
        ...post,
        likes,
        comments: commentsNumber,
        author,
        subAuthors: editors,
      });
    }

    return postData;
  }

  /**
   * This method retrieves all the avalaible posts
   */
  async getAllPosts(skip, limit, status) {
    const session = dbConnect();

    try {
      const { postNumber, error } = await this.getNumberPost(session, status);

      if (postNumber !== undefined) {
        const query = `
          MATCH (posts:Post{post_type: 'social'})
          RETURN posts
          ORDER BY posts.creation_date DESC
          SKIP ${skip}
          LIMIT ${limit}
        `;

        const result = await session.run(query);

        const postData = await this.gettingMoreInfos(result, "posts");

        if (postNumber > Number(skip) + Number(limit)) {
          return {
            data: {
              data: postData,
              next: true,
              skip: Number(skip) + Number(limit),
            },
          };
        } else {
          return { data: { data: postData, next: false, skip: Number(skip) } };
        }
      } else {
        return { error };
      }
    } catch (err) {
      console.log(err);
      return { error: "Error while getting the posts" };
    } finally {
      await session.close();
    }
  }

  /**
   * This method retrieves all the avalaible posts
   */
  async getAllWikiPosts(skip, limit, status) {
    const session = dbConnect();

    try {
      const { postNumber, error } = await this.getNumberPost(session, status);
      console.log("number of wiki_post",postNumber)

      if (postNumber !== undefined) {
        const query = `
          MATCH (posts:Post{post_type: 'wiki'})
          RETURN posts
          ORDER BY posts.creation_date DESC
          SKIP ${skip}
          LIMIT ${limit}
        `;

        const result = await session.run(query);

        const postData = await this.gettingMoreInfos(result, "posts");

        if (postNumber > Number(skip) + Number(limit)) {
          return {
            data: {
              data: postData,
              next: true,
              skip: Number(skip) + Number(limit),
            },
          };
        } else {
          return { data: { data: postData, next: false, skip: Number(skip) } };
        }
      } else {
        return { error };
      }
    } catch (err) {
      console.log(err);
      return { error: "Error while getting the posts" };
    } finally {
      await session.close();
    }
  }

  /**
   * This method returns post which are linked to a specific user
   * @param {string} idUser
   * @returns
   */
  async getMyPosts(idUser) {
    const session = dbConnect();

    try {
      const query1 = `
        MATCH (publishedPost:Post) -[:PUBLISHED_BY]-> (user:Subscriber{id: $idUser})
        RETURN publishedPost
      `;
      const result1 = await session.run(query1, { idUser });

      const publishedPost = await this.gettingMoreInfos(
        result1,
        "publishedPost"
      );

      const postData = [...publishedPost];

      return { data: postData };
    } catch (err) {
      return { error: "Error while getting the posts" };
    } finally {
      await session.close();
    }
  }

  /**
   * This method create a new post
   * @param {string} title
   * @param {string} content
   * @param {Array} files_list
   * @param {String} post_type
   * @param {Array} categoryList
   * @param {string} idUser
   */
  async createPost(
    title,
    content,
    files_list,
    post_type,
    categoryList,
    idUser
  ) {
    const session = dbConnect();

    // Categories find request part in the bd
    var cat = "";
    categoryList.map((category, index) => {
      cat += ` MATCH (category${index}:Category{id: "${category}"})`;
    });

    // Post merge with the above categories in the bd
    var merges = "";
    categoryList.map((category, index) => {
      merges += ` CREATE (post) - [:HAS_CATEGORY] -> (category${index})`;
    });

    try {
      const query = `
        ${cat}
        MATCH (user:Subscriber{id: $idUser})
        CREATE 
        (post:Post 
          { 
            id: $id,
            title: $title,
            content: $content, 
            creation_date: $creation_date,
            modification_date: $modification_date, 
            files_list: $files_list, 
            post_type: $post_type
          }
        ) - [:PUBLISHED_BY] -> (user)
        CREATE (user) - [:PUBLISHED] -> (post)
        ${merges}
        RETURN post
      `;

      const result = await session.run(query, {
        id: nanoid(20),
        title: title.toLowerCase(),
        content,
        creation_date: Date.now(),
        modification_date: Date.now(),
        files_list,
        post_type,
        idUser,
      });

      if (result.records.length > 0) {
        const postData = await this.gettingMoreInfos(result, "post");

        return { data: postData[0] };
      } else {
        return { data: null };
      }
    } catch (err) {
      console.log(err);
      return { error: "Error while creating the post" };
    } finally {
      await session.close();
    }
  }

  /**
   * This function deletes a post based on it's id's
   * @param {string} idPost
   * @param {string} idUser
   */
  async deletePost(idPost, idUser, role) {
    const session = dbConnect();

    try {
      const query = `
          MATCH (post:Post{id: $idPost}) -[:PUBLISHED_BY]-> (user:Subscriber{id: $idUser})
          DETACH DELETE post
        `;

      await session.run(query, { idPost, idUser });

      return { data: "The post has successfully been deleted" };
    } catch (err) {
      console.log(err);
      return { error: "The post has not been found" };
    } finally {
      await session.close();
    }
  }

  /**
   * This function updates a post based on it's id and the form data
   * @param {string} idPost
   * @param {string} title
   * @param {string} content
   * @param {Array} files_list
   * @param {String} post_type
   * @param {string} idUser
   */
  async updatePost(idPost, title, content, files_list, post_type, idUser) {
    const session = dbConnect();

    try {
      const query = `
      MATCH 
        (post:Post {id: $idPost}),
        (user:Subscriber {id: $idUser})
      SET
        post.title = $title,
        post.content = $content, 
        post.modification_date = $modification_date, 
        post.files_list = $files_list,
        post.post_type = $post_type
      RETURN post
    `;
      const response = await session.run(query, {
        idPost,
        idUser,
        title: title.toLowerCase(),
        content,
        modification_date: Date.now(),
        files_list,
        post_type,
      });

      if (response.records.length > 0) {
        const postData = response.records[0].get("post").properties;

        return { data: postData };
      } else {
        return { data: null };
      }
    } catch (err) {
      return { error: "The post has not been found" };
    } finally {
      await session.close();
    }
  }

  async hasBeenLiked(idPost, idUser, session) {
    try {
      const query = `
        MATCH (post:Post {id: $idPost}) -[likedBy:LIKED_BY]-> (user:Subscriber {id: $idUser})
        RETURN likedBy
      `;

      const result = await session.run(query, { idPost, idUser });

      if (result.records.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return {
        error:
          "Error occurs while testing if a post has been already liked or not",
      };
    }
  }

  /**
   * This method permits to a Subscriber to like a post
   * @param {string} idPost
   * @param {string} idUser
   */
  async likePost(idPost, idUser) {
    const session = dbConnect();

    try {
      let query;

      if (await this.hasBeenLiked(idPost, idUser, session)) {
        query = `
          MATCH (post:Post {id: $idPost}), (user:Subscriber {id: $idUser})
          MATCH (post) - [publishedPostLike:LIKED_BY] -> (user)
          MATCH (user) - [like:LIKED] -> (post)
          DELETE publishedPostLike, like
        `;

        await session.run(query, { idPost, idUser });

        return { data: "Post has succesfully been unliked" };
      } else {
        query = `
          MATCH (post:Post {id: $idPost}), (user:Subscriber {id: $idUser})
          CREATE (post) - [publishedPostLike:LIKED_BY] -> (user)
          CREATE (user) - [like:LIKED] -> (post)
          RETURN publishedPostLike
        `;

        const result = await session.run(query, { idPost, idUser });

        if (result.records.length > 0) {
          return { data: "Post has succesfully been liked" };
        } else {
          return { data: null };
        }
      }
    } catch (err) {
      return { error: "The post doesn't exist anymore" };
    } finally {
      session.close();
    }
  }

  /**
   * This method permits the Expert to publish a post in the wiki section from the social section
   *
   *
   */
  async transferSocialPostToWiki(
    title,
    content,
    files_list,
    post_type,
    idUser
  ) {
    const session = dbConnect();

    try {
      const query = `
        MATCH (user:Experty{id: $idUser})
        CREATE 
        (post:Post 
          { 
            id: $id,
            title: $title,
            content: $content, 
            creation_date: $creation_date,
            modification_date: $modification_date, 
            files_list: $files_list, 
            post_type: $post_type
          }
        ) - [:PUBLISHED_BY] -> (user)
        CREATE (user) - [:PUBLISHED] -> (post)
        RETURN post
      `;

      const result = await session.run(query, {
        id: nanoid(20),
        title: title.toLowerCase(),
        content,
        creation_date: Date.now(),
        modification_date: Date.now(),
        files_list,
        post_type,
        idUser,
      });

      if (result.records.length > 0) {
        const postData = await this.gettingMoreInfos(result, "post");

        return { data: postData[0] };
      } else {
        return { data: null };
      }
    } catch (err) {
      console.log(err);
      return { error: "Error while creating the post" };
    } finally {
      await session.close();
    }
  }
}

export default PostModel;
