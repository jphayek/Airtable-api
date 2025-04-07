<template>
    <div>
      <h2>Créer un nouveau projet</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">Nom du projet</label>
          <input type="text" id="name" v-model="newProject.name" required />
        </div>
        <div>
          <label for="description">Description</label>
          <textarea id="description" v-model="newProject.description" required></textarea>
        </div>
        <div>
          <label for="technos">Technologies</label>
          <input type="text" id="technos" v-model="newProject.technos" required />
        </div>
        <div>
          <label for="link">Lien vers le projet</label>
          <input type="url" id="link" v-model="newProject.link" />
        </div>
        <div>
          <label for="promo">Promotion</label>
          <input type="text" id="promo" v-model="newProject.promo" />
        </div>
        <div>
          <label for="students">Étudiants</label>
          <input type="text" id="students" v-model="newProject.students" />
        </div>
        <div>
          <label for="category">Catégorie</label>
          <input type="text" id="category" v-model="newProject.category" />
        </div>
        <button type="submit">Ajouter le projet</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProjectForm',
    data() {
      return {
        newProject: {
          name: '',
          description: '',
          technos: '',
          link: '',
          promo: '',
          students: '',
          category: '',
        },
      };
    },
    methods: {
      submitForm() {
        // Logique d'ajout du projet
        console.log('Projet ajouté', this.newProject);
        // Ici tu enverrais ce projet vers ton API pour l'ajouter
      },
    },
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 0 auto;
  }
  label {
    margin: 10px 0;
  }
  input, textarea {
    padding: 8px;
    margin-bottom: 10px;
  }
  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>
  