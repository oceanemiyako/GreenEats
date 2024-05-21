const express = require("express");
const router = express.Router();
const historyController = require("../controllers/historyController");
const isAuthenticated = require("../middleware/authentication");

router.post("/add", isAuthenticated, historyController.add);
router.get("/getAll", isAuthenticated, historyController.getAll);
router.delete("/deleteAll", isAuthenticated, historyController.deleteAll);

module.exports = router;
