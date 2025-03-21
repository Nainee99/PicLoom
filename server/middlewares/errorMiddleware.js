import { sendErrorResponse } from "../utils/errorResponse.js";

// Global error handling middleware
const errorMiddleware = (err, req, res, next) => {
  // Log error for debugging in development
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", err);
  }

  // Handle MongoDB duplicate key errors
  if (err.code === 11000) {
    err.statusCode = 400;
    err.message = "Duplicate value entered";
  }

  // Handle MongoDB validation errors
  if (err.name === "ValidationError") {
    err.statusCode = 400;
    err.message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // Handle MongoDB CastError (invalid ObjectId)
  if (err.name === "CastError") {
    err.statusCode = 400;
    err.message = `Invalid ${err.path}: ${err.value}`;
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    err.statusCode = 401;
    err.message = "Invalid token";
  }

  // Handle JWT expiration
  if (err.name === "TokenExpiredError") {
    err.statusCode = 401;
    err.message = "Token expired";
  }

  // Use the sendErrorResponse utility to send the error
  return sendErrorResponse(res, err);
};

export default errorMiddleware;
