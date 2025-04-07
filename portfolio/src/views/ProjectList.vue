<template>
  <div class="container project-list">
    <h2>Projets Étudiants</h2>
    <div v-if="projects.length > 0" class="project-list-wrapper">
      <ProjectCard
        v-for="(project, index) in projects"
        :key="index"
        :project="project"
        @like="handleLike"
      />
    </div>
    <div v-else>
      <p>Aucun projet trouvé.</p>
    </div>
  </div>
</template>

<script>
import ProjectCard from '../components/ProjectCard.vue';

export default {
  name: 'ProjectList',
  components: {
    ProjectCard
  },
  data() {
    return {
      projects: [
        { name: 'Projet 1', description: 'Description du projet 1', likes: 0 },
        { name: 'Projet 2', description: 'Description du projet 2', likes: 0 },
      ]
    };
  },
  methods: {
    handleLike(project) {
      project.likes += 1;
    }
  }
};
</script>

<style scoped src="../styles/ProjectList.css"></style>