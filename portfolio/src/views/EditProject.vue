<template>
    <div class="edit-project-container">
      <h1>Modifier le Projet</h1>
  
      <form @submit.prevent="submitForm" class="edit-project-form">
        <div class="form-group">
          <label for="name">Nom du projet</label>
          <input type="text" v-model="project.nom" id="name" required placeholder="Nom du projet" />
        </div>
  
        <div class="form-group">
          <label for="description">Description</label>
          <textarea v-model="project.description" id="description" required placeholder="Décrivez votre projet"></textarea>
        </div>
  
        <!-- Liste déroulante pour la catégorie -->
        <div class="form-group">
          <label for="category">Catégorie</label>
          <select v-model="project.categorie" id="category" required>
            <option value="">Sélectionner une catégorie</option>
            <option value="Web">Web</option>
            <option value="Mobile">Mobile</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Big Data">Big Data</option>
          </select>
        </div>
  
        <!-- Liste déroulante pour les technologies -->
        <div class="form-group">
          <label for="technos">Technos utilisées</label>
          <select v-model="project.technos" id="technos">
            <option value="">Sélectionner les technologies</option>
            <option value="JavaScript">JavaScript</option>
            <option value="ReactJS">ReactJS</option>
          </select>
        </div>
  
        <!-- Liste déroulante pour la promotion -->
        <div class="form-group">
          <label for="promo">Promotion</label>
          <select v-model="project.promo" id="promo">
            <option value="">Sélectionner la promotion</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="link">Lien du projet</label>
          <input type="url" v-model="project.lien" id="link" placeholder="Lien vers le projet" />
        </div>
  
        <div class="form-group">
          <label for="students">Étudiants impliqués</label>
          <input type="text" v-model="project.etudiants" id="students" placeholder="Nom des étudiants" />
        </div>
  
        <button type="submit" class="submit-btn">Modifier le projet</button>
      </form>
  
      <p v-if="message" :class="messageClass">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        project: {
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
    async created() {
      const projectId = this.$route.params.id;  // Récupérer l'ID du projet à modifier
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/${projectId}`);
        this.project = response.data;  // Remplir les champs du formulaire avec les données existantes du projet
      } catch (error) {
        console.error('Erreur lors du chargement du projet:', error);
        this.message = 'Erreur lors du chargement du projet.';
        this.messageClass = 'error';
      }
    },
    methods: {
      async submitForm() {
        const projectId = this.$route.params.id; 
        try {
          const token = localStorage.getItem('token');
          const response = await axios.put(`http://localhost:5000/api/projects/${projectId}`, this.project, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          console.log(response.data);
  
          this.message = 'Le projet a été modifié avec succès !';
          this.messageClass = 'success';
  
          // Rediriger vers la page admin après modification
          this.$router.push({ path: '/admin' });
        } catch (error) {
          console.error('Erreur lors de la modification du projet:', error);
          this.message = `Erreur lors de la modification du projet: ${error.response ? error.response.status : 'Serveur non disponible'}`;
          this.messageClass = 'error';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
  
  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
  }
  
  .edit-project-container {
    max-width: 700px;
    margin: 0 auto;
    padding: 30px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    font-size: 2rem;
    color: #333;
    margin-bottom: 25px;
  }
  
  .edit-project-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    font-weight: 600;
    margin-bottom: 10px;
    color: #444;
    font-size: 1rem;
  }
  
  input,
  textarea,
  select {
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 6px;
    width: 100%;
    margin-bottom: 12px;
    background-color: #f9f9f9;
    transition: border-color 0.3s;
  }
  
  input:focus,
  textarea:focus,
  select:focus {
    border-color: #667eea;
    outline: none;
  }
  
  textarea {
    min-height: 120px;
    resize: vertical;
  }
  
  button.submit-btn {
    padding: 14px;
    background-color: #667eea;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  button.submit-btn:hover {
    background-color: #5c6bc0;
    transform: translateY(-2px);
  }
  
  button.submit-btn:active {
    transform: translateY(1px);
  }
  
  .success {
    color: green;
    text-align: center;
    font-size: 1.1rem;
  }
  
  .error {
    color: red;
    text-align: center;
    font-size: 1.1rem;
  }
  
  @media (max-width: 768px) {
    .edit-project-container {
      padding: 20px;
    }
  
    h1 {
      font-size: 1.8rem;
    }
  }
  </style>
  