import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  resetPassword,
  refreshToken,
} from "../controllers/authControllers.js";
import {
  verifyToken,
  verifyRefreshToken,
} from "../middlewares/authMiddleware.js";
import { validateUserRegistration } from "../middlewares/validateMiddleware.js";
import {
  authLimiter,
  createUserLimiter,
} from "../middlewares/rateLimitMiddleware.js";
import { sanitizeData } from "../middlewares/sanitizeMiddleware.js";

const router = express.Router();

// Register new user
router.post(
  "/register",
  createUserLimiter,
  sanitizeData,
  validateUserRegistration,
  registerUser
);

// Login user
router.post("/login", authLimiter, sanitizeData, loginUser);

// Logout user (requires authentication)
router.post("/logout", verifyToken, logoutUser);

// Reset password (requires valid token)
router.post("/reset-password", sanitizeData, resetPassword);

// Refresh access token
router.post("/refresh-token", verifyRefreshToken, refreshToken);

export default router;
