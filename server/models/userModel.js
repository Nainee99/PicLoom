import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      index: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      index: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false, // Don't return password in queries by default
    },
    name: {
      type: String,
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    bio: {
      type: String,
      trim: true,
      maxlength: [160, "Bio cannot exceed 160 characters"],
    },
    avatar: {
      type: String,
      default:
        "https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png",
    },
    coverImage: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDVPuMlKfGrFErmCt6hCuECLbbhekJF-GCtAJvPIZpHX5upTT-hABFlp8qZY8rkgaZ0DE&usqp=CAU",
    },
    website: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?(([\w-]+\.)+[\w-]+|localhost)+(:\d+)?(\/.*)?$/,
        "Please enter a valid URL",
      ],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual fields for relationships
userSchema.virtual("pins", {
  ref: "Pin",
  localField: "_id",
  foreignField: "creator",
});

userSchema.virtual("boards", {
  ref: "Board",
  localField: "_id",
  foreignField: "creator",
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Ensure indexes for frequently queried fields
// userSchema.index({ username: 1 });
// userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);

export default User;
