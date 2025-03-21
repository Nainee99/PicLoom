import dotenv from "dotenv";
import app from "./app.js";

// Load environment variables
dotenv.config();

// Set port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});