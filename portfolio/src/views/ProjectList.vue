<template>
  <div>
    <h2>Liste des projets</h2>
    <div v-if="projects.length > 0">
      <div v-for="project in projects" :key="project.id">
        <h3>{{ project.fields.Nom }}</h3>
        <p>{{ project.fields.Description }}</p>
      </div>
    </div>
    <div v-else>
      <p>Aucun projet trouvé.</p>
    </div>
  </div>
</template>

<script>
import axios from '../services/axios'; 

export default {
  data() {
    return {
      projects: [],
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://localhost:5000/api/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.projects = response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des projets:', error);
    }
  },
};
</script>
