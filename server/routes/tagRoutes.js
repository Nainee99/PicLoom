import express from "express";
import {
  createTag,
  getTagById,
  getTagBySlug,
  updateTag,
  deleteTag,
  getTrendingTags,
  searchTags,
  getTagsByCategory,
  toggleTagStatus,
} from "../controllers/tagController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/roleMiddleware.js";
import { sanitizeData } from "../middlewares/sanitizeMiddleware.js";
import { authLimiter } from "../middlewares/rateLimitMiddleware.js";

const router = express.Router();

// Public routes
router.get("/trending", authLimiter, getTrendingTags);
router.get("/search", authLimiter, searchTags);
router.get("/category/:category", authLimiter, getTagsByCategory);
router.get("/id/:tagId", authLimiter, getTagById);
router.get("/slug/:slug", authLimiter, getTagBySlug);

// Protected routes - require authentication
router.use(verifyToken);

// Tag management routes
router.post("/", sanitizeData, createTag);
router.put("/:tagId", sanitizeData, updateTag);

// Admin only routes
router.delete("/:tagId", checkPermission("manage_tags"), deleteTag);
router.patch(
  "/toggle-status/:tagId",
  checkPermission("manage_tags"),
  toggleTagStatus
);

export default router;
