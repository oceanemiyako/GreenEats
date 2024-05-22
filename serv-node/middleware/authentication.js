// On importe le package jsonwebtoken, qui ici nous sert à vérifier grâce à la méthode '.verify' que le token envoyé dans la requête correspond bien à celui généré dans le back.
const jwt = require("jsonwebtoken");

// On crée un middleware qui va nous permettre de vérifier grâce au token, si l'utilisateur est bien connecté.
function isAuthenticated(req, res, next) {
    try {
        // On récupére le token passé dans le header de la requête.
        const token = req.headers.authorization;
        // On décode la token avec la méthode 'verify'
        const decodedToken = jwt.verify(token, "TOP_SECRET");
        // On récupére l'ID de l'utilisateur qui est stocké dans le token et on le passe dans la requête.
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId,
        };
        return next();
    } catch (error) {
        res.status(401).json({ message: "Vous devez vous connecter." });
    }
}

// On exporte le middleware pour pouvoir l'utiliser dans notre router.
module.exports = isAuthenticated;
