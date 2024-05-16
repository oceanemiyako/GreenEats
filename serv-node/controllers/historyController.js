const { History } = require("../config/db");

exports.add = async (req, res) => {
    try {
        const userId = req.auth.userId;
        console.log(userId);
        const barcode = req.body.barcode;
        console.log(barcode);
        await History.create({
            user_id: userId,
            barcode,
        });
        res.status(201).json({ message: "Produit ajouté à l'historique." });
    } catch (error) {
        console.log(error);
        res.json({ message: "Erreur lors de l'ajout du produit à l'historique." });
    }
};
