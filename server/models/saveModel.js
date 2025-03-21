import mongoose from "mongoose";

const saveSchema = new mongoose.Schema(
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
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: [true, "Board is required"],
    },
    status: {
      type: String,
      enum: ["active", "archived", "removed"],
      default: "active",
    },
    note: {
      type: String,
      trim: true,
      maxlength: [200, "Note cannot exceed 200 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound index to ensure unique saves and optimize queries
saveSchema.index({ user: 1, pin: 1, board: 1 }, { unique: true });

// Indexes for querying user's saves and board's saves efficiently
saveSchema.index({ user: 1, createdAt: -1 });
saveSchema.index({ board: 1, createdAt: -1 });
saveSchema.index({ pin: 1, createdAt: -1 });

// Static method to check if a pin is saved to a board by a user
saveSchema.statics.isSaved = async function (userId, pinId, boardId) {
  const save = await this.findOne({
    user: userId,
    pin: pinId,
    board: boardId,
    status: "active",
  });
  return !!save;
};

// Static method to get all active saves for a pin
saveSchema.statics.getSaveCount = async function (pinId) {
  return await this.countDocuments({
    pin: pinId,
    status: "active",
  });
};

const Save = mongoose.model("Save", saveSchema);

export default Save;
