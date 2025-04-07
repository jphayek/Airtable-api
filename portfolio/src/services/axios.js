import axios from 'axios';

// Créer une instance d'Axios
const api = axios.create({
  baseURL: 'http://localhost:5000',  // L'URL de votre serveur backend (Express.js)
  timeout: 5000,  // Timeout pour éviter les requêtes bloquées
});

export default api;