const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../config/db");

exports.register = async (req, res) => {
    try {
        const newUser = req.body.newUser;
        const username = newUser.username;
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
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
        const userCredentials = req.body.userCredentials;
        const username = userCredentials.username;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: "Utilisateur ou mot de passe incorrect." });
        }

        const isValid = await bcrypt.compare(userCredentials.password, user.password);

        if (!isValid) {
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }

        const token = jwt.sign({ userId: user.id }, "TOP_SECRET", { expiresIn: "1h" });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.profile = async (req, res) => {
    try {
      const userId = req.auth.userId;
      console.log(userId);
      const { username } = await User.findByPk(userId);
  
      if (!username) {
        return res.status(404).json("Utilisateur inconnu");
      }
  
      res.status(200).json({ username });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };