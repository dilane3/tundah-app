export default {
  post: {
    security: {
      bearerAuth: []
    },
    tags: ["Post CRUD operations"],
    description: "Create a new post",
    operationId: "createPost",
    parameters: [
      {
        name: "Authorization",
        in: "header",
        description: "token to be passed as a header",
        required: true,
        schema: {
          type: "array",
          items: {
            type: "string",
            format: "base64",
            additionalProperties: false
          }
        },
        style: "simple"
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
        description: "Not authorized"
      },
      500: {
        description: "Server error",
      },
    }
  }
}