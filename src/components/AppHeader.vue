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
      <div class="flex items-center justify-between h-20 md:h-24 py-3 md:py-4">
        <!-- Left side - Empty space -->
        <div class="flex items-center w-1/4">
          <button
            @click="emit('toggle-menu')"
            class="flex items-center gap-x-2 font-sans font-medium tracking-widest uppercase text-sm group md:hidden"
          >
            <DiamondIcon class="w-4 h-4 text-gold animate-spin-custom" />
            <span class="text-text group-hover:text-gold transition-colors duration-300">Menu</span>
          </button>
        </div>

        <!-- Center - Logo (always visible and bigger) -->
        <div class="flex items-center justify-center w-1/2">
          <button
            @click="navigateToHome"
            class="transition-transform duration-300 hover:scale-110 focus:outline-none"
          >
            <img
              src="/images/your-logo.png"
              alt="Art of Dum"
              class="h-16 w-16 md:h-24 md:w-24"
            />
          </button>
        </div>

        <!-- Right side - Menu -->
        <div class="flex items-center w-1/4 justify-end">
          <button
            @click="emit('toggle-menu')"
            class="hidden md:flex items-center gap-x-3 font-sans font-medium tracking-widest uppercase text-sm group"
          >
            <DiamondIcon class="w-4 h-4 text-gold animate-spin-custom" />
            <span class="text-text group-hover:text-gold transition-colors duration-300">Menu</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
