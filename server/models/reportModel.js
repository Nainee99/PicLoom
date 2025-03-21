import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Reporter is required"],
    },
    reportedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reportedPin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pin",
    },
    reportedComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    reportedBoard: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
    reason: {
      type: String,
      required: [true, "Report reason is required"],
      enum: [
        "spam",
        "harassment",
        "hate_speech",
        "inappropriate_content",
        "copyright_violation",
        "impersonation",
        "other",
      ],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    status: {
      type: String,
      enum: ["pending", "under_review", "resolved", "dismissed"],
      default: "pending",
    },
    resolution: {
      type: String,
      enum: [
        "warning",
        "content_removed",
        "account_suspended",
        "no_action",
        null,
      ],
      default: null,
    },
    resolutionNote: {
      type: String,
      trim: true,
      maxlength: [200, "Resolution note cannot exceed 200 characters"],
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewedAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Ensure at least one reported entity exists
reportSchema.pre("save", function (next) {
  if (
    !this.reportedUser &&
    !this.reportedPin &&
    !this.reportedComment &&
    !this.reportedBoard
  ) {
    next(
      new Error(
        "At least one reported entity (user, pin, comment, or board) is required"
      )
    );
  }
  next();
});

// Add indexes for frequently queried fields
reportSchema.index({ reporter: 1, createdAt: -1 }); // For user's submitted reports
reportSchema.index({ reportedUser: 1, status: 1 }); // For reported user queries
reportSchema.index({ reportedPin: 1, status: 1 }); // For reported pin queries
reportSchema.index({ reportedComment: 1, status: 1 }); // For reported comment queries
reportSchema.index({ reportedBoard: 1, status: 1 }); // For reported board queries
reportSchema.index({ status: 1, createdAt: -1 }); // For moderation queue

// Static method to get pending reports count
reportSchema.statics.getPendingReportsCount = async function () {
  return await this.countDocuments({ status: "pending" });
};

// Static method to check if an entity has active reports
reportSchema.statics.hasActiveReports = async function (entityType, entityId) {
  const query = {
    [`reported${entityType}`]: entityId,
    status: { $in: ["pending", "under_review"] },
  };
  return (await this.countDocuments(query)) > 0;
};

const Report = mongoose.model("Report", reportSchema);

export default Report;
