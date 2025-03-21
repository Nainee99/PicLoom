import jwt from "jsonwebtoken";
import { sendErrorResponse } from "../utils/errorResponse.js";

// Verify access token middleware
export const verifyToken = (req, res, next) => {
  try {
    // Get token from cookie or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      const error = new Error("Access denied. No token provided.");
      error.statusCode = 401;
      return sendErrorResponse(res, error);
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info to request object
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      error.statusCode = 401;
      error.message = "Token has expired";
    } else if (error.name === "JsonWebTokenError") {
      error.statusCode = 401;
      error.message = "Invalid token";
    }
    return sendErrorResponse(res, error);
  }
};

// Verify refresh token middleware
export const verifyRefreshToken = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      const error = new Error("Refresh token not found");
      error.statusCode = 401;
      return sendErrorResponse(res, error);
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      error.statusCode = 401;
      error.message = "Refresh token has expired";
    } else if (error.name === "JsonWebTokenError") {
      error.statusCode = 401;
      error.message = "Invalid refresh token";
    }
    return sendErrorResponse(res, error);
  }
};

// Role-based access control middleware
export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      const error = new Error("Unauthorized - Role verification failed");
      error.statusCode = 403;
      return sendErrorResponse(res, error);
    }

    if (!roles.includes(req.user.role)) {
      const error = new Error("Forbidden - Insufficient role privileges");
      error.statusCode = 403;
      return sendErrorResponse(res, error);
    }

    next();
  };
};

// Optional auth middleware - allows both authenticated and unauthenticated access
export const optionalAuth = (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    }
    next();
  } catch (error) {
    // If token verification fails, continue without user data
    next();
  }
};
