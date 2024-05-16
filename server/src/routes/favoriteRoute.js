const express = require("express");
const FavoriteController = require('../controllers/favoriteController');
const router = express.Router();

router.post("/addFavorite", FavoriteController.addFavorite);

module.exports = router;
