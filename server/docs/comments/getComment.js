export default {
  get: {
    tags: ["Comment CRUD operations"],
    description: "Get a comment",
    operationId: "GetComment",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "id of a Comment",
        required: true,
        schema: {
          $ref: "#/components/schemas/idComment"
        },
      }
    ],
    responses: {
      200: {
        description: "Post retrieved successfully",
        content: {
          "application/json": {
            schema: {
              $ref: '#/components/schemas/Comment'
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
      400: {
        description: "Bad request",
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