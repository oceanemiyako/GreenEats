const express = require("express");
const port = process.env.PORT || 5000; 



const app = express();

app.get("/", (req , res) => {

    res.json({message: "Bienvenue sur notre API"});
} );

const users = require("./routes/user");
app.use("/user", users);



const connection = require('./config/db');

app.post('/api/ajouter', (req, res) => {
    const { nom, email , statut } = req.body;
    connection.query('INSERT INTO utilisateurs (nom, email,statut) VALUES (?, ?)', [nom, email, statut], (err, result) => {
        if (err) throw err;
        res.send('Utilisateur ajouté avec succès');
    });
});







app.listen(port, (err) => {
    console.log("Serveur est en ligne ! ");
} )

