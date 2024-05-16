const express = require("express");
const bodyParser = require('body-parser'); 
const axios = require('axios');
const port = process.env.PORT || 5000; 
const cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req , res) => {
    res.json({message: "Bienvenue sur notre API"});
});

const users = require("./src/routes/userRoute");
app.use("/users", users);

app.use(bodyParser.json());


const products = require("./src/routes/productRoutes");
app.use("/products", products);

const favorites = require("./src/routes/favoriteRoute");
app.use("/favorites", favorites);


const connection = require('./config/db');
app.listen(port, (err) => {
    if (err) {
        console.error("Erreur lors du démarrage du serveur :", err);
    } else {
        console.log("Serveur est en ligne ! ");
    }
});
