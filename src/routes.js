const express = require('express');
const { getProjects, addProject } = require('./airtableService');

const router = express.Router();

// 🔹 Route GET : Récupérer les projets
router.get('/projects', async (req, res) => {
    try {
        const projects = await getProjects();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Route POST : Ajouter un projet
router.post('/projects', async (req, res) => {
    try {
        const newProject = await addProject(req.body);
        res.json(newProject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
