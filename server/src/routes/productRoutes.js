const express = require("express");
const ProductController = require('../controllers/productController');
const router = express.Router();

router.get("/", ProductController.getAllProducts);
router.get("/username/:username", ProductController.getProductByUsername);

module.exports = router;
