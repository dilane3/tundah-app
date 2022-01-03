export default {
  get: {
    tags: ["Post CRUD operations"],
    description: "Get all posts",
    operationId: "GetAllPosts",
    parameters: [
      {
        name: "skip",
        in: "query",
        description: "number of articles to skip",
        required: true,
        schema: {
          type: "number"
        },
      },
      {
        name: "limit",
        in: "query",
        description: "number max of article to get",
        required: true,
        schema: {
          type: "number"
        },
      }
    ],
    responses: {
      200: {
        description: "Post retrieved successfully",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: '#/components/schemas/Post'
              }
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