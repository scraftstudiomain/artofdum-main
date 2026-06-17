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

    <!-- Hero Title -->
    <div class="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
      <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight max-w-5xl">
       Where the Flames of Tradition Meet the Forge of <span class="text-gold font-decorative">Innovation</span>
      </h1>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import heroVideo from '../aa18e29e-8d8a-4894-a6f5-6acc9cd243a4.mp4';

const heroVideoRef = ref<HTMLVideoElement>()
const heroBackgroundColor = ref('#0a0a0a')

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
