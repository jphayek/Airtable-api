import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Admin from './views/Admin.vue';
import Login from './views/Login.vue';
import ProjectList from './views/ProjectList.vue';
import CreateProject from './views/CreateProject.vue';
import EditProject from './views/EditProject.vue';

// Routes de l'application
const routes = [
  { path: '/', component: Home },
  { path: '/admin', component: Admin,
    beforeEnter: (to, from, next) => {
      const isAdmin = localStorage.getItem('role') === 'admin';
      if (!isAdmin) {
        next('/login');
      } else {
        next();
      }
    }
   },
  { path: '/create-project', component: CreateProject },
  { path: '/edit-project/:id', component: EditProject },
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
