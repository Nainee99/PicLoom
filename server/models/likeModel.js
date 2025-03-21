import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    pin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pin",
      required: [true, "Pin is required"],
    },
    status: {
      type: String,
      enum: ["active", "removed"],
      default: "active",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound index to ensure unique likes and optimize queries
likeSchema.index({ user: 1, pin: 1 }, { unique: true });

// Index for querying user's likes and pin's likes efficiently
likeSchema.index({ user: 1, createdAt: -1 });
likeSchema.index({ pin: 1, createdAt: -1 });

// Static method to check if a user has liked a pin
likeSchema.statics.hasLiked = async function (userId, pinId) {
  const like = await this.findOne({
    user: userId,
    pin: pinId,
    status: "active",
  });
  return !!like;
};

const Like = mongoose.model("Like", likeSchema);

export default Like;
