import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuView from '../views/MenuView.vue'
import CateringView from '../views/CateringView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import BlogView from '../views/BlogView.vue'
import ExperiencesView from '../views/ExperiencesView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/menu',
    name: 'Menu',
    component: MenuView,
  },
  { path: '/catering', name: 'Catering', component: CateringView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/experiences', name: 'Experiences', component: ExperiencesView },
  { path: '/blog', name: 'Blog', component: BlogView },
  { path: '/contact', name: 'Contact', component: ContactView },
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
