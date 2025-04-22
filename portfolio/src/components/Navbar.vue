<template>
  <nav class="navbar">
    <div class="navbar-container">
      <router-link class="logo" to="/">Portfolio</router-link>
      <ul class="nav-links">
        <li><router-link to="/" class="nav-item">Accueil</router-link></li>
        <li><router-link to="/projects" class="nav-item">Projets</router-link></li>

        <!-- Affiche la navbar Admin uniquement si l'utilisateur est admin -->
        <li v-if="isAdmin"><router-link to="/admin" class="nav-item">Admin</router-link></li>

        <!-- Affiche le bouton de déconnexion seulement si l'utilisateur est connecté -->
        <li v-if="isLoggedIn">
          <button @click="logout" class="nav-item logout-button">Déconnexion</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
  isLoggedIn() {
    return !!localStorage.getItem('token');
  },
  isAdmin() {
    return localStorage.getItem('role') === 'admin';
  }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('studentId');
      this.$router.push('/login');
    }
  }
};
</script>


<style scoped>

li{
  display: flex;
  align-items: center;
}
.navbar {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #2d87f0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
}

.logo {
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 1px;
}

.nav-links {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  color: white;
  text-decoration: none;
  margin-left: 20px;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: #f9f9f9;
}

.navbar-container a {
  display: block;
}

/* Style du bouton de déconnexion */
.logout-button {
  background-color: #e74c3c; /* Rouge pour la déconnexion */
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.logout-button:hover {
  background-color: #c0392b;
}
</style>
