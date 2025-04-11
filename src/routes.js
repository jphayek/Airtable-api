const express = require('express');
const { getProjects, addProject } = require('./airtableService');
const { generateToken, authenticateToken } = require('./auth');
const bcrypt = require('bcryptjs');
//const verifyToken = require('./authMiddleware');

const users = [
    { id: 1, username: 'admin', password: '$2b$10$AfznG.EhQpWoEIDeEuURe.mkKPWxMh66oDnmrihiPhT.ULKVVIDli', role: 'admin' }
];

const router = express.Router();

// Route POST : Connexion de l'administrateur
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username);

    if (!user) return res.status(400).send('Utilisateur non trouvé.');

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return res.status(400).send('Mot de passe incorrect.');

    const token = generateToken(user.id);
    res.json({ token });
});

// Route GET : Récupérer les projets (protégée par l'authentification)
router.get('/projects', authenticateToken, async (req, res) => {
    try {
        const projects = await getProjects();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route POST : Ajouter un projet (protégée par l'authentification)
router.post('/projects', authenticateToken, async (req, res) => {
    try {
        const newProject = await addProject(req.body);
        res.json(newProject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//console.log(router);
module.exports = router;
