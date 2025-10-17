<script setup lang="ts">
import { X } from 'lucide-vue-next';
import DecorativeDivider from './icons/DecorativeDivider.vue';

defineProps<{ isOpen: boolean }>();
const emit = defineEmits(['close']);

interface MenuItem {
  name: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Catering', path: '/catering' },
  { name: 'Experiences', path: '/experiences' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const closeMenu = () => {
  emit('close');
};
</script>

<template>
  <Transition name="menu-fade">
    <div v-if="isOpen" class="fixed inset-0 bg-background z-[60] flex flex-col items-center justify-center">
      <button 
        @click="closeMenu" 
        class="absolute top-6 right-4 sm:top-8 sm:right-8 text-text-muted hover:text-text transition-colors"
      >
        <X :size="40" />
      </button>
      <nav>
        <ul class="text-center space-y-4">
          <li 
            v-for="(item, index) in menuItems" 
            :key="item.name"
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 300 + index * 100, duration: 800, ease: 'easeOut' } }"
          >
            <router-link
              :to="item.path"
              class="menu-link text-5xl md:text-7xl text-text-muted hover:text-text transition-colors duration-300 block py-2 link-underline uppercase tracking-[0.18em]" 
              @click="closeMenu" 
            >
              <span>{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <div 
        class="absolute bottom-16"
      >
        <DecorativeDivider v-if="isOpen" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.4s ease;
}
.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}

.menu-link {
  font-family: 'Academy Engraved', serif;
  letter-spacing: 0.18em;
}

.menu-link span {
  font-family: inherit;
}
</style>
