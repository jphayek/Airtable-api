<template>
  <div class="project-card">
    <h3>{{ project.name }}</h3>
    <p>{{ project.description }}</p>
    <p class="likes">Likes: {{ project.likes }}</p>
    <!-- Bouton de like -->
    <button class="like-button" @click="likeProject">
      Like
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: Object,
  },
  methods: {
    likeProject() {
      this.$emit('like', this.project);
    }
  }
};
</script>

<style scoped>
.project-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin: 10px;
}

.project-card h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.project-card p {
  font-size: 1rem;
}

.like-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
  margin-top: 10px;
}

.like-button:hover {
  background-color: #45a049;
}
</style>
