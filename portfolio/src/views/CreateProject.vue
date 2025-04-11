<template>
    <div class="create-project">
      <h1>Créer un nouveau projet</h1>
  
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">Nom du projet</label>
          <input type="text" v-model="newProject.nom" id="name" required />
        </div>
  
        <div>
          <label for="description">Description</label>
          <textarea v-model="newProject.description" id="description" required></textarea>
        </div>
  
        <div>
          <label for="category">Catégorie</label>
          <input type="text" v-model="newProject.categorie" id="category" required />
        </div>
  
        <div>
          <label for="technos">Technos</label>
          <input type="text" v-model="newProject.technos" id="technos" />
        </div>
  
        <div>
          <label for="link">Lien du projet</label>
          <input type="url" v-model="newProject.lien" id="link" />
        </div>
  
        <div>
          <label for="promo">Promotion</label>
          <input type="text" v-model="newProject.promo" id="promo" />
        </div>
  
        <div>
          <label for="students">Étudiants</label>
          <input type="text" v-model="newProject.etudiants" id="students" />
        </div>
  
        <button type="submit">Créer le projet</button>
      </form>
  
      <!-- Message de confirmation ou erreur -->
      <p v-if="message" :class="messageClass">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        newProject: {
        nom: '',
        description: '',
        technos: '',
        lien: '',
        promo: '',
        etudiants: '',
        categorie: '',
      },
        message: '',
        messageClass: '',
      };
    },
    methods: {
      async submitForm() {
        try {
          // Envoi des données vers l'API backend
          const response = await axios.post('http://localhost:5000/api/projects', this.newProject);
        
          this.message = 'Le projet a été créé avec succès !';
          this.messageClass = 'success';
  
          // Réinitialiser le formulaire
          this.newProject = { nom: '', description: '', technos: '', lien: '', promo: '', etudiants: '', categorie: '' };
  
          // Rediriger vers la page admin après création
          this.$router.push({ path: '/admin' });
        } catch (error) {
          this.message = 'Erreur lors de la création du projet.';
          this.messageClass = 'error';
          console.error(error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .create-project {
    padding: 20px;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  input, textarea {
    margin-bottom: 10px;
    padding: 10px;
    font-size: 1rem;
  }
  
  button {
    padding: 10px;
    font-size: 1rem;
    background-color: #2d87f0;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #1f68c2;
  }
  
  .success {
    color: green;
  }
  
  .error {
    color: red;
  }
  </style>
  