import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Comment text is required"],
      trim: true,
      maxlength: [1000, "Comment cannot exceed 1000 characters"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Comment must have an author"],
    },
    pin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pin",
      required: [true, "Comment must be associated with a pin"],
    },
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "hidden", "reported", "deleted"],
      default: "active",
    },
    edited: {
      type: Boolean,
      default: false,
    },
    editHistory: [
      {
        text: String,
        editedAt: Date,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field for replies to this comment
commentSchema.virtual("replies", {
  ref: "Comment",
  localField: "_id",
  foreignField: "parentComment",
});

// Add indexes for frequently queried fields
commentSchema.index({ pin: 1, createdAt: -1 }); // For retrieving comments on a pin
commentSchema.index({ author: 1, createdAt: -1 }); // For retrieving user's comments
commentSchema.index({ parentComment: 1, createdAt: -1 }); // For retrieving replies
commentSchema.index({ status: 1 }); // For moderation queries

// Static method to get comment count for a pin
commentSchema.statics.getCommentCount = async function (pinId) {
  return await this.countDocuments({
    pin: pinId,
    status: "active",
    parentComment: null, // Only count top-level comments
  });
};

// Static method to get reply count for a comment
commentSchema.statics.getReplyCount = async function (commentId) {
  return await this.countDocuments({
    parentComment: commentId,
    status: "active",
  });
};

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
