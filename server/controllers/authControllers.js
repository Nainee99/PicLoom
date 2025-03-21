import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { ApiError, sendErrorResponse } from "../utils/errorResponse.js";
import {
  sendSuccessResponse,
  successPatterns,
} from "../utils/successResponse.js";

// Generate tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

// Set secure cookies
const setTokenCookies = (res, { accessToken, refreshToken }) => {
  // Set access token cookie
  res.cookie("token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  // Set refresh token cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// Clear auth cookies
const clearTokenCookies = (res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.cookie("refreshToken", "", { maxAge: 0 });
};

// Register new user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new ApiError(
        existingUser.email === email
          ? "Email already registered"
          : "Username already taken",
        400
      );
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password,
    });

    // Generate tokens
    const tokens = generateTokens(user._id);
    setTokenCookies(res, tokens);

    // Send success response
    return sendSuccessResponse(res, {
      ...successPatterns.CREATED,
      message: "User registered successfully",
      data: {
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new ApiError("Invalid credentials", 401);
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new ApiError("Invalid credentials", 401);
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate tokens
    const tokens = generateTokens(user._id);
    setTokenCookies(res, tokens);

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      message: "Login successful",
      data: {
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Logout user
export const logoutUser = (req, res) => {
  try {
    clearTokenCookies(res);
    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      message: "Logout successful",
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify reset token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new ApiError("Invalid or expired reset token", 400);
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Clear existing sessions
    clearTokenCookies(res);

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      message: "Password reset successful",
    });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      error = new ApiError("Invalid or expired reset token", 400);
    }
    return sendErrorResponse(res, error);
  }
};

// Refresh token
export const refreshToken = async (req, res) => {
  try {
    const { userId } = req.user; // From verifyRefreshToken middleware

    // Generate new tokens
    const tokens = generateTokens(userId);
    setTokenCookies(res, tokens);

    return sendSuccessResponse(res, {
      ...successPatterns.OK,
      message: "Token refreshed successfully",
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};
