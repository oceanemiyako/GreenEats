const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const DB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const isAuthenticated = require('./middleware/authentication');

const app = express();
const port = 7777;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);

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

app.get("/", isAuthenticated, (req, res) => {
    res.json({ message: "ça fonctionne" });
    
});




