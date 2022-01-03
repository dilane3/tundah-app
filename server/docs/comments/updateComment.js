export default {
  patch: {
    tags: ["Comment CRUD operations"],
    description: "delete a comment",
    operationId: "deleteComment",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "id of a comment",
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
        description: "Bad requestion",
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