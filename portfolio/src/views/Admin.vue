<template>
    <div class="admin">
      <h1>Interface Administrateur</h1>
      <button @click="addProject">Ajouter un Projet</button>
      <button @click="manageProjects">Gérer les Projets</button>
      <div>
        <!-- Liste des projets -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Admin',
    methods: {
      addProject() {
        // Logique pour ajouter un projet
      },
      manageProjects() {
        // Logique pour gérer les projets
      }
    }
  };
  </script>
  
  <style scoped>
  .admin {
    padding: 20px;
  }
  </style>
  