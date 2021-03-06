export default {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "apiKey",
        name: "authorization",
        scheme: "bearer",
        in: "header",
      },
    },
    schemas: {
      // user id model
      idUser: {
        type: "string",
        description: "An id of a user",
        example: "ufjohj4"
      },

      // post id model
      idPost: {
        type: "string",
        description: "An id of a post",
        example: "ufjohj4"
      },

      // comment id model
      idComment: {
        type: "string",
        description: "An id of a comment",
        example: "ufjohj4"
      },

      // user input model
      UserInput: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Full name of the user",
            example: "John Doe"
          },
          username: {
            type: "string",
            description: "username of the user",
            example: "johndoe"
          },
          email: {
            type: "string",
            description: "email of the user",
            example: "john.doe@gmail.com"
          },
          password: {
            type: "string",
            description: "password of the user",
            example: "john123"
          },
          country: {
            type: "string",
            description: "country of the user",
            example: "Cameroon"
          },
          role: {
            type: "number",
            description: "role of the user",
            example: 0
          }
        }
      },

      // user input connexion model
      UserInputConnection: {
        type: "object",
        properties: {
          username: {
            type: "string",
            description: "username of the user",
            example: "johndoe"
          },
          password: {
            type: "string",
            description: "password of the user",
            example: "john123"
          }
        }
      },

      // post input model
      PostInput: {
        type: "object",
        properties: {
          content: {
            type: "string",
            description: "Content of the post",
            example: "Wedding in the west region..."
          },
          files_list: {
            type: "array",
            items: {
              type: "string",
              description: "File item of the post",
              example: "wedding.png"
            }
          },
          region: {
            type: "string",
            description: "Region that the post tags",
            example: "West"
          },
          tribe: {
            type: "string",
            description: "Tribe that the post tags",
            example: "Bagangte"
          }
        }
      },

      PostInputGetting: {
        type: "object",
        properties: {
          skip: {
            type: "number",
            description: "number of articles to skip",
            example: 2
          },
          limit: {
            type: "number",
            description: "number max of article to get",
            example: 10
          }
        }
      },

      // comment input model
      CommentInput: {
        type: "object",
        properties: {
          content: {
            type: "string",
            description: "Content of the comment",
            example: "good post"
          },
          idPost: {
            type: "string",
            description: "The post id on what the comment tags",
            example: "l&G498t3sd"
          }
        }
      },

      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Error message"
          }
        }
      },

      StringResult: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Success message"
          }
        }
      },

      // user model
      User: {
        type: "object",
        properties: {
          date: {
            type: "number",
            description: "The creation date of the user",
            example: 16167890233
          },
          role: {
            type: "number",
            description: "The role of the user",
            example: 0
          },
          profil: {
            type: "string",
            description: "The profil photo of the user",
            example: "default.png"
          },
          name: {
            type: "string",
            description: "The full name of the user",
            example: "John Doe"
          },
          id: {
            type: "string",
            description: "The id of the user",
            example: "noiusdhfd7y4"
          },
          email: {
            type: "string",
            description: "email of the user",
            example: "john.doe@gmail.com"
          },
          username: {
            type: "string",
            description: "username of the user",
            example: "johndoe"
          },
          token: {
            type: "string",
            description: "The token of the user",
            example: "noiusdhfd7y4.asdfa.erfwrg"
          }
        }
      },

      // post model
      Post: {
        type: "object",
        properties: {
          files_type: {
            type: "array",
            items: {
              type: "string",
              description: "File item of the post",
              example: "wedding.png"
            }
          },
          tribe: {
            type: "string",
            description: "Tribe that the post tags",
            example: "Bagangte"
          },
          modification_date: {
            type: "number",
            description: "The modification date of the post",
            example: 16167890233
          },
          creation_date: {
            type: "number",
            description: "The creation date of the post",
            example: 16167890233
          },
          published: {
            type: "boolean",
            description: "The published status of a post",
            example: "true"
          },
          id: {
            type: "string",
            description: "An id of a post",
            example: "ufjohj4"
          },
          region: {
            type: "string",
            description: "Region that the post tags",
            example: "West"
          },
          content: {
            type: "string",
            description: "Content of the post",
            example: "Wedding in the west region..."
          }
        }
      },

      // comment model
      Comment: {
        type: "object",
        properties: {
          edited: {
            type: "boolean",
            description: "The edited status of a comment",
            example: "false"
          },
          creation_date: {
            type: "number",
            description: "The creation date of the comment",
            example: 16167890233
          },
          id: {
            type: "string",
            description: "An id of a comment",
            example: "ufjohj4"
          },
          content: {
            type: "string",
            description: "Content of the comment",
            example: "good post"
          }
        }
      }
    },

    // securityDefinitions: {
    //   securitySchemes: {
    //     bearerAuth: {
    //       type: "http",
    //       scheme: "bearer",
    //       bearerFormat: "JWT" 
    //     }
    //   }
    // }
  }
}