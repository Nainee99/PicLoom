// Custom error class for API errors
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Send error response helper function
export const sendErrorResponse = (res, error) => {
  // Default to 500 if no status code is set
  const statusCode = error.statusCode || 500;
  const status = error.status || "error";

  const response = {
    success: false,
    status,
    message: error.message,
  };

  // Add stack trace in development environment
  if (process.env.NODE_ENV === "development") {
    response.stack = error.stack;
  }

  return res.status(statusCode).json(response);
};

export { ApiError };
