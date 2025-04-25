<template>
  <div class="project-card">
    <h3>{{ project.name }}</h3>
    <p>{{ project.description }}</p>
    <p class="likes">Likes: {{ project.likes }}</p>


    <button class="like-button" @click="likeProject">
      ❤️ Like
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
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin: 10px;
  transition: transform 0.2s ease;
}
.project-card:hover {
  transform: translateY(-5px);
}

.project-card h3 {
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: #2c3e50;
}

.project-card p {
  font-size: 1rem;
  color: #555;
}

.likes {
  font-weight: bold;
  margin-top: 10px;
  color: #888;
}

.like-button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 10px 24px;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  font-size: 1rem;
  margin-top: 15px;
  transition: background-color 0.3s, transform 0.1s ease;
  box-shadow: 0 2px 8px rgba(255, 77, 79, 0.3);
}

.like-button:hover {
  background-color: #ff7875;
  transform: scale(1.05);
}
</style>
