export default {
  post: {
    tags: ["Post CRUD operations"],
    description: "Like a post",
    operationId: "LikePost",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "id of a post",
        required: true,
        schema: {
          type: "string"
        },
      }
    ],
    responses: {
      200: {
        description: "Post retrieved successfully",
        content: {
          "application/json": {
            schema: {
              $ref: '#/components/schemas/StringResult'
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
      404: {
        description: "Not found",
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