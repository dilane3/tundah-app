export default {
  patch: {
    security: {
      bearerAuth: []
    },
    tags: ["Post CRUD operations"],
    description: "Update a post",
    operationId: "updatePost",
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
      200: {
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