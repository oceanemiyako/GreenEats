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

exports.getAll = async (req, res) => {
    try {
        const histories = await History.findAll({ where: { user_id: req.auth.userId } });
        const data = histories.map((history) => history.barcode);
        res.json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
};

exports.deleteAll = async (req, res) => {
    try {
        await History.destroy({where: { user_id: req.auth.userId}});
        res.status(200).json({message: "Historique supprimé."})
    } catch (error) {
        res.json({ message: error.message})
    }
}