<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import DiamondIcon from './icons/DiamondIcon.vue';

const props = defineProps<{ country: 'IN' | 'UAE' }>();
const emit = defineEmits(['toggle-menu', 'update:country']);
const router = useRouter();
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
        scrolled ? 'h-16 bg-[#4e3b2d] backdrop-blur-lg border-b border-white/10' : 'h-24 bg-transparent'
      ]"
    ></div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div 
        :class="[
          'flex items-center justify-between transition-all duration-300 ease-in-out',
          scrolled ? 'h-16 py-2' : 'h-20 md:h-24 py-3 md:py-4'
        ]"
      >
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
            class="transition-transform duration-300 hover:scale-110 focus:outline-none relative"
          >
            <img
              src="/images/your-logo.png"
              alt="Art of Dum"
              :class="[
                'transition-all duration-500 ease-in-out',
                scrolled ? 'h-20 w-20 translate-y-4 md:h-32 md:w-32 md:translate-y-8' : 'h-16 w-16 md:h-24 md:w-24'
              ]"
            />
          </button>
        </div>

        <!-- Right side - Country selector + Menu -->
        <div class="flex items-center w-1/4 justify-end gap-x-3">
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
            <span class="text-text group-hover:text-gold transition-colors duration-300">Menu</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
