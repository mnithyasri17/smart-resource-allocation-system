const express = require("express");
const router = express.Router();

const resourceController = require("../controllers/resourceController");

// ✅ GET
router.get("/", resourceController.getResources);

// ✅ POST
router.post("/", resourceController.createResource);

module.exports = router;