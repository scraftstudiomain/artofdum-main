import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MenuCulinaryView from '../views/MenuCulinaryView.vue'
import MenuViewModern from '../views/MenuViewModern.vue'
import CateringView from '../views/CateringView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import BlogView from '../views/BlogView.vue'
import ExperiencesView from '../views/ExperiencesView.vue'
import SustainabilityView from '../views/SustainabilityView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/menu',
    name: 'Menu',
    component: MenuCulinaryView,
  },
  {
    path: '/menu-modern',
    name: 'MenuModern',
    component: MenuViewModern,
  },
  { path: '/catering', name: 'Catering', component: CateringView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/experiences', name: 'Experiences', component: ExperiencesView },
  { path: '/sustainability', name: 'Sustainability', component: SustainabilityView },
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
