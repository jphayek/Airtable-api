<template>
  <div class="admin-dashboard">
    <h1 class="dashboard-title">Tableau de Bord Administrateur</h1>
    <div class="actions">
      <button class="add-project-btn" @click="goToCreateProject">Ajouter un projet</button>
    </div>
    <div class="project-list">
      <h2>Liste des projets</h2>
      <table class="projects-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(project, index) in projects" :key="index">
            <td>{{ project.name }}</td>
            <td>{{ project.description }}</td>
            <td>{{ project.category }}</td>
            <td>
              <button class="edit-btn" @click="editProject(project)">Modifier</button>
              <button class="delete-btn" @click="deleteProject(project)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      projects: [
        { name: "Projet 1", description: "Description 1", category: "Web" },
        { name: "Projet 2", description: "Description 2", category: "Mobile" },
      ],
    };
  },
  methods: {
    goToCreateProject() {
      this.$router.push({ path: "/create-project" });
    },
    editProject(project) {
      console.log("Édition du projet:", project);
      // Redirige vers une page de modification de projet si besoin
    },
    deleteProject(project) {
      console.log("Suppression du projet:", project);
      // Logique pour supprimer un projet
    },
  },
};
</script>

<style scoped>
.admin-dashboard {
  background-color: #f4f7fc;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

.dashboard-title {
  text-align: center;
  color: #333;
  font-size: 2rem;
}

.actions {
  text-align: center;
  margin-bottom: 20px;
}

.add-project-btn {
  background-color: #2d87f0;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-project-btn:hover {
  background-color: #1f68c2;
}

.project-list {
  margin-top: 30px;
}

.projects-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.projects-table th, .projects-table td {
  padding: 12px;
  text-align: left;
}

.projects-table th {
  background-color: #2d87f0;
  color: white;
  font-size: 1.1rem;
}

.projects-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.projects-table tr:hover {
  background-color: #f1f1f1;
}

.edit-btn, .delete-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-btn:hover {
  background-color: #45a049;
}

.delete-btn {
  background-color: #f44336;
}

.delete-btn:hover {
  background-color: #e53935;
}
</style>
