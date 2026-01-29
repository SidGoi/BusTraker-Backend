import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import busRoutes from "./routes/bus.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mission 92 API Running 🚍");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);

export default app;