
const Resource = require("../models/Resource");

// ✅ GET
exports.getResources = async (req, res) => {
  try {
   const resources = await Resource.find()
  .populate("currentBooking")   // 🔥 THIS LINE IS KEY
  .lean();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ POST (THIS IS THE IMPORTANT ONE)
exports.createResource = async (req, res) => {
  try {
    const newResource = new Resource(req.body);
    await newResource.save();
    res.status(201).json(newResource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};