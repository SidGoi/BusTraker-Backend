import jwt from "jsonwebtoken";
import Bus from "../models/Bus.model.js";

export const login = async (req, res) => {
  const { role, zone, busId, password } = req.body;

  // SUPER ADMIN
  if (role === "Super") {
    if (password === "9999") {
      const token = jwt.sign({ role }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.json({ token, role });
    }
    return res.status(401).json({ message: "Invalid Super Password" });
  }

  // USER / ADMIN
  const bus = await Bus.findOne({ zone, busId });

  if (!bus) {
    return res.status(404).json({ message: "Bus not found" });
  }

  if (bus.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ role, zone, busId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token, role });
};

export const me = (req, res) => {
  res.json(req.user);
};
