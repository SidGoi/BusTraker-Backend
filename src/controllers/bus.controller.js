import Bus from "../models/Bus.model.js";

export const getAllBuses = async (req, res) => {
  try {
    const { zone, status } = req.query;

    const filter = {};

    if (zone) filter.zone = { $regex: zone, $options: "i" };
    if (status) filter.status = { $regex: status, $options: "i" };

    const buses = await Bus.find(filter).sort({ zone: 1, busId: 1 });

    res.status(200).json({
      success: true,
      count: buses.length,
      data: buses,
    });
  } catch (error) {
    console.error("Get All Buses Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch buses",
    });
  }
};


export const getBusLoginDetails = async (req, res) => {
  try {
    // We fetch all buses but only select specific fields
    // Adding '-_id' excludes the MongoDB ID if you don't need it
    const loginData = await Bus.find({})
      .select('zone busId password -_id') 
      .sort({ zone: 1, busId: 1 });

    res.status(200).json({
      success: true,
      count: loginData.length,
      data: loginData,
    });
  } catch (error) {
    console.error("Login Details Fetch Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch login credentials",
    });
  }
};

export const updateBusLocation = async (req, res) => {
  try {
    const { busId, location } = req.body;

    // 1. Precise Validation
    if (busId === undefined || !location || !Array.isArray(location)) {
      return res.status(400).json({
        success: false,
        message: "Missing busId or location array [lat, lng]",
      });
    }

    // 2. Ensure busId is a Number (important for 1.1, 2.2 format)
    const numericBusId = Number(busId);

    // 3. Update using $set for specific fields
    const updatedBus = await Bus.findOneAndUpdate(
      { busId: numericBusId }, 
      { 
        $set: { 
          location: location, 
          lastUpdate: new Date() 
        } 
      },
      { new: true } // returns the document AFTER update
    );

    if (!updatedBus) {
      return res.status(404).json({
        success: false,
        message: `Bus ${numericBusId} not found in database`,
      });
    }

    res.status(200).json({
      success: true,
      data: updatedBus,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};