import { body, param, query, validationResult } from "express-validator";
import { sendErrorResponse } from "../utils/errorResponse.js";

// Validation middleware wrapper
const validate = (validations) => {
  return async (req, res, next) => {
    // Execute all validations
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed");
      error.statusCode = 400;
      error.details = errors.array();
      return sendErrorResponse(res, error);
    }
    next();
  };
};

// User validation schemas
export const validateUserRegistration = validate([
  body("username")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/)
    .withMessage("Password must contain at least one letter and one number"),
]);

// Pin validation schemas
export const validatePinCreation = validate([
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Pin title is required")
    .isLength({ max: 100 })
    .withMessage("Title cannot exceed 100 characters"),
  body("description")
    .trim()
    .optional()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  body("link")
    .optional()
    .trim()
    .isURL()
    .withMessage("Please enter a valid URL"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array")
    .custom((value) => value.length <= 10)
    .withMessage("Cannot have more than 10 tags"),
]);

// Comment validation schemas
export const validateCommentCreation = validate([
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Comment content is required")
    .isLength({ max: 500 })
    .withMessage("Comment cannot exceed 500 characters"),
  param("pinId").isMongoId().withMessage("Invalid pin ID"),
]);

// Board validation schemas
export const validateBoardCreation = validate([
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Board name is required")
    .isLength({ max: 50 })
    .withMessage("Board name cannot exceed 50 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Description cannot exceed 200 characters"),
  body("privacy")
    .isIn(["public", "private", "collaborative"])
    .withMessage("Invalid privacy setting"),
]);

// Report validation schemas
export const validateReportCreation = validate([
  body("reason")
    .isIn([
      "spam",
      "harassment",
      "hate_speech",
      "inappropriate_content",
      "copyright_violation",
      "impersonation",
      "other",
    ])
    .withMessage("Invalid report reason"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),
  body("reportedItemType")
    .isIn(["user", "pin", "comment", "board"])
    .withMessage("Invalid reported item type"),
  body("reportedItemId").isMongoId().withMessage("Invalid reported item ID"),
]);

// Search validation schemas
export const validateSearch = validate([
  query("q")
    .trim()
    .notEmpty()
    .withMessage("Search query is required")
    .isLength({ max: 100 })
    .withMessage("Search query too long"),
  query("type")
    .optional()
    .isIn(["pins", "users", "boards"])
    .withMessage("Invalid search type"),
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50"),
]);

// Profile update validation schemas
export const validateProfileUpdate = validate([
  body("name")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Name cannot exceed 50 characters"),
  body("bio")
    .optional()
    .trim()
    .isLength({ max: 160 })
    .withMessage("Bio cannot exceed 160 characters"),
  body("website")
    .optional()
    .trim()
    .isURL()
    .withMessage("Please enter a valid URL"),
]);

export default validate;
