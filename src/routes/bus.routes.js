import express from "express";
import { getAllBuses, getBusLoginDetails, updateBusLocation } from "../controllers/bus.controller.js";

const router = express.Router();

router.get("/all", getAllBuses);
router.get("/login-credentials", getBusLoginDetails);
router.patch("/update-location", updateBusLocation);

export default router;
