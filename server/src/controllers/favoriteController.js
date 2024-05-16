const connection = require("../../config/db");

const addFavorite = (req, res) => {
    const { barcode } = req.body;

    const favoriteQuery = "INSERT INTO favory (barcode) VALUES (?)";
    connection.query(favoriteQuery, [barcode], (error, results) => {
        if (error) {
            console.error("Erreur lors de l'ajout du favori :", error);
            res.status(500).json({ message: "Erreur lors de l'ajout du favori", error: error.message }); 
            return;
        }

        console.log("Favori ajouté avec succès");
        res.status(201).json({ message: "Favori ajouté avec succès", favoriteId: results.insertId });
    });
};

module.exports = { addFavorite };
