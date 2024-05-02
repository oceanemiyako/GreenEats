const express = require("express");

const router = express.Router();

router.get("/", (req , res) => {
    res.status(200).json({message: "L'utilisateur"})
} )

router.get("/:id", (req , res) => {
req.params.id
res.status(200).json({ 
    id: req.params.id})
})

module.exports = router;