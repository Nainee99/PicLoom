import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
  getAllUsers,
  deleteUser,
  toggleUserStatus,
  updateRole,
  getUserBoards,
  getUserPins,
  getFollowers,
  getFollowing,
} from "../controllers/userControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/roleMiddleware.js";
import { validateProfileUpdate } from "../middlewares/validateMiddleware.js";
import { sanitizeData } from "../middlewares/sanitizeMiddleware.js";

const router = express.Router();

// Protected routes - require authentication
router.use(verifyToken);

// User profile routes
router.get("/profile/:userId?", getUserProfile);
router.put("/profile", sanitizeData, validateProfileUpdate, updateUserProfile);
router.put("/change-password", sanitizeData, changePassword);

// User content routes
router.get("/boards/:userId?", getUserBoards);
router.get("/pins/:userId?", getUserPins);
router.get("/followers/:userId?", getFollowers);
router.get("/following/:userId?", getFollowing);

// Admin only routes
router.get("/all", checkPermission("manage_users"), getAllUsers);
router.delete("/delete/:userId?", checkPermission("manage_users"), deleteUser);
router.patch("/toggle-status/:userId", checkPermission("manage_users"), toggleUserStatus);
router.patch("/update-role/:userId", checkPermission("manage_users"), updateRole);

export default router;