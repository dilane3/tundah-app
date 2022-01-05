export default {
  get: {
    tags: ["Post CRUD operations"],
    description: "Get a post",
    operationId: "GetPost",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "id of a post",
        required: true,
        schema: {
          $ref: "#/components/schemas/idPost"
        },
      }
    ],
    responses: {
      200: {
        description: "Post retrieved successfully",
        content: {
          "application/json": {
            schema: {
              $ref: '#/components/schemas/Post'
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