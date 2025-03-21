import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Follower user is required"],
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Following user is required"],
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    notificationPreference: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound index to ensure unique follows and optimize queries
followSchema.index({ follower: 1, following: 1 }, { unique: true });

// Index for querying followers/following lists efficiently
followSchema.index({ follower: 1, createdAt: -1 });
followSchema.index({ following: 1, createdAt: -1 });

// Static method to check if a user follows another
followSchema.statics.isFollowing = async function (followerId, followingId) {
  const follow = await this.findOne({
    follower: followerId,
    following: followingId,
    status: "active",
  });
  return !!follow;
};

const Follow = mongoose.model("Follow", followSchema);

export default Follow;
