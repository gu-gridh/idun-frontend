import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
    },
    {
      path: '/projects/:id', 
      name: 'project', 
      component: () => import('../views/Project.vue'),
    },
    {
      path: '/tools',
      name: 'tools',
      component: () => import('../views/ToolsView.vue'),
    },
    {
      path: '/active',
      name: 'active',
      component: () => import('../views/ActiveProjects.vue'),
    },
    {
      path: '/digicure',
      name: 'digicure',
      component: () => import('../views/Digicure.vue'),
    },
  ],
})

export default router
