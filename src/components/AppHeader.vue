<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import LogoImage from '../Art of Dum_Refined logos_Open_CTC Eng Gold H1.png';

const props = defineProps<{ country: 'IN' | 'UAE' }>();
const emit = defineEmits(['update:country']);
const router = useRouter();
const route = useRoute();
const scrolled = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

const navigateToHome = () => {
  window.dispatchEvent(new CustomEvent('scroll-to-section', { detail: '#hero' }));
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out">
    <!-- Background Layer -->
    <div 
      :class="[
        'absolute top-0 left-0 right-0 transition-all duration-500 ease-in-out',
        scrolled ? 'h-16' : 'h-24',
        (scrolled || route.name === 'Contact') ? 'bg-brand-earthen backdrop-blur-lg border-b border-white/5' : 'bg-transparent'
      ]"
    ></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div 
        :class="[
          'flex items-center justify-center transition-all duration-300 ease-in-out',
          scrolled ? 'h-16 py-2' : 'h-20 md:h-24 py-3 md:py-4'
        ]"
      >
        <!-- Centered Logo -->
        <div class="flex items-center justify-center">
          <button
            @click="navigateToHome"
            class="transition-transform duration-300 hover:scale-110 focus:outline-none relative"
          >
            <img
              :src="LogoImage"
              alt="Art of Dum"
              :class="[
                'transition-all duration-500 ease-in-out object-contain',
                scrolled ? 'h-10 w-auto md:h-12' : 'h-14 w-auto md:h-16'
              ]"
            />
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
