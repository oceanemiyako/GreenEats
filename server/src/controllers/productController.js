const connection = require('../../config/db');

const ProductController = {
    getAllProducts: (req, res) => {
        connection.query("SELECT * FROM product", (error, results) => {
            if (error) {
                console.error("Erreur lors de la récupération des produits :", error);
                res.status(500).json({ message: "Erreur lors de la récupération des produits" });
            } else {
                res.json(results);
            }
        });
    },
    getProductByUsername: (req, res) => {
        const username = req.params.username;

        const query = "SELECT * FROM product WHERE username = ?";
        connection.query(query, [username], (error, results) => {
            if (error) {
                console.error("Erreur lors de la récupération du produit :", error);
                res.status(500).json({ message: "Erreur lors de la récupération du produit" });
            } else if (results.length === 0) {
                res.status(404).json({ message: "non trouvé" });
            } else {
                res.json(results[0]); 
            }
        });
    }
};

module.exports = ProductController;
