const { Favorite } = require("../config/db");

exports.add = async (req, res) => {
    try {
        const userId = req.auth.userId;
        console.log(userId);
        const barcode = req.body.barcode;
        console.log(barcode);
        await Favorite.create({
            user_id: userId,
            barcode,
        });
        res.status(201).json({ message: "Produit ajouté aux favoris." });
    } catch (error) {
        console.log(error);
        res.json({ message: "Erreur lors de l'ajout du produit." });
    }
};
