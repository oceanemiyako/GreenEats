const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAuthenticated = require("../middleware/authentication");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/profile", isAuthenticated, userController.profile);


module.exports = router;
