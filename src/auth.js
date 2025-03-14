const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Clé secrète pour signer les JWT
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; 

// Fonction pour vérifier si le mot de passe correspond
const verifyPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

// Fonction pour générer un token JWT
const generateToken = (userId) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });  // Le token expire dans 1h
};

// Middleware pour vérifier le token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');  // Récupérer le token dans l'header

    if (!token) return res.status(403).send('Accès interdit. Aucun token fourni.');

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).send('Token invalide.');
        req.user = user;
        next();
    });
};

module.exports = { verifyPassword, generateToken, authenticateToken };
