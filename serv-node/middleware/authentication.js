const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, "TOP_SECRET");
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId,
        };
        return next();
    } catch (error) {
        res.status(401).json({ message: "Vous devez vous connecter." });
    }
}

module.exports = isAuthenticated;
