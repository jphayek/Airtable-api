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
        <p><strong>Catégorie:</strong> {{ project.fields.Catégorie }}</p>
        <p><strong>Technos:</strong> {{ project.fields.Technos }}</p>
        <p><strong>Lien:</strong> <a :href="project.fields.Lien" target="_blank">{{ project.fields.Lien }}</a></p>
        <p><strong>Promotion:</strong> {{ project.fields.Promo }}</p>
        <p><strong>Étudiants impliqués:</strong> {{ project.fields.Etudiants }}</p>
        <button class="like-button" @click="likeProject(project.id)">
          ❤️ Like
        </button>
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
import { ref, computed } from 'vue';

export default {
  setup() {
    const projects = ref([]); 
    const studentId = localStorage.getItem('studentId');
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    const isUserLoggedIn = computed(() => !!token && role === 'user');

    const likeProject = async (projectId) => {
    try {
      //console.log("Token envoyé :", token);
      const response = await axios.post(`/api/projects/${projectId}/like`, null, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Met à jour la vue en fonction de la réponse
      console.log(response.data.message);
      // Vous pouvez aussi mettre à jour la liste des projets ou l'état ici si nécessaire
    } catch (error) {
      console.error('Erreur lors du like du projet:', error);
    }
  };

    // Charge les projets
    const loadProjects = async () => {
      try {
        const response = await axios.get('/api/projects', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        projects.value = response.data;
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
      }
    };

    // Charger les projets lors du montage du composant
    loadProjects();

    return {
      projects,
      isUserLoggedIn,
      likeProject,
      studentId
    };
  }
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

.like-button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s, transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(255, 77, 79, 0.3);
}

.like-button:hover {
  background-color: #ff7875;
  transform: scale(1.05);
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
