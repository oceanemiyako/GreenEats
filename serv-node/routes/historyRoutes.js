const express = require("express");
const router = express.Router();
const historyController = require("../controllers/historyController");
const isAuthenticated = require("../middleware/authentication");

router.post("/add", isAuthenticated, historyController.add);

module.exports = router;
