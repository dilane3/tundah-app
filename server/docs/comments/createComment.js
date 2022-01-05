export default {
  post: {
    tags: ["Comment CRUD operations"],
    description: "Create a new comment",
    operationId: "createComment",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/CommentInput",
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
              $ref: '#/components/schemas/Comment'
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