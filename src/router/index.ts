import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('../views/MenuCulinaryView.vue'),
  },
  {
    path: '/menu-modern',
    name: 'MenuModern',
    component: () => import('../views/MenuViewModern.vue'),
  },
  { path: '/catering', name: 'Catering', component: () => import('../views/CateringView.vue') },
  { path: '/about', name: 'About', component: () => import('../views/AboutView.vue') },
  { path: '/experiences', name: 'Experiences', component: () => import('../views/ExperiencesView.vue') },
  { path: '/sustainability', name: 'Sustainability', component: () => import('../views/SustainabilityView.vue') },
  { path: '/blog', name: 'Blog', component: () => import('../views/BlogView.vue') },
  { path: '/contact', name: 'Contact', component: () => import('../views/ContactView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
