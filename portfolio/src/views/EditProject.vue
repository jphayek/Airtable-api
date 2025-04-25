<template>
    <div class="edit-project">
      <h1 class="title">Modifier le Projet</h1>
  
      <form @submit.prevent="updateProject">
        <div class="form-group" v-for="field in editableFields" :key="field">
        <label :for="field">{{ field }}</label>
        <input
            v-model="project.fields[field]"
            :id="field"
            type="text"
            required
        />
        </div>
  
        <div class="buttons">
          <button class="save-btn" type="submit">Enregistrer</button>
          <button class="cancel-btn" type="button" @click="$router.push('/admin')">Annuler</button>
        </div>
      </form>
  
      <div v-if="error" class="error-message">Erreur lors de la modification du projet.</div>
    </div>
  </template>
  
  <script>
import axios from '../services/axios';

export default {
  data() {
    return {
      project: {
        fields: {},
      },
      editableFields: ["Nom", "Description", "Technos", "Lien", "Promo", "Etudiants", "Catégorie"],
      error: false,
      loading: true,
    };
  },
  async created() {
    const id = this.$route.params.id;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:5000/api/projets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      this.project = response.data.project;
    } catch (err) {
      console.error("Erreur lors du chargement du projet", err);
      this.error = true;
    } finally {
      this.loading = false;
    }
  },
    methods: {
      async updateProject() {
        try {
          const token = localStorage.getItem("token");
          await axios.put(`http://localhost:5000/api/projets/${this.project.id}`, { fields: this.project.fields }, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.$router.push('/admin');
        } catch (e) {
          console.error('Erreur lors de la mise à jour :', e);
          this.error = true;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .edit-project {
    max-width: 700px;
    margin: 40px auto;
    background: #fff;
    padding: 30px 40px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    font-family: 'Roboto', sans-serif;
  }
  
  .title {
    text-align: center;
    color: #2d87f0;
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 6px;
    color: #333;
  }
  
  input {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  
  .save-btn {
    background-color: #2d87f0;
    color: white;
    border: none;
    padding: 12px 20px;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .save-btn:hover {
    background-color: #1f68c2;
  }
  
  .cancel-btn {
    background-color: #aaa;
    color: white;
    border: none;
    padding: 12px 20px;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .cancel-btn:hover {
    background-color: #888;
  }
  
  .error-message {
    margin-top: 20px;
    color: red;
    text-align: center;
    font-weight: bold;
  }
  </style>
  