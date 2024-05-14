const User = require('../models/user')

const UserController = {
    getAllUsers: (req, res) => {
        User.getAllUsers((err, result) => {
            if (err) throw err;
            res.json(result);
        });
    },
    addUser: (req, res) => {
        const newUser = req.body;
        User.addUser(newUser, (err) => {
            if (err) throw err;
            res.json({ message: "Utilisateur ajouté avec succès" });
        });
    },
    updateUser: (req, res) => {
        const id = req.params.id;
        const modifiedUser = req.body;
        User.updateUser(id, modifiedUser, (err) => {
            if (err) throw err;
            res.json({ message: "Utilisateur modifié avec succès" });
        });
    },
    deleteUser: (req, res) => {
        const id = req.params.id;
        User.deleteUser(id, (err) => {
            if (err) throw err;
            res.json({ message: "Utilisateur supprimé avec succès" });
        });
    }
};

module.exports = UserController;
