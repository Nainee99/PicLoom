import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Tag from "../models/tagModel.js";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB for seeding tags"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Predefined categories with their related topics
const categories = {
  art: ["painting", "drawing", "sculpture", "digital art", "illustration"],
  photography: ["portrait", "landscape", "street", "nature", "macro"],
  design: ["ui/ux", "graphic", "interior", "branding", "typography"],
  fashion: ["streetwear", "vintage", "minimalist", "accessories", "haute couture"],
  technology: ["gadgets", "software", "ai", "web development", "robotics"],
  food: ["recipes", "baking", "healthy", "desserts", "drinks"],
  travel: ["adventure", "cities", "nature", "culture", "tips"],
  diy: ["crafts", "home decor", "upcycling", "woodworking", "gardening"]
};

// Generate a random status with weights
const generateStatus = () => {
  const rand = Math.random();
  if (rand < 0.8) return "active";
  if (rand < 0.95) return "blocked";
  return "deprecated";
};

// Generate a random usage count based on status
const generateUsageCount = (status) => {
  switch (status) {
    case "active":
      return Math.floor(Math.random() * 10000);
    case "blocked":
      return Math.floor(Math.random() * 1000);
    case "deprecated":
      return Math.floor(Math.random() * 100);
    default:
      return 0;
  }
};

// Generate a single tag
const generateTag = async (users) => {
  // Randomly select a category and its topic
  const categoryNames = Object.keys(categories);
  const category = categoryNames[Math.floor(Math.random() * categoryNames.length)];
  const topics = categories[category];
  const topic = topics[Math.floor(Math.random() * topics.length)];

  // Generate a unique tag name by combining topic with a random word
  const name = `${topic}-${faker.word.sample()}`;

  // Randomly select a creator from the users array
  const creator = users[Math.floor(Math.random() * users.length)]._id;

  const status = generateStatus();
  const usageCount = generateUsageCount(status);

  return {
    name: name.toLowerCase(),
    description: faker.lorem.sentence(),
    category,
    creator,
    status,
    usageCount,
    createdAt: faker.date.past({ years: 2 }),
    updatedAt: faker.date.recent()
  };
};

// Seed the database with tags
const seedTags = async (count = 200) => {
  try {
    // Get all active users for assigning as creators
    const users = await User.find({ isActive: true });
    if (users.length === 0) {
      throw new Error("No active users found. Please seed users first.");
    }

    // Clear existing tags
    await Tag.deleteMany({});
    console.log("Existing tags cleared");

    // Generate and insert tags in batches
    const batchSize = 20;
    const batches = Math.ceil(count / batchSize);

    for (let i = 0; i < batches; i++) {
      const tagPromises = [];
      const currentBatchSize = Math.min(batchSize, count - i * batchSize);

      for (let j = 0; j < currentBatchSize; j++) {
        tagPromises.push(generateTag(users));
      }

      const tags = await Promise.all(tagPromises);
      await Tag.insertMany(tags, { ordered: false });

      console.log(`Batch ${i + 1}/${batches} completed`);
    }

    console.log(`Successfully seeded ${count} tags`);
  } catch (error) {
    console.error("Error seeding tags:", error);
  } finally {
    mongoose.disconnect();
  }
};

// Execute the seeding
seedTags();