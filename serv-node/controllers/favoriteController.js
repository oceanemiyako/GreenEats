const { Favorite } = require("../config/db");

// Création des différentes méthodes relatives au modèle 'Favorite'.

// Méthode pour créer une nouvelle instance de la table favoris.
exports.add = async (req, res) => {
    try {
        // On récupère l'ID de l'utilisateur dans la requête.
        const userId = req.auth.userId;
        // On récupère le code-barres passé dans le corps de la requête.
        const barcode = req.body.barcode;
        // On utilise la méthode "FindOrcreate" de sequelize. Avant de créer une nouvelle instance dans la BDD, l'ORM vérifie que cette instance n'a pas déjà était créée. Si elle existe déjà alors la méthode nous renvoie un objet, sinon la nouvelle instance est créée.
        const [favorite, created] = await Favorite.findOrCreate({ where: { user_id: userId, barcode: barcode } });
        if (created) {
            res.status(201).json({ message: "Produit ajouté aux favoris." });
        } else {
            res.json({ message: "Produit déjà enregistré dans les favoris." });
        }
    } catch (error) {
        console.log(error);
        res.json({ message: "Erreur lors de l'ajout du produit." });
    }
};

// Méthode pour supprimer une instance.
exports.delete = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const barcode = req.body.param;
        await Favorite.destroy({ where: { user_id: userId, barcode: barcode } });
        res.status(200).json({ message: "Element supprimé des favoris." });
    } catch (error) {
        res.json({ error: error.message });
    }
};

// Méthode pour récupérer toutes les instances créées par un utilisateur. (recherche par ID)
exports.getAll = async (req, res) => {
    try {
        const favorites = await Favorite.findAll({ where: { user_id: req.auth.userId } });
        const data = favorites.map((favorite) => favorite.barcode);
        res.json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
};
