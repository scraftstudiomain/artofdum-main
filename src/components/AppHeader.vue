<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import DiamondIcon from './icons/DiamondIcon.vue';

const emit = defineEmits(['toggle-menu']);
const router = useRouter();
const scrolled = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

const navigateToHome = () => {
  router.push('/');
};

const scrollToOrderVia = () => {
  const orderViaSection = document.querySelector('[data-ordervia-section]');
  if (orderViaSection) {
    orderViaSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
      scrolled ? 'bg-background/70 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
    ]"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-24">
        <!-- Left side - Order button -->
        <div class="flex items-center">
          <button 
            @click="scrollToOrderVia"
            class="px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold tracking-widest uppercase text-sm rounded-none hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105"
          >
            ORDER ONLINE
          </button>
        </div>
        
        <!-- Center - Logo (always visible) -->
        <div class="flex items-center justify-center">
          <button
            @click="navigateToHome"
            class="transition-transform duration-300 hover:scale-110 focus:outline-none"
          >
            <img
              src="/images/your-logo.png"
              alt="Art of Dum"
              class="h-12 w-12 md:h-14 md:w-14"
            />
          </button>
        </div>
        
        <!-- Right side - Menu -->
        <div class="flex items-center">
          <button 
            @click="emit('toggle-menu')"
            class="flex items-center gap-x-3 font-sans font-medium tracking-widest uppercase text-sm group"
          >
            <DiamondIcon class="w-4 h-4 text-gold animate-spin-custom" />
            <span class="text-text group-hover:text-gold transition-colors duration-300">Menu</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
