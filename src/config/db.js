import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // Check which database we actually entered
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📂 Active Database: ${conn.connection.name}`); 
    
    // List all collections in that database
    const collections = await conn.connection.db.listCollections().toArray();
    console.log(`📋 Collections found:`, collections.map(c => c.name));

  } catch (error) {
    console.error("❌ MongoDB Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;