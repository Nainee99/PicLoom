import mongoose from "mongoose";

const pinSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    imageId: {
      type: String,
      required: [true, "Image ID is required"],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Pin must have a creator"],
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    category: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "archived", "reported"],
      default: "active",
    },
    altText: {
      type: String,
      trim: true,
      maxlength: [200, "Alt text cannot exceed 200 characters"],
    },
    destination: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?(([\w-]+\.)+[\w-]+|localhost)+(:\d+)?(\/.*)?$/,
        "Please enter a valid URL",
      ],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual fields for relationships
pinSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "pin",
});

pinSchema.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "pin",
});

pinSchema.virtual("saves", {
  ref: "Save",
  localField: "_id",
  foreignField: "pin",
});

// Add indexes for frequently queried fields
pinSchema.index({ creator: 1, createdAt: -1 });
pinSchema.index({ board: 1 });
pinSchema.index({ tags: 1 });
pinSchema.index({ status: 1 });

const Pin = mongoose.model("Pin", pinSchema);

export default Pin;
