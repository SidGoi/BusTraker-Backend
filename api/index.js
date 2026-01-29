import app from "../src/app.js"; // path to your current app.js
import connectDB from "../src/config/db.js"; // your MongoDB connection

connectDB(); // connect to MongoDB Atlas

export default app;
