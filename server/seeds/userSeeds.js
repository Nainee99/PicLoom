import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB for seeding"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Generate a random role with a 90% chance of being 'user' and 10% chance of being 'admin'
const generateRole = () => (Math.random() < 0.9 ? "user" : "admin");

// Generate a random verification status with 80% chance of being verified
const generateVerificationStatus = () => Math.random() < 0.8;

// Generate a random active status with 95% chance of being active
const generateActiveStatus = () => Math.random() < 0.95;

// Generate a random date within the last year for lastLogin
const generateLastLogin = () => {
  const now = new Date();
  const oneYearAgo = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate()
  );
  return new Date(
    oneYearAgo.getTime() +
      Math.random() * (now.getTime() - oneYearAgo.getTime())
  );
};

// Generate a single user with realistic data
const generateUser = async () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const username = faker.internet
    .username({ firstName, lastName })
    .slice(0, 30);

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("Password123!", salt);

  return {
    username,
    email: faker.internet.email({ firstName, lastName }),
    password: hashedPassword,
    name: `${firstName} ${lastName}`,
    bio: faker.lorem.sentence(10),
    avatar: faker.image.avatar(),
    coverImage: faker.image.url(),
    website: Math.random() < 0.7 ? faker.internet.url() : undefined,
    role: generateRole(),
    isVerified: generateVerificationStatus(),
    isActive: generateActiveStatus(),
    lastLogin: generateLastLogin(),
    createdAt: faker.date.past({ years: 2 }),
    updatedAt: faker.date.recent(),
  };
};

// Seed the database with users
const seedUsers = async (count = 100) => {
  try {
    // Clear existing users except those with specific emails you want to keep
    await User.deleteMany({
      email: { $nin: ["admin@picloom.com", "test@picloom.com"] },
    });

    console.log("Existing users cleared");

    // Generate and insert users in batches
    const batchSize = 10;
    const batches = Math.ceil(count / batchSize);

    for (let i = 0; i < batches; i++) {
      const userPromises = [];
      const currentBatchSize = Math.min(batchSize, count - i * batchSize);

      for (let j = 0; j < currentBatchSize; j++) {
        userPromises.push(generateUser());
      }

      const users = await Promise.all(userPromises);
      await User.insertMany(users, { ordered: false });

      console.log(`Batch ${i + 1}/${batches} completed`);
    }

    console.log(`Successfully seeded ${count} users`);
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    mongoose.disconnect();
  }
};

// Execute the seeding
seedUsers();
