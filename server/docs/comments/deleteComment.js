export default {
  delete: {
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
    }
  }
}