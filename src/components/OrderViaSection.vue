<script setup lang="ts">
import DecorativeDivider from './icons/DecorativeDivider.vue';
import { ArrowUpRight } from 'lucide-vue-next';
import noonLogo from '../noon-com-logo-png_seeklogo-467330.png';
import talabatLogo from '../talabat-logo-png_seeklogo-424959.png';
import careemLogo from '../careem-logo-png_seeklogo-317082.png';

const partners = [
  { name: 'Noon', link: '#', logo: noonLogo },
  { name: 'Talabat', link: '#', logo: talabatLogo },
  { name: 'Careem', link: '#', logo: careemLogo },
  { name: 'Zomato', link: '#', logo: talabatLogo }, // Placeholder - update when logo is available
];
</script>

<template>
  <section class="py-20 sm:py-24">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div 
        class="text-center mb-12"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 1000, ease: 'easeOut' } }"
      >
        <h2 class="font-serif text-4xl md:text-5xl text-gold">Order Via</h2>
        <DecorativeDivider />
      </div>

      <div 
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
      >
        <a
          v-for="(partner, index) in partners"
          :key="partner.name"
          :href="partner.link"
          target="_blank"
          rel="noopener noreferrer"
          class="partner-card group relative block aspect-square overflow-visible"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut', delay: 200 + index * 100 } }"
        >
          <div class="flip-card-inner">
            <!-- Front side - Text -->
            <div class="flip-card-front relative flex flex-col items-center justify-center h-full p-6 text-center bg-transparent border border-white/10 transition-all duration-300 ease-in-out group-hover:border-gold/50">
              <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute top-0 left-0 w-1/2 h-1/2 bg-gold/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div class="relative z-10">
                <span class="font-serif text-2xl text-text-muted group-hover:text-gold transition-colors duration-300">{{ partner.name }}</span>
                <div class="absolute top-3 right-3 text-text-muted/50 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight class="w-4 h-4" />
                </div>
              </div>
            </div>
            
            <!-- Back side - Logo -->
            <div class="flip-card-back relative flex flex-col items-center justify-center h-full p-8 text-center bg-transparent border border-gold/50">
              <div class="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent"></div>
              <div class="relative z-10 w-full h-full flex items-center justify-center">
                <img 
                  :src="partner.logo" 
                  :alt="`${partner.name} logo`"
                  class="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes shadow-pulse {
  0% {
    box-shadow: 0 0 0 0px rgba(255, 215, 0, 0.2);
  }
  100% {
    box-shadow: 0 0 0 35px rgba(255, 215, 0, 0);
  }
}

@keyframes shadow-pulse-big {
  0% {
    box-shadow: 0 0 0 0px rgba(255, 215, 0, 0.1);
  }
  100% {
    box-shadow: 0 0 0 70px rgba(255, 215, 0, 0);
  }
}

.partner-card {
  perspective: 1000px;
}

.partner-card:hover {
  animation: shadow-pulse 1s infinite;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.partner-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.flip-card-back {
  transform: rotateY(180deg);
}
</style>
