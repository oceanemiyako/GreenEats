const connection = require("../../config/db")

const ProductController = {
    getAllProducts: (req, res) => {
        connection.query("SELECT * FROM product", (error, results) => {
            if (error) {
                console.error("Error ", error);
                res.status(500).json({ message: "Error " });
            } else {
                res.json(results);
            }
        });
    },
    addEAN: (req, res) => {
        const { ean } = req.body;
        const query = "INSERT INTO product (barcode) VALUES (?)"; 
        connection.query(query, [ean], (error, results) => {
            if (error) {
                console.error("Error adding EAN:", error);
                res.status(500).json({ message: "Erreur ajout EAN" });
            } else {
                res.status(201).json({ message: "EAN ajout succes", eanId: results.insertId });
            }
        });
    }
};


module.exports = ProductController;
