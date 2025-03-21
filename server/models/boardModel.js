import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Board title is required"],
      trim: true,
      maxlength: [50, "Board title cannot exceed 50 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Board must have a creator"],
    },
    coverImage: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDVPuMlKfGrFErmCt6hCuECLbbhekJF-GCtAJvPIZpHX5upTT-hABFlp8qZY8rkgaZ0DE&usqp=CAU",
    },
    category: {
      type: String,
      trim: true,
    },
    privacy: {
      type: String,
      enum: ["public", "private", "restricted"],
      default: "public",
    },
    collaborators: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: ["viewer", "contributor"],
          default: "viewer",
        },
      },
    ],
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field for pins in this board
boardSchema.virtual("pins", {
  ref: "Pin",
  localField: "_id",
  foreignField: "board",
});

// Add indexes for frequently queried fields
boardSchema.index({ creator: 1, createdAt: -1 });
boardSchema.index({ "collaborators.user": 1 });
boardSchema.index({ privacy: 1 });

const Board = mongoose.model("Board", boardSchema);

export default Board;
