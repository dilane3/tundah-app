export default {
  delete: {
    tags: ["Post CRUD operations"],
    description: "Delete a post",
    operationId: "DeletePost",
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