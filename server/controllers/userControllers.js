import User from "../models/userModel.js";
import { ApiError, sendErrorResponse } from "../utils/errorResponse.js";
import { sendSuccessResponse, successPatterns } from "../utils/successResponse.js";

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.userId;
    const user = await User.findById(userId)
      .select("-password")
      .populate("pins")
      .populate("boards");

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      data: { user },
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, bio, website, avatar, coverImage } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    // Update fields if provided
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (website) user.website = website;
    if (avatar) user.avatar = avatar;
    if (coverImage) user.coverImage = coverImage;

    await user.save();

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      message: "Profile updated successfully",
      data: { user },
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId).select("+password");
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);
    if (!isPasswordValid) {
      throw new ApiError("Current password is incorrect", 401);
    }

    // Update password
    user.password = newPassword;
    await user.save();

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      message: "Password changed successfully",
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      data: { users },
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.userId;
    
    // Only allow admin to delete other users
    if (req.params.userId && req.user.role !== "admin") {
      throw new ApiError("Not authorized to delete other users", 403);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    await user.deleteOne();

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      message: "User deleted successfully",
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Toggle user status (admin only)
export const toggleUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    user.isActive = !user.isActive;
    await user.save();

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      message: `User ${user.isActive ? "activated" : "deactivated"} successfully`,
      data: { user },
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Update user role (admin only)
export const updateRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      throw new ApiError("Invalid role specified", 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    user.role = role;
    await user.save();

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      message: "User role updated successfully",
      data: { user },
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Get user boards
export const getUserBoards = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.userId;
    const user = await User.findById(userId).populate("boards");

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      data: { boards: user.boards },
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Get user pins
export const getUserPins = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.userId;
    const user = await User.findById(userId).populate("pins");

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      data: { pins: user.pins },
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Get user followers
export const getFollowers = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.userId;
    const followers = await User.find({ following: userId }).select("-password");

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      data: { followers },
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Get users being followed
export const getFollowing = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.userId;
    const following = await User.find({ followers: userId }).select("-password");

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      data: { following },
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};