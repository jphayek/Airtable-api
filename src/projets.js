// Projet.js - Routes liées aux projets
const express = require('express');
const router = express.Router();
const { checkAuth } = require('./authMiddleware');
const { getProjects, addProject } = require('./airtableService');

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
        const { nom, description, technos, lien, visuels, promo, etudiants, categorie } = req.body;

        // Vérification des données nécessaires
        if (!nom || !description || !technos || !lien || !visuels || !promo || !etudiants || !categorie) {
            return res.status(400).json({ message: "Tous les champs sont requis." });
        }

        // Créer un nouveau projet via airtableService
        const newProjectData = {
            nom,
            description,
            technos,
            lien,
            visuels,
            promo,
            etudiants,
            categorie
        };

        const newProject = await addProject(newProjectData); // Ajouter le projet à Airtable
        res.status(201).json({ message: 'Projet créé avec succès', project: newProject });
    } catch (error) {
        console.error('Erreur lors de la création du projet:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
});

module.exports = router;
