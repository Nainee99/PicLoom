import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tag name is required"],
      trim: true,
      unique: true,
      maxlength: [50, "Tag name cannot exceed 50 characters"],
      lowercase: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
    category: {
      type: String,
      trim: true,
      lowercase: true,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "blocked", "deprecated"],
      default: "active",
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field for pins using this tag
tagSchema.virtual("pins", {
  ref: "Pin",
  localField: "_id",
  foreignField: "tags",
});

// Pre-save middleware to generate slug
tagSchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();
  this.slug = this.name.toLowerCase().replace(/\s+/g, "-");
  next();
});

// Add indexes for frequently queried fields
tagSchema.index({ name: 1 }); // For tag name searches
tagSchema.index({ slug: 1 }); // For URL-friendly lookups
tagSchema.index({ category: 1 }); // For category filtering
tagSchema.index({ usageCount: -1 }); // For trending/popular tags
tagSchema.index({ status: 1 }); // For filtering active/blocked tags

// Static method to get trending tags
tagSchema.statics.getTrendingTags = async function (limit = 10) {
  return await this.find({ status: "active" })
    .sort({ usageCount: -1 })
    .limit(limit);
};

// Static method to increment usage count
tagSchema.statics.incrementUsage = async function (tagId) {
  return await this.findByIdAndUpdate(
    tagId,
    { $inc: { usageCount: 1 } },
    { new: true }
  );
};

// Static method to search tags by name or category
tagSchema.statics.searchTags = async function (query, category = null) {
  const searchQuery = {
    status: "active",
    name: { $regex: query, $options: "i" },
  };

  if (category) {
    searchQuery.category = category.toLowerCase();
  }

  return await this.find(searchQuery).sort({ usageCount: -1 }).limit(20);
};

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
