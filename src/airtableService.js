require('dotenv').config();
const axios = require('axios');

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME;
const airtableUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

const getProjects = async () => {
    try {
        const response = await axios.get(airtableUrl, {
            headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }
        });
        return response.data.records;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

const addProject = async (projectData) => {
    try {
        const response = await axios.post(airtableUrl, { fields: projectData }, {
            headers: {
                Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

module.exports = { getProjects, addProject };
