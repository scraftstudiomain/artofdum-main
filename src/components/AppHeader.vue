<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import DiamondIcon from './icons/DiamondIcon.vue';

const emit = defineEmits(['toggle-menu']);
const scrolled = ref(false);
const showLogo = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
  // Show logo after scrolling past hero section (approximately 100vh)
  showLogo.value = window.scrollY > window.innerHeight;
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
        
        <!-- Center - Logo (only visible after scrolling past hero) -->
        <div class="flex items-center justify-center">
          <img 
            v-if="showLogo"
            src="/images/your-logo.png" 
            alt="Art of Dum" 
            class="h-12 w-12 md:h-14 md:w-14 transition-opacity duration-300"
            :class="showLogo ? 'opacity-100' : 'opacity-0'"
          />
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
