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
        <p><strong>Description:</strong> {{ project.fields.Description }}</p>
        <p><strong>Catégorie:</strong> {{ project.fields.Categorie }}</p>
        <p><strong>Technos:</strong> {{ project.fields.Technos }}</p>
        <p><strong>Lien:</strong> <a :href="project.fields.Lien" target="_blank">{{ project.fields.Lien }}</a></p>
        <p><strong>Promotion:</strong> {{ project.fields.Promo }}</p>
        <p><strong>Étudiants impliqués:</strong> {{ project.fields.Etudiants }}</p>
        <button @click="likeProject(project.id)">Aimer ce projet</button>
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
  methods: {
    async likeProject(projectId) {
    try {
      const token = localStorage.getItem('token');
      const studentId = localStorage.getItem("studentId");

      const response = await axios.post(
        `http://localhost:5000/api/projets/${projectId}/like`,
        { studentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response.data.message);
    } catch (error) {
      console.error('Erreur lors du like du projet:', error);
    }
  },
  },

};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

body, input, textarea, button {
  font-family: 'Roboto', sans-serif;
}

.project-list {
  padding: 30px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 2rem;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;
}

.project-item {
  margin-bottom: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
}

.project-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
}

.project-item h3 {
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 10px;
}

.project-item p {
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
  margin: 5px 0;
}

.project-item p strong {
  font-weight: 600;
  color: #444;
}

.project-item a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.project-item a:hover {
  color: #5c6bc0;
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

@media (max-width: 768px) {
  .project-list {
    padding: 20px;
  }

  h2 {
    font-size: 1.8rem;
  }

  .project-item {
    padding: 15px;
  }

  .project-item h3 {
    font-size: 1.4rem;
  }

  .project-item p {
    font-size: 0.95rem;
  }
}
</style>
