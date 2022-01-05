export default {
  get: {
    tags: ["User CRUD operations"],
    description: "Get a user",
    operationId: "GetUser",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "id of the user",
        required: true,
        schema: {
          $ref: "#/components/schemas/idUser"
        },
      }
    ],
    responses: {
      200: {
        description: "User retrieved successfully",
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
    }
  }
}