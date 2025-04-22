// Projet.js - Routes liées aux projets
const express = require('express');
const router = express.Router();
const { checkAuth } = require('./authMiddleware');
const { getProjects, addProject, likeProject } = require('./airtableService');

// Route pour récupérer tous les projets
router.get('/projets', checkAuth, async (req, res) => {
    try {
        const projects = await getProjects(); // Récupérer les projets d'Airtable
        res.status(200).json({ projects });
    } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

// Route pour ajouter un nouveau projet
router.post('/projets', checkAuth, async (req, res) => {
    try {
        const { nom, description, technos, lien, promo, etudiants, categorie } = req.body;

        // Vérification des données nécessaires
        if (!nom || !description || !technos || !lien || !promo || !etudiants || !categorie) {
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }

        // Créer un nouveau projet via airtableService
        const newProjectData = {
            nom,
            description,
            technos,
            lien,
            promo,
            etudiants,
            categorie
        };

        const newProject = await addProject(newProjectData); // Ajouter le projet à Airtable
        res.status(201).json({ message: 'Projet créé avec succès', project: JSON.stringify(newProject) });
    } catch (error) {
        console.error('Erreur lors de la création du projet:', error);
        console.log(error)
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});


// Route pour ajouter un like 
router.post('/projets/:projectId/like', checkAuth, async (req, res) => { //je dois modifié la route pour bien tester nouvelle route : /:projectId/like 
    const { projectId } = req.params;
    const userId = req.user.id;

    try {
        const updatedProject = await likeProject(projectId, userId);

        res.json({ message: 'Projet liké avec succès!', project: updatedProject });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;
