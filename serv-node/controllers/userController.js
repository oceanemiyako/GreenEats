const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../config/db");

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            password: hashedPassword,
        });
        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: "Utilisateur ou mot de passe incorrect." });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }

        const token = jwt.sign({ userId: user.id }, "TOP_SECRET", { expiresIn: "24h" });
        res.cookie("acces_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json({message: "Connexion réussie."})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
