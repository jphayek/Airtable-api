const express = require('express');
const { getProjects, addProject, likeProject, updateProject, getProjectById } = require('./airtableService');
const { generateToken, authenticateToken } = require('./auth');
const bcrypt = require('bcryptjs');
//const verifyToken = require('./authMiddleware');

const users = [
    { id: 1, username: 'admin', password: '$2b$10$AfznG.EhQpWoEIDeEuURe.mkKPWxMh66oDnmrihiPhT.ULKVVIDli', role: 'admin' },
    { id: 2, username: 'user', password: '$2b$10$eKRJsaOWGh5ENhJCxj8h4.QyUvWlQ7v3Kgkv8AqFJf.PaxRlw7JQa', role: 'user' }
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

    res.json({ token,
        userId: user.id,
        role: user.role
    });
});

// Route GET : Récupérer les projets (protégée par l'authentification)
router.get('/projects', async (req, res) => {
    const { search } = req.query; // Récupère le paramètre de recherche
    try {
        const projects = await getProjects(search || '');
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

// Route POST : Ajouter un projet (protégée par l'authentification)
router.post('/projects', authenticateToken, async (req, res) => {
    try {
        const { nom, description, technos, lien, promo, categorie } = req.body;

        // Vérification des données nécessaires
        if (!nom || !description || !technos || !lien || !promo || !categorie) {
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }

        // Créer un nouveau projet via airtableService
        const newProjectData = {
            nom,
            description,
            technos,
            lien,
            promo,
            categorie
        };
        console.log('Données du projet:', newProjectData);
        const newProject = await addProject(newProjectData); // Ajouter le projet à Airtable
        console.log('Réponse d\'Airtable:', newProject);
        res.status(201).json({ message: 'Projet créé avec succès', project: JSON.stringify(newProject) });
    } catch (error) {
        console.error('Erreur lors de la création du projet:', error);
        console.log(error)
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

// Route pour ajouter un like 
router.post('/projects/:projectId/like', async (req, res) => { //je dois modifié la route pour bien tester nouvelle route : /:projectId/like 
    const { projectId } = req.params;
    const userId = req.user.id;

    try {
        const updatedProject = await likeProject(projectId, userId);

        res.json({ message: 'Projet liké avec succès!', project: updatedProject });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/////////////////////////////////////////////////////////////////////
/////////////ADMIN MODIFICATION/////////////////////////////////////
///////////////////////////////////////////////////////////////////

// Route pour récupérer un projet par son ID
router.get('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log("ID du projet reçu:", id);
        const project = await getProjectById(id);
        if (!project) {
            return res.status(404).json({ message: 'Projet non trouvé' });
        }
        res.status(200).json({ project });
    } catch (error) {
        console.error('Erreur lors de la récupération du projet:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});


// Modifier un projet par ID
router.put('/projects/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const fields = req.body;

    try {
        const updatedProject = await updateProject(id, fields);
        res.status(200).json({ message: "Projet mis à jour avec succès", project: updatedProject });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du projet:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});
//console.log(router);
module.exports = router;
