const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteController");
const isAuthenticated = require("../middleware/authentication");

// On définit les endpoints pour créer nos routes à partir des méthodes créées dans notre controller.
// Ici chacune des routes nécessite d'être connecté, on intégre donc le middleware 'isAuthenticated'
router.post("/add", isAuthenticated, favoriteController.add);
router.get("/getAll", isAuthenticated, favoriteController.getAll )
router.delete("/delete", isAuthenticated, favoriteController.delete )

// Enfin, on exporte notre router.
module.exports = router;
