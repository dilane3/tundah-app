export default {
  post: {
    tags: ["User CRUD operations"],
    description: "Signin a user",
    operationId: "signin",
    parameters: [],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UserInputConnection",
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
    },
  }
}