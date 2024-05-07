const express = require("express");
const UserController = require('../controllers/userController')
const router = express.Router();

// router.get("/", (req , res) => {
//     res.status(200).json({message: "L'utilisateur"})
// } )

// router.get("/:id", (req , res) => {
// req.params.id
// res.status(200).json({ 
//     id: req.params.id})
// })

router.get("/", UserController.getAllUsers);
router.post("/add-users", UserController.addUser);
router.put("/update/:id", UserController.updateUser);
router.delete("/delete/:id", UserController.deleteUser);


module.exports = router;