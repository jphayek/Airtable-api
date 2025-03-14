const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Vérifier si un token est présent dans l'en-tête de la requête
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Accès interdit, token manquant.' });
    }

    // Extraire le préfixe "Bearer" et le token
    const tokenParts = token.split(' ');
    if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
        return res.status(403).json({ message: 'Format de token incorrect.' });
    }

    const tokenToVerify = tokenParts[1];

    // Vérifier le token avec la clé secrète
    jwt.verify(tokenToVerify, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalide.' });
        }
       
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
