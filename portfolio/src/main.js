import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Admin from './views/Admin.vue';
import Login from './views/Login.vue';
import ProjectList from './views/ProjectList.vue';

// Routes de l'application
const routes = [
  { path: '/', component: Home },
  { path: '/admin', component: Admin },
  { path: '/login', component: Login },
  { path: '/projects', component: ProjectList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(router)
  .mount('#app');
