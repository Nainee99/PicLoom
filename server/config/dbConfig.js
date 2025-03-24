import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/picloom";

    // Validate MongoDB URI
    if (!MONGODB_URI.startsWith("mongodb://") && !MONGODB_URI.startsWith("mongodb+srv://")) {
      throw new Error("Invalid MongoDB connection string");
    }

    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Increase socket timeout
      connectTimeoutMS: 30000, // Increase connection timeout
      maxPoolSize: 10, // Optimize connection pool
      minPoolSize: 2,
      retryWrites: true
    });

    // Log success in development environment
    if (process.env.NODE_ENV === "development") {
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }

    // Set up connection event handlers
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected from MongoDB");
    });

    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

// Retry connection logic
const connectWithRetry = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const conn = await connectDB();
      return conn;
    } catch (error) {
      if (i === retries - 1) {
        console.error("Failed to connect to MongoDB after multiple retries");
        throw error;
      }
      console.log(`Retrying connection in ${delay / 1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

export { connectDB, connectWithRetry };
