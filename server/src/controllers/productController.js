const connection = require("../../config/db")


const addEAN = (req, res) => {
    const { ean } = req.body;
    
    const productQuery = "INSERT INTO product (barcode) VALUES (?)"; 
    connection.query(productQuery, [ean], (error, productResults) => {
        if (error) {
            console.error("Erreur lors de l'ajout de l'EAN dans product :", error);
            res.status(500).json({ message: "Erreur ajout EAN" });
            return;
        }

        const historyQuery = "INSERT INTO history (search_term) VALUES (?)"; 
        connection.query(historyQuery, [ean], (historyError, historyResults) => {
            if (historyError) {
                console.error("Erreur lors de l'ajout de l'EAN dans l'historique :", historyError);
                res.status(500).json({ message: "Erreur ajout EAN dans l'historique" });
                return;
            }

            res.status(201).json({ message: "EAN ajouté avec succès", eanId: productResults.insertId });
        });
    });
};


module.exports = {addEAN};
