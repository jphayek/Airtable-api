<template>
    <div class="login-container">
      <h2>Connexion</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
          />
        </div>
        <div>
          <label for="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
          />
        </div>
        <button type="submit">Se connecter</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from '../services/axios';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  
  export default {
    setup() {
      const router = useRouter();
      const username = ref('');
      const password = ref('');
      const errorMessage = ref('');
  
      const login = async () => {
        try {
          const response = await axios.post('/api/login', {
            username: username.value,
            password: password.value
          });
  
          // Sauvegarder le token
          localStorage.setItem('token', response.data.token);
  
          // Sauvegarder le rôle (si renvoyé)
          if (response.data.user?.role) {
            localStorage.setItem('role', response.data.user.role);
          }
  
          // Redirection vers le tableau de bord admin
          if (response.data.user?.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/');
          }
  
        } catch (error) {
          console.error('Erreur lors de la tentative de connexion:', error);
          errorMessage.value = 'Échec de la connexion. Vérifie tes identifiants.';
        }
      };
  
      return {
        username,
        password,
        errorMessage,
        login
      };
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  form div {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin: 5px 0 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #667eea;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #5c6bc0;
  }
  
  .error {
    color: red;
    text-align: center;
  }
  </style>
  