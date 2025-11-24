<script setup lang="ts">
import DecorativeDivider from './icons/DecorativeDivider.vue';
</script>

<template>
  <section class="py-12 md:py-20 sm:py-32 bg-background overflow-hidden">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      
      <div 
        class="text-center mb-10 md:mb-16"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 1000, ease: 'easeOut' } }"
      >
        <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl text-gold">The Soul of Dum Pukht</h2>
        <p class="mt-2 text-base md:text-lg text-text-muted">An ancient ritual of patience and flavor.</p>
        <DecorativeDivider />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-center">
        
        <!-- Left Text -->
        <div 
          class="lg:col-span-2 text-center lg:text-right"
          v-motion
          :initial="{ opacity: 0, x: -50 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 1000, ease: 'easeOut', delay: 400 } }"
        >
          <h3 class="font-serif text-2xl text-text mb-4">A Timeless Tradition</h3>
          <p class="text-text-muted leading-relaxed">
            Our craft is an homage to a timeless tradition. Dum Pukht is not merely a cooking method; it is a philosophy—the art of slow persuasion, where ingredients mature in their own essence.
          </p>
        </div>

        <!-- Main Video -->
        <div 
          class="relative group lg:col-span-1"
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :visible-once="{ opacity: 1, scale: 1, transition: { duration: 1200, ease: 'easeOut' } }"
        >
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-4/5 h-4/5 bg-gold/50 blur-3xl animate-pulse-glow"></div>
          </div>
          <div class="relative w-full aspect-square overflow-hidden">
            <video 
              src="https://videos.pexels.com/video-files/8068560/8068560-hd_1920_1080_25fps.mp4" 
              alt="A traditional Dum Pukht handi being opened, releasing steam" 
              class="relative w-full h-full object-cover"
              autoplay loop muted playsinline
            ></video>
          </div>
        </div>

        <!-- Right Text -->
        <div 
          class="lg:col-span-2"
          v-motion
          :initial="{ opacity: 0, x: 50 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 1000, ease: 'easeOut', delay: 400 } }"
        >
          <h3 class="font-serif text-2xl text-text mb-4">Culinary Alchemy</h3>
          <p class="text-text-muted leading-relaxed">
            Within each sealed handi, a culinary alchemy unfolds. Spices bloom, aromas intertwine, and textures soften to a state of sublime tenderness, creating an experience reserved for royalty.
          </p>
        </div>

      </div>
    </div>
  </section>
</template>
