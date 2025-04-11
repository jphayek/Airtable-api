<template>
  <div class="project-list">
    <h2>Liste des projets</h2>
    
    <!-- Indicateur de chargement -->
    <div v-if="loading" class="loading">
      Chargement des projets...
    </div>
    
    <!-- Affichage des projets -->
    <div v-else-if="projects.length > 0">
      <div v-for="project in projects" :key="project.id" class="project-item">
        <h3>{{ project.fields.Nom }}</h3>
        <p>{{ project.fields.Description }}</p>
      </div>
    </div>
    
    <!-- Message lorsqu'aucun projet n'est trouvé -->
    <div v-else>
      <p>Aucun projet trouvé.</p>
    </div>
    
    <!-- Message d'erreur -->
    <div v-if="error" class="error-message">
      Une erreur est survenue lors de la récupération des projets.
    </div>
  </div>
</template>

<script>
import axios from '../services/axios';

export default {
  data() {
    return {
      projects: [],
      loading: true,  // Pour savoir si la requête est en cours
      error: false,   // Pour savoir si une erreur s'est produite
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://localhost:5000/api/projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.projects = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
      this.error = true;
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

body, input, textarea, button {
  font-family: 'Roboto', sans-serif;
}

.project-list {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 2rem;
  color: #333;
  text-align: center;
}

.project-item {
  margin-bottom: 20px;
  background-color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.project-item h3 {
  font-size: 1.5rem;
  color: #333;
}

.project-item p {
  font-size: 1rem;
  color: #666;
}

.loading {
  text-align: center;
  color: #2d87f0;
  font-size: 1.2rem;
}

.error-message {
  text-align: center;
  color: red;
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
