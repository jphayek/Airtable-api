<template>
  <div class="home">
    <h1>Portfolio des Projets Étudiants</h1>
    <ProjectList />
  </div>
</template>

<script>
import ProjectList from './ProjectList.vue';

export default {
  name: 'Home',
  components: {
    ProjectList
  },
};
</script>

<style scoped src="../styles/Home.css"></style>