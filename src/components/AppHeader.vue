<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import DiamondIcon from './icons/DiamondIcon.vue';
import LogoImage from '../Art of Dum_Refined logos_Open_CTC Eng Gold H1.png';

const props = defineProps<{ country: 'IN' | 'UAE' }>();
const emit = defineEmits(['toggle-menu', 'update:country']);
const router = useRouter();
const route = useRoute();
const scrolled = ref(false);

const setCountry = (value: 'IN' | 'UAE') => {
  if (props.country !== value) {
    emit('update:country', value);
  }
};

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
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out">
    <!-- Background Layer -->
    <div 
      :class="[
        'absolute top-0 left-0 right-0 transition-all duration-500 ease-in-out',
        scrolled ? 'h-16' : 'h-24',
        (scrolled || route.name === 'Contact') ? 'bg-[#4e3b2d] backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      ]"
    ></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div 
        :class="[
          'flex items-center justify-between transition-all duration-300 ease-in-out',
          scrolled ? 'h-16 py-2' : 'h-20 md:h-24 py-3 md:py-4'
        ]"
      >
        <!-- Left side - Logo -->
        <div class="flex items-center">
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

        <!-- Right side - Menu -->
        <div class="flex items-center justify-end gap-x-3">
          <button
            @click="emit('toggle-menu')"
            class="flex md:hidden items-center gap-x-2 font-sans font-medium tracking-widest uppercase text-sm group"
          >
            <DiamondIcon class="w-4 h-4 text-gold animate-spin-custom" />
            <span class="text-text group-hover:text-gold transition-colors duration-300">Explore</span>
          </button>
          <!-- <div class="flex items-center border border-white/20 rounded-full px-2 py-1 text-[10px] sm:text-xs uppercase tracking-widest bg-background/40 backdrop-blur-sm">
            <button
              type="button"
              @click="setCountry('IN')"
              :class="[
                'px-2 py-0.5 rounded-full transition-colors duration-300',
                props.country === 'IN' ? 'bg-gold text-background' : 'text-text/70'
              ]"
            >
              India
            </button>
            <button
              type="button"
              @click="setCountry('UAE')"
              :class="[
                'px-2 py-0.5 rounded-full transition-colors duration-300',
                props.country === 'UAE' ? 'bg-gold text-background' : 'text-text/70'
              ]"
            >
              UAE
            </button>
          </div> -->
          <button
            @click="emit('toggle-menu')"
            class="hidden md:flex items-center gap-x-3 font-sans font-medium tracking-widest uppercase text-sm group"
          >
            <DiamondIcon class="w-4 h-4 text-gold animate-spin-custom" />
            <span class="text-text group-hover:text-gold transition-colors duration-300">Explore</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
