const { History } = require("../config/db");

exports.add = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const barcode = req.body.barcode;
        const [history, create] = await History.findOrCreate({ where: { user_id: userId, barcode: barcode } });
        if (create) {
            res.status(201).json({ message: "Produit ajouté à l'historique." });
        } else {
            res.json({ message: "Produit déjà enregistré dans l'historique." });
        }
    } catch (error) {
        console.log(error);
        res.json({ message: "Erreur lors de l'ajout du produit à l'historique." });
    }
};
