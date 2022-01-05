export default {
  post: {
    tags: ["Post CRUD operations"],
    description: "Create a new post",
    operationId: "createPost",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/PostInput",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Post created successfully",
        content: {
          "application/json": {
            schema: {
              $ref: '#/components/schemas/Post'
            }
          }
        }
      },
      401: {
        description: "Not authorized",
        content: {
          "application/json": {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      },
      500: {
        description: "Server error",
        content: {
          "application/json": {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      },
    }
  }
}