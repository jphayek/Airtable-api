<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

input, textarea, button {
  font-family: 'Roboto', sans-serif;
}

body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding-top: 80px; 
}
</style>
