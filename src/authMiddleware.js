require('dotenv').config();
const jwt = require('jsonwebtoken');


console.log("JWT_SECRET utilisé dans checkAuth :", process.env.JWT_SECRET);

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

// Middleware pour vérifier le rôle admin
const checkAdminRole = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Accès refusé. Rôle insuffisant.' });
    }
    next();
};

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // On récupère le token dans l'en-tête
    if (!token) return res.status(401).send('Accès refusé, token manquant.');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifier le token avec la clé secrète
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Token invalide.');
    }
};

const checkAuth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Accès interdit, token manquant.' });
    }

    const tokenParts = token.split(' ');
    if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
        return res.status(403).json({ message: 'Format de token incorrect.' });
    }

    const tokenToVerify = tokenParts[1];

    jwt.verify(tokenToVerify, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalide.' });
        }
        
        req.user = decoded;
        next();
    });
};

module.exports = {verifyToken, authenticateToken, checkAuth};
