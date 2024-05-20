const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");
const isAuthenticated = require("../middleware/authentication");

router.post("/add", isAuthenticated, favoriteController.add);
router.get("/getAll", isAuthenticated, favoriteController.getAll )

module.exports = router;
