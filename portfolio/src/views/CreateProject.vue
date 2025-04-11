<template>
  <div class="create-project-container">
    <h1>Créer un Nouveau Projet</h1>

    <form @submit.prevent="submitForm" class="create-project-form">
      <div class="form-group">
        <label for="name">Nom du projet</label>
        <input type="text" v-model="newProject.nom" id="name" required placeholder="Nom du projet" />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="newProject.description" id="description" required placeholder="Décrivez votre projet"></textarea>
      </div>

      <div class="form-group">
        <label for="category">Catégorie</label>
        <input type="text" v-model="newProject.categorie" id="category" required placeholder="Catégorie du projet" />
      </div>

      <div class="form-group">
        <label for="technos">Technos utilisées</label>
        <input type="text" v-model="newProject.technos" id="technos" placeholder="Technologies utilisées" />
      </div>

      <div class="form-group">
        <label for="link">Lien du projet</label>
        <input type="url" v-model="newProject.lien" id="link" placeholder="Lien vers le projet" />
      </div>

      <div class="form-group">
        <label for="promo">Promotion</label>
        <input type="text" v-model="newProject.promo" id="promo" placeholder="Ex: Promotion 2025" />
      </div>

      <div class="form-group">
        <label for="students">Étudiants impliqués</label>
        <input type="text" v-model="newProject.etudiants" id="students" placeholder="Nom des étudiants" />
      </div>

      <button type="submit" class="submit-btn">Créer le projet</button>
    </form>

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
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:5000/api/projects', this.newProject, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response.data)

        this.message = 'Le projet a été créé avec succès !';
        this.messageClass = 'success';

        // Réinitialiser le formulaire
        this.newProject = {
          nom: '',
          description: '',
          technos: '',
          lien: '',
          promo: '',
          etudiants: '',
          categorie: '',
        };

        // Rediriger vers la page admin après création
        this.$router.push({ path: '/admin' });
      } catch (error) {
        console.error('Erreur lors de la création du projet:', error);
        console.log(error.response.data.error)
        this.message = 'Erreur lors de la création du projet.';
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
.create-project-container {
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

.create-project-form {
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
textarea {
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
textarea:focus {
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
  .create-project-container {
    padding: 20px;
  }

  h1 {
    font-size: 1.8rem;
  }
}
</style>
