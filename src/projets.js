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
router.post('/projets/:projectId/like', checkAuth, async (req, res) => {
    console.log('Route atteint', req.params); // Affiche les paramètres de la route
    try {
        const { studentId } = req.body; // ID de l'étudiant qui like le projet
        const { projectId } = req.params; // ID du projet qui est liké

        if (!studentId || !projectId) {
            return res.status(400).json({ message: 'L\'ID de l\'étudiant et du projet sont requis.' });
        }

        // Appel de la fonction likeProject
        const updatedStudent = await likeProject(studentId, projectId);

        res.status(200).json({ message: 'Projet liké avec succès', student: updatedStudent });
    } catch (error) {
        console.error('Erreur lors du like du projet:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});


module.exports = router;
