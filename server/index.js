const express = require("express");
const port = process.env.PORT || 5000; 

const app = express();

app.get("/", (req , res) => {

    res.json({message: "Bienvenue sur notre API"});
} );

app.listen(port, (err) => {
    console.log("Serveur est en ligne ! ");
} )

