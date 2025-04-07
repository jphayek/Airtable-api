const express = require('express');
const router = express.Router();
const Airtable = require('airtable');
const { checkAuth } = require('./authMiddleware');
const { getProjects, addProject } = require('./airtableService');

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);


router.get('/', (req, res) => {
    res.send('Liste des projets');
});

// Route pour créer un projet
router.post('/projets', checkAuth, async (req, res) => {
    const { nom, description, technos, lien, visuels, promo, etudiants, categorie } = req.body;

    try {
        const newRecord = await base('Projets').create([
            {
                fields: {
                    Nom: nom,
                    Description: description,
                    Technos: technos,
                    Lien: lien,
                    Visuels: visuels,
                    Promo: promo,
                    Etudiants: etudiants,
                    Categorie: categorie,
                    Likes: 0,
                    Visibilite: true,  // Par défaut, le projet est visible
                },
            },
        ]);

        res.status(201).json({ message: 'Projet créé avec succès', data: newRecord });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la création du projet' });
    }
});

// Route pour modifier un projet
router.put('/projets/:id', checkAuth, async (req, res) => {
    const { id } = req.params;  // ID du projet à modifier
    const { nom, description, technos, lien, visuels, promo, etudiants, categorie } = req.body;

    try {
        const updatedRecord = await base('Projets').update(id, {
            fields: {
                Nom: nom,
                Description: description,
                Technos: technos,
                Lien: lien,
                Visuels: visuels,
                Promo: promo,
                Etudiants: etudiants,
                Categorie: categorie,
            },
        });

        res.status(200).json({ message: 'Projet modifié avec succès', data: updatedRecord });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la modification du projet' });
    }
});

// Route pour cacher un projet (changer la visibilité)
router.patch('/projets/:id/visibility', checkAuth, async (req, res) => {
    const { id } = req.params;  // ID du projet
    const { visibility } = req.body;  // Nouvelle visibilité (true ou false)

    try {
        const updatedRecord = await base('Projets').update(id, {
            fields: {
                Visibilite: visibility,
            },
        });

        res.status(200).json({ message: `Projet ${visibility ? 'visible' : 'caché'} avec succès`, data: updatedRecord });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la visibilité du projet' });
    }
});

console.log(router);

module.exports = router;
