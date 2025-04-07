<template>
    <div class="project-card">
      <h3>{{ project.name }}</h3>
      <p>{{ project.description }}</p>
      <p><strong>Likes:</strong> {{ project.likes }}</p>
      <button @click="likeProject">Like</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProjectCard',
    props: {
      project: {
        type: Object,
        required: true,  // Assurer que 'project' est toujours défini
      }
    },
    methods: {
      likeProject() {
        this.$emit('like', this.project);  // Émettre l'événement 'like' au parent
      }
    }
  };
  </script>
  
  <style scoped>
  .project-card {
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
    width: 300px;
  }
  .project-card h3 {
    margin: 0 0 8px;
  }
  .project-card p {
    margin: 0 0 8px;
  }
  .project-card button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
  }
  .project-card button:hover {
    background-color: #45a049;
  }
  </style>
  