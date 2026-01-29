import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  zone: String,
  busId: Number,
  password: Number,
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  location: [Number],
  lastUpdate: Date,
}, { 
  collection: 'Bus' 
});

export default mongoose.model("Bus", busSchema);