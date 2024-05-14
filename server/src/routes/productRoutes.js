const express = require("express");
const ProductController = require('../controllers/productController');
const router = express.Router();

router.get("/", ProductController.getAllProducts);
router.post("/addEAN", ProductController.addEAN);
module.exports = router;
