<script setup lang="ts">
import { RouterLink } from 'vue-router';
import heroVideo from '../aa18e29e-8d8a-4894-a6f5-6acc9cd243a4.mp4';
</script>

<template>
  <section
    class="relative h-screen w-full flex items-center justify-center overflow-visible hero-section"
  >
    <div 
      class="absolute inset-0 z-0 hero-image-container"
    >
      <video
        :src="heroVideo"
        autoplay
        loop
        muted
        playsinline
        class="w-full h-full object-cover hero-video"
      ></video>
      
      <div class="absolute inset-0 bg-black/50"></div>
    </div>

    <!-- Hero Title -->
    <div class="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
      <h1 class="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight max-w-5xl">
       Where the Flames of Tradition Meet the Forge of <span class="text-gold font-decorative">Innovation</span>
      </h1>
    </div>

    <!-- Buttons at Bottom -->
    <div class="absolute bottom-12 md:bottom-20 left-0 right-0 z-10 flex flex-col sm:flex-row items-center sm:items-end justify-center sm:justify-between gap-3 sm:gap-4 px-4 sm:px-8 lg:px-12 hero-buttons">
      <a href="https://artofdum.dotpe.in/" class="hero-btn-reserve px-8 py-3 bg-gold text-black font-semibold uppercase tracking-wider hover:bg-gold/90 transition-all duration-300 shadow-lg">
        Order Online
      </a>
      <RouterLink to="/menu-modern" class="hero-btn-menu px-8 py-3 border-2 border-white text-white font-semibold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300">
        Explore Menu
      </RouterLink>
    </div>
  </section>
</template>

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

/* Button Animations */
.hero-buttons {
  animation: fadeInUp 1s ease-out 0.5s both;
}

.hero-btn-reserve,
.hero-btn-menu {
  position: relative;
  overflow: hidden;
  transform: translateY(0);
  transition: all 0.3s ease;
}

.hero-btn-reserve::before,
.hero-btn-menu::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.hero-btn-reserve:hover::before,
.hero-btn-menu:hover::before {
  width: 300px;
  height: 300px;
}

.hero-btn-reserve:hover,
.hero-btn-menu:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.hero-btn-reserve:active,
.hero-btn-menu:active {
  transform: translateY(-1px) scale(1.02);
}

.hero-btn-reserve {
  animation: slideInLeft 0.8s ease-out 0.7s both;
}

.hero-btn-menu {
  animation: slideInRight 0.8s ease-out 0.9s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-btn-reserve,
  .hero-btn-menu {
    font-size: 0.875rem;
    padding: 0.75rem 1.5rem;
  }
}
</style>
