// On importe le framework Express qui va nous permettre de créer notre API Rest
const express = require("express");
// On importe le package 'cors' qui permet de configurer les domaines qui ont accès à l'API
const cors = require("cors");
// On importe la configuration de la BDD
const DB = require("./config/db");
// On importe nos routers.
const userRoutes = require("./routes/userRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const historyRoutes = require("./routes/historyRoutes");

// On monte notre app
const app = express();
// Port sur lequel le serveur node va tourner en local.
const port = 7777;

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/history", historyRoutes);

// On teste la connexion à la BDD, si la connexion est bonne alors on lance notre serveur Node. 
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


