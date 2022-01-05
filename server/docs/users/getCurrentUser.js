export default {
  get: {
    tags: ["User CRUD operations"],
    description: "Get the current user",
    operationId: "GetCurrentUser",
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