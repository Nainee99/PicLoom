import Tag from "../models/tagModel.js";
import { ApiError, sendErrorResponse } from "../utils/errorResponse.js";
import { sendSuccessResponse, successPatterns } from "../utils/successResponse.js";

// Create a new tag
export const createTag = async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const creator = req.user.userId;

    const existingTag = await Tag.findOne({ name: name.toLowerCase() });
    if (existingTag) {
      throw new ApiError("Tag already exists", 400);
    }

    const tag = await Tag.create({
      name,
      description,
      category,
      creator,
    });

    return sendSuccessResponse(res, {
      ...successPatterns.CREATED,
      message: "Tag created successfully",
      data: { tag },
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Get tag by ID
export const getTagById = async (req, res) => {
  try {
    const { tagId } = req.params;
    const tag = await Tag.findById(tagId).populate("pins");

    if (!tag) {
      throw new ApiError("Tag not found", 404);
    }

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      data: { tag },
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Get tag by slug
export const getTagBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const tag = await Tag.findOne({ slug }).populate("pins");

    if (!tag) {
      throw new ApiError("Tag not found", 404);
    }

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      data: { tag },
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Update tag
export const updateTag = async (req, res) => {
  try {
    const { tagId } = req.params;
    const { description, category } = req.body;

    const tag = await Tag.findById(tagId);
    if (!tag) {
      throw new ApiError("Tag not found", 404);
    }

    // Only allow updating description and category
    if (description) tag.description = description;
    if (category) tag.category = category;

    await tag.save();

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      message: "Tag updated successfully",
      data: { tag },
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Delete tag (admin only)
export const deleteTag = async (req, res) => {
  try {
    const { tagId } = req.params;

    const tag = await Tag.findById(tagId);
    if (!tag) {
      throw new ApiError("Tag not found", 404);
    }

    // Check if tag is in use
    if (tag.usageCount > 0) {
      tag.status = "deprecated";
      await tag.save();
      return sendSuccessResponse(res, {
        ...successPatterns.OK,
        message: "Tag marked as deprecated due to existing usage",
      });
    }

    await tag.deleteOne();

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      message: "Tag deleted successfully",
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Get trending tags
export const getTrendingTags = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const tags = await Tag.getTrendingTags(limit);

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      data: { tags },
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Search tags
export const searchTags = async (req, res) => {
  try {
    const { query, category } = req.query;
    if (!query) {
      throw new ApiError("Search query is required", 400);
    }

    const tags = await Tag.searchTags(query, category);

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      data: { tags },
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Get tags by category
export const getTagsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const tags = await Tag.find({
      category: category.toLowerCase(),
      status: "active",
    }).sort({ usageCount: -1 });

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      data: { tags },
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Toggle tag status (admin only)
export const toggleTagStatus = async (req, res) => {
  try {
    const { tagId } = req.params;
    const { status } = req.body;

    if (!["active", "blocked"].includes(status)) {
      throw new ApiError("Invalid status specified", 400);
    }

    const tag = await Tag.findById(tagId);
    if (!tag) {
      throw new ApiError("Tag not found", 404);
    }

    tag.status = status;
    await tag.save();

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      message: `Tag ${status === "active" ? "activated" : "blocked"} successfully`,
      data: { tag },
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};