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

        const response = await axios.post(airtableUrl, newProjectData, {
            headers: {
                Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data; // Retourne la réponse d'Airtable
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};


// Fonction pour liker un projet 
const likeProject = async ( projectId) => {
    try {
        const token = localStorage.getItem('token');
        const studentId = localStorage.getItem('studentId'); // récupéré au login !
    
        if (!studentId) {
          throw new Error("ID étudiant non trouvé");
        }
    
        const response = await axios.post(
          `http://localhost:5000/api/projets/${projectId}/like`,
          { studentId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
    
        console.log(response.data.message);
      } catch (error) {
        console.error('Erreur lors du like du projet:', error);
      }
    };

module.exports = { getProjects, addProject, likeProject };
