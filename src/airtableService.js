// airtableService.js
require('dotenv').config();
const axios = require('axios');

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;
const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

// Fonction pour récupérer les projets d'Airtable
const getProjects = async () => {
    try {
        const response = await axios.get(airtableUrl, {
            headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }
        });
        return response.data.records; // Retourne les projets
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

// Fonction pour ajouter un projet dans Airtable
const addProject = async (projectData) => {
    try {
        
        const newProjectData = {
            records: [
                {
                    fields: {
                        Nom: projectData.nom,
                        Description: projectData.description,
                        Technos: projectData.technos,
                        Lien: projectData.lien,
                        Promo: projectData.promo,
                        Catégorie: projectData.categorie
                    }
                }
            ]
        };

        //console.log("Essai d'ajouter le projet avec les données suivantes:", newProjectData);

        const response = await axios.post(airtableUrl, newProjectData, {
            headers: {
                Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data; // Retourne la réponse d'Airtable
    } catch (error) {
        //console.error('Erreur dans addProject:', error);
        throw new Error(error.response?.data || error.message);
    }
};


// Fonction pour liker un projet 
// Fonction pour liker un projet dans Airtable
const likeProject = async (projectId, userId) => {
    try {
        const project = await getProjectById(projectId);

        if (!project) {
            throw new Error('Projet non trouvé');
        }

        // Vérifie si l'utilisateur a déjà liké
        if (project.fields.LikedBy && project.fields.LikedBy.includes(userId)) {
            throw new Error('Tu as déjà liké ce projet.');
        }

        // Ajoute l'utilisateur aux likes
        const updatedLikes = project.fields.LikedBy ? [...project.fields.LikedBy, userId] : [userId];

        // Met à jour le projet dans Airtable
        const updatedProject = await axios.patch(
            `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${projectId}`,
            {
                fields: {
                    LikedBy: updatedLikes
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return updatedProject.data;
    } catch (error) {
        throw new Error(error.message || 'Erreur lors du like du projet');
    }
};


// Fonction pour récupérer un projet par son ID
const getProjectById = async (projectId) => {
    try {
        const response = await axios.get(
            `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${projectId}`,
            {
                headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }
            }
        );
        return response.data; 
    } catch (error) {
        throw new Error('Erreur lors de la récupération du projet');
    }
};

// Fonction pour modifier un projet
const updateProject = async (projectId, updatedFields) => {

    const project = await getProjectById(projectId);
    if (!project) {
        throw new Error('Projet non trouvé');
    }

    try {
    
        const fieldsToUpdate = {};

        const fields = updatedFields.fields;

        if (fields.Nom !== undefined) fieldsToUpdate.Nom = fields.Nom;
        if (fields.Description) fieldsToUpdate.Description = fields.Description;
        if (fields.Technos) fieldsToUpdate.Technos = fields.Technos;
        if (fields.Lien) fieldsToUpdate.Lien = fields.Lien;
        if (fields.Promo) fieldsToUpdate.Promo = fields.Promo;
        if (fields.Catégorie) fieldsToUpdate.Catégorie = fields.Catégorie;

        console.log('fieldsToUpdate:', fieldsToUpdate);

        const response = await axios.patch(
            `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${projectId}`,
            {
                fields: fieldsToUpdate
            },
            {
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        //console.log('Réponse de l\'API Airtable:', response.data);
        return response.data;
    } catch (error) {
        //console.error('Erreur lors de la mise à jour du projet:', error);
        throw new Error(error.message || 'Erreur lors de la mise à jour du projet');
    }
};


module.exports = { getProjects, addProject, likeProject, getProjectById, updateProject };
