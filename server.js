import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/config/db.js";
import app from "./src/app.js";

// Connect to MongoDB
connectDB();

// Export app as serverless function for Vercel
export default async function handler(req, res) {
  // Ensure DB is connected before handling requests
  await connectDB();

  return app(req, res);
}
