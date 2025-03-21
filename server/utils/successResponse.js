// Success response helper function
export const sendSuccessResponse = (
  res,
  { statusCode = 200, message = "Success", data = null }
) => {
  const response = {
    success: true,
    status: "success",
    message,
    data,
  };

  return res.status(statusCode).json(response);
};

// Common success response patterns
export const successPatterns = {
  // 200 - OK: General success, resource retrieved
  OK: { statusCode: 200, message: "Operation completed successfully" },

  // 201 - Created: Resource created
  CREATED: { statusCode: 201, message: "Resource created successfully" },

  // 202 - Accepted: Request accepted for processing
  ACCEPTED: { statusCode: 202, message: "Request accepted for processing" },

  // 204 - No Content: Success but no content to return
  NO_CONTENT: {
    statusCode: 204,
    message: "Operation successful with no content",
  },
};
