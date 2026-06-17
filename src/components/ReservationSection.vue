<script setup lang="ts">
import { onMounted, ref } from 'vue';
import gsap from 'gsap';

const sectionRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

const scrollToMenu = () => {
  window.dispatchEvent(new CustomEvent('scroll-to-section', { detail: '#menu-highlights' }))
};

onMounted(() => {
  if (sectionRef.value && contentRef.value) {
    gsap.fromTo(
      contentRef.value.children,
      { 
        y: 30, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 80%',
        }
      }
    );
  }
});
</script>

<template>
  <section ref="sectionRef" class="relative w-full py-24 md:py-32 overflow-hidden bg-background">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <img 
        src="/background.png" 
        alt="Dining Ambiance" 
        class="w-full h-full object-cover"
      />
      <!-- Simple dark overlay for text readability -->
      <div class="absolute inset-0 bg-black/50"></div>
    </div>

    <div ref="contentRef" class="relative z-10 container mx-auto px-4 text-center">
      <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-cashew mb-6 leading-[1.2]">
        Reserve your table today
      </h2>
      <p class="font-sans text-base sm:text-lg md:text-xl text-brand-sesame/90 mb-10 max-w-2xl mx-auto font-light tracking-wide">
        Experience the transformative art of slow-cooked Indian cuisine.
      </p>
      
      <div class="flex flex-col sm:flex-row justify-center items-center gap-6">
        <a 
          href="#" 
          class="group relative px-8 py-4 bg-gold-gradient text-brand-earthen font-sans font-semibold tracking-wider transition-all duration-300 hover:brightness-110 min-w-[180px] shadow-lg shadow-brand-gold/10 text-center"
        >
          <span class="relative z-10">Reserve Now</span>
        </a>
        
        <button 
          @click="scrollToMenu"
          class="group px-8 py-4 border border-brand-sesame/30 text-brand-cashew font-sans font-medium tracking-wider hover:bg-brand-cashew hover:text-brand-earthen hover:border-transparent transition-all duration-300 min-w-[180px] text-center"
        >
          Explore Menu
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Optional: Add a subtle texture or pattern if needed */
</style>
