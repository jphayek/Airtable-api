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

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

body, input, textarea, button {
  font-family: 'Roboto', sans-serif;
}
</style>

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
