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
  
  <style>
  .home {
    text-align: center;
    padding: 20px;
  }
  </style>
  