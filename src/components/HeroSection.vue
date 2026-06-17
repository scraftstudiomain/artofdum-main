<template>
  <section
    class="relative h-screen w-full flex items-center justify-center overflow-visible hero-section"
    :style="{ backgroundColor: heroBackgroundColor }"
  >
    <div 
      class="absolute inset-0 z-0 hero-image-container"
    >
      <video
        ref="heroVideoRef"
        :src="heroVideo"
        poster="/images/hero-poster.jpg"
        autoplay
        loop
        muted
        playsinline
        preload="auto"
        class="w-full h-full object-cover hero-video"
        @canplay="onHeroVideoReady"
      ></video>
      
      <div class="absolute inset-0 bg-black/50"></div>
    </div>

    <!-- Hero Content -->
    <div 
      class="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl"
      v-motion
      :initial="{ opacity: 0, y: 40 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 1200, ease: 'easeOut', delay: 300 } }"
    >
      <!-- Tagline -->
      <p class="text-xs sm:text-sm uppercase tracking-[0.4em] text-brand-sesame mb-6 font-semibold select-none">
        TIMED TO PERFECTION
      </p>

      <!-- Main Headline -->
      <h1 class="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.15]">
        Where the Flames of Tradition<br />
        Meet the Forge of <span class="text-gold-gradient font-serif inline-block mt-2">Innovation</span>
      </h1>

      <!-- Slogan / Sub-headline -->
      <p class="font-sans text-sm sm:text-base md:text-lg text-brand-cashew/90 max-w-2xl mx-auto leading-relaxed mb-10 font-light tracking-wide">
        Simply ReThought. Where the flames of tradition meet the forge of innovation, every moment becomes a transformative journey.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button 
          @click="scrollToSection('#menu-highlights')"
          class="px-8 py-4 bg-gold-gradient text-brand-earthen font-sans font-semibold tracking-wider hover:brightness-110 transition-all duration-300 min-w-[200px] shadow-lg shadow-black/30"
        >
          Explore the Menu
        </button>
        <button 
          @click="scrollToSection('#reservation')"
          class="px-8 py-4 border border-white/30 text-white font-sans font-medium tracking-wider hover:bg-white hover:text-brand-earthen hover:border-white transition-all duration-300 min-w-[200px]"
        >
          Reserve a Table
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import heroVideo from '../aa18e29e-8d8a-4894-a6f5-6acc9cd243a4.mp4';

const heroVideoRef = ref<HTMLVideoElement>()
const heroBackgroundColor = ref('#2b2116')

const scrollToSection = (id: string) => {
  window.dispatchEvent(new CustomEvent('scroll-to-section', { detail: id }))
}

const onHeroVideoReady = () => {
  // Video is ready to play - could dispatch an event if needed
  console.log('Hero video is ready')
}

onMounted(() => {
  // Try to start video playback
  if (heroVideoRef.value) {
    heroVideoRef.value.play().catch(err => {
      console.log('Hero video autoplay prevented:', err)
    })
  }
})
</script>

<style scoped>
.hero-image-container {
  transition: transform 0.3s ease;
}

.hero-video {
  transition: transform 0.5s ease;
}

.hero-image-container:hover .hero-video {
  transform: scale(1.05);
}
</style>
