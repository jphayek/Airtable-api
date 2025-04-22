<template>
  <div class="admin-dashboard">
    <h1 class="dashboard-title">Tableau de Bord Administrateur</h1>

    <!-- Bouton d'ajout de projet -->
    <div class="actions">
      <button class="add-project-btn" @click="goToCreateProject">Ajouter un projet</button>
    </div>

    <!-- Indicateur de chargement -->
    <div v-if="loading" class="loading">
      Chargement des projets...
    </div>

    <!-- Affichage des projets -->
    <div v-else-if="projects.length > 0">
      <div class="project-list">
        <h2 style="display: flex;
        font-family: 'Roboto', sans-serif;
        justify-content: center;
        font-size: 25px;">Liste des projets</h2>
        <table class="projects-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Technos</th>
              <th>Lien</th>
              <th>Promo</th>
              <th>Étudiants</th>
              <th>Catégorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.id">
              <td>{{ project.fields.Nom }}</td>
              <td>{{ project.fields.Description }}</td>
              <td>{{ project.fields.Technos }}</td>
              <td><a :href="project.fields.Lien" target="_blank">{{ project.fields.Lien }}</a></td>
              <td>{{ project.fields.Promo }}</td>
              <td>{{ project.fields.Etudiants }}</td>
              <td>{{ project.fields.Categorie }}</td>
              <td>
                <button class="edit-btn" @click="editProject(project)">Modifier</button>
                <button class="delete-btn" @click="deleteProject(project)">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
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
    // Fonction pour rediriger vers la page de création de projet
    goToCreateProject() {
      this.$router.push({ path: "/create-project" });
    },

    // Fonction pour gérer la modification d'un projet
    editProject(project) {
      console.log("Édition du projet:", project);
      // Rediriger vers la page de modification du projet si nécessaire
    },

    // Fonction pour supprimer un projet
    deleteProject(project) {
      console.log("Suppression du projet:", project);
      // Implémenter la logique de suppression
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

body, input, textarea, button {
  font-family: 'Roboto', sans-serif;
}

.admin-dashboard {
  background-color: #f4f7fc;
  padding: 20px;
}

.dashboard-title {
  text-align: center;
  color: #333;
  font-size: 2rem;
}

.actions {
  text-align: center;
  margin-bottom: 20px;
}

.add-project-btn {
  background-color: #2d87f0;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-project-btn:hover {
  background-color: #1f68c2;
}

.loading {
  text-align: center;
  color: #2d87f0;
  font-size: 1.2rem;
}

.project-list {
  margin-top: 30px;
}

.projects-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.projects-table th, .projects-table td {
  padding: 12px;
  text-align: left;
}

.projects-table th {
  background-color: #2d87f0;
  color: white;
  font-size: 1.1rem;
}

.projects-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.projects-table tr:hover {
  background-color: #f1f1f1;
}

.edit-btn, .delete-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-btn:hover {
  background-color: #45a049;
}

.delete-btn {
  background-color: #f44336;
}

.delete-btn:hover {
  background-color: #e53935;
}

.error-message {
  text-align: center;
  color: red;
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
