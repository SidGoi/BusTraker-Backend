import app from "../app.js"; // path to your current app.js
import connectDB from "../config/db.js"; // your MongoDB connection

connectDB(); // connect to MongoDB Atlas

export default app;
