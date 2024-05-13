const express = require("express");
const DB = require("./config/db");

const app = express();
const port = 7777;

app.use(express.json());

DB.sequelize
    .authenticate()
    .then(() => console.log("Connexion à la BDD réussie."))
    .then(() => {
        app.listen(port, () => {
            console.log("Le serveur écoute sur http://localhost:", port);
        });
    })
    .catch((err) => {
        console.log("Erreur lors de la connexion à la BDD.", err.message);
    });
