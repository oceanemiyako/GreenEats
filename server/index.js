const express = require("express");
const bodyParser = require('body-parser'); 
const axios = require('axios');
const port = process.env.PORT || 5000; 

const app = express();

app.get("/", (req , res) => {
    res.json({message: "Bienvenue sur notre API"});
});

const users = require("./src/routes/userRoute");
app.use("/users", users);

app.use(bodyParser.json());


const products = require("./src/routes/productRoutes");
app.use("/products", products);


// app.get("/product/:ean", async (req, res) => {
//     const ean = req.params.ean;
//     try {
//         const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${ean}`);
//         res.json(response.data);
//     } catch (error) {
//         console.error("Erreur lors de la récupération des détails du produit :", error);
//         res.status(500).json({ message: "Erreur lors de la récupération des détails du produit" });
//     }
// });

const connection = require('./config/db');
app.listen(port, (err) => {
    if (err) {
        console.error("Erreur lors du démarrage du serveur :", err);
    } else {
        console.log("Serveur est en ligne ! ");
    }
});
