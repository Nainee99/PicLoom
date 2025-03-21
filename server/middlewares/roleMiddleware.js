import { sendErrorResponse } from "../utils/errorResponse.js";

// Define role hierarchy and permissions
const ROLE_HIERARCHY = {
  admin: ["moderator", "user"],
  moderator: ["user"],
  user: [],
};

const ROLE_PERMISSIONS = {
  admin: [
    "manage_users",
    "manage_content",
    "moderate_content",
    "create_content",
  ],
  moderator: ["moderate_content", "create_content"],
  user: ["create_content"],
};

// Check if role has permission through hierarchy
const hasPermission = (userRole, requiredPermission) => {
  const roles = [userRole, ...(ROLE_HIERARCHY[userRole] || [])];
  return roles.some((role) =>
    ROLE_PERMISSIONS[role]?.includes(requiredPermission)
  );
};

// Middleware to check specific permissions
export const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        const error = new Error("Unauthorized - User role not found");
        error.statusCode = 403;
        return sendErrorResponse(res, error);
      }

      if (!hasPermission(req.user.role, requiredPermission)) {
        const error = new Error(
          `Forbidden - Required permission: ${requiredPermission}`
        );
        error.statusCode = 403;
        return sendErrorResponse(res, error);
      }

      next();
    } catch (error) {
      error.statusCode = 500;
      return sendErrorResponse(res, error);
    }
  };
};

// Middleware to check multiple permissions (AND logic)
export const checkPermissions = (requiredPermissions) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        const error = new Error("Unauthorized - User role not found");
        error.statusCode = 403;
        return sendErrorResponse(res, error);
      }

      const hasAllPermissions = requiredPermissions.every((permission) =>
        hasPermission(req.user.role, permission)
      );

      if (!hasAllPermissions) {
        const error = new Error(
          `Forbidden - Required permissions: ${requiredPermissions.join(", ")}`
        );
        error.statusCode = 403;
        return sendErrorResponse(res, error);
      }

      next();
    } catch (error) {
      error.statusCode = 500;
      return sendErrorResponse(res, error);
    }
  };
};
