require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
//const authRoutes = require('./src/auth');
const projetsRoutes = require('./src/projets');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // L'adresse de mon frontend
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  }));
app.use(express.json());

// Routes
app.use('/api', routes); 
//app.use('/api/auth', authRoutes);  
app.use('/api/projects', projetsRoutes);

// Middleware de gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error("Erreur non gérée:", err);
  res.status(500).json({ message: 'Erreur interne du serveur', error: err.message });
});

// 🚀 Lancer le serveur
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
