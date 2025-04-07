<template>
    <div class="dashboard">
      <h2>Tableau de Bord Administrateur</h2>
  
      <!-- Affichage du formulaire pour ajouter un projet -->
      <ProjectForm />
  
      <div>
        <h3>Statistiques des projets</h3>
        <p>Total des projets : {{ totalProjects }}</p>
        <p>Total des likes : {{ totalLikes }}</p>
        <div>
          <h4>Répartition par catégorie</h4>
          <ul>
            <li v-for="(count, category) in categoryDistribution" :key="category">
              {{ category }} : {{ count }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ProjectForm from '../components/ProjectForm.vue';
  
  export default {
    name: 'AdminDashboard',
    components: {
      ProjectForm
    },
    data() {
      return {
        totalProjects: 0,
        totalLikes: 0,
        categoryDistribution: {},
      };
    },
    mounted() {
      this.fetchDashboardData();
    },
    methods: {
      fetchDashboardData() {
        // Remplir avec les données de ton API
        this.totalProjects = 5;  // Exemple
        this.totalLikes = 120;   // Exemple
        this.categoryDistribution = {
          Web: 2,
          Mobile: 3,
          IA: 1,
        };
      },
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    text-align: center;
    margin-top: 30px;
  }
  h3 {
    color: #333;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    margin: 5px 0;
  }
  </style>
  