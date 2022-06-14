import {
  DELETE_POST,
  ADD_POSTS,
  ADD_POST,
  ADD_COMMENT,
  ADD_COMMENTS,
  LIKE_POST,
  SHARE_POST,
} from "./type";
import Post from "../../../entities/Post";

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case DELETE_POST: {
      const posts = [...state];

      if (action.payload) {
        const index = posts.findIndex((post) => post.getId === action.payload);

        if (index > -1) {
          posts.splice(index, 1);
        }
      }

      return posts;
    }

    case ADD_POSTS: {
      const posts = [...state];

      console.log(action.payload);

      if (action.payload) {
        for (let post of action.payload) {
          const p = posts.find((ps) => ps.id === post.id);

          if (!p) posts.push(new Post(post).getData);
        }
      }

      return posts;
    }

    case ADD_POST: {
      const posts = [...state];

      if (action.payload) {
        posts.push(action.payload);
      }

      return posts;
    }

    case SHARE_POST: {
      const posts = [...state];

      const post = action.payload;

      console.log({ post });

      if (post) {
        const index = posts.findIndex((pt) => pt.id === post.id);
        console.log({ index });

        if (index > -1) {
          posts[index] = post;
        }
      }

      return posts;
    }

    case ADD_COMMENT: {
      const posts = [...state];
      const { idPost, comment, responseTo } = action.payload;

      console.log(responseTo);

      if (idPost && comment) {
        const index = posts.findIndex((post) => post.getId === idPost);

        // we verify if we have a post
        if (index > -1) {
          // responseTo contains the id of a specific comment
          if (responseTo) {
            // we get the position of the comment inside the comments table of the post
            console.log(posts[index]);
            let post = new Post(posts[index]);

            const indexComment = post.getComment(responseTo);
            console.log(post);

            // if it exist
            if (indexComment > -1) {
              // we add the comment inside the table of response comment of the comment
              post.getCommentsData[indexComment].addCommentResponse(comment);
              post.incrementNumberComment();

              posts[index] = post.getData;
            }
          } else {
            console.log("hey");
            console.log(comment);
            posts[index].addComment({ ...comment, responses: [] });
            posts[index].incrementNumberComment();
          }
        }
      }

      return posts;
    }

    case ADD_COMMENTS: {
      const posts = [...state];
      const { idPost, comments } = action.payload;

      console.log({ comments });

      if (idPost && comments) {
        const index = posts.findIndex((post) => post.id === idPost);
        console.log(index);

        // we verify if we have a post
        if (index > -1) {
          let post = new Post(posts[index]);
          console.log(post);
          post = post.addComments(comments);

          console.log(post);
          posts[index] = post.getData;
        }
      }

      return posts;
    }

    case LIKE_POST: {
      const posts = [...state];
      const { idPost, idUser } = action.payload;

      if (idPost && idUser) {
        const index = posts.findIndex((post) => post.id === idPost);

        // we verify if we have a post
        if (index > -1) {
          let post = new Post(posts[index]);

          post = post.likePost(idUser);

          posts[index] = post;
        }
      }

      return posts;
    }

    default:
      return state;
  }
};

export default postsReducer;
