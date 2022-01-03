export default {
  post: {
    tags: ["User CRUD operations"],
    description: "add a user Expert",
    operationId: "addExpert",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              idSubscriber: {
                type: "string",
                description: "Id of the subscriber"
              }
            }
          },
        },
      },
    },
    responses: {
      200: {
        description: "User created successfully",
        content: {
          "application/json": {
            schema: {
              $ref: '#/components/schemas/User'
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
    },
  }
}