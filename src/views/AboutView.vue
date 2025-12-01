<script setup lang="ts">
import { ref } from 'vue';
import heroVideo from '../0_Cooking_Chef_1920x1080.mp4';
import ParallaxStackSection from '../components/ParallaxStackSection.vue';
import bgImage from '../011-01.png';

const main = ref<HTMLElement | null>(null);
</script>

<template>
  <div ref="main" class="bg-background text-text overflow-hidden">
    <!-- Cinematic Video Hero -->
    <section class="relative h-[100dvh] min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <video 
          class="w-full h-full object-cover"
          :src="heroVideo"
          autoplay loop muted playsinline
        ></video>
        <div class="absolute inset-0 bg-black/60"></div>
      </div>
      <div 
        class="relative z-10 text-center px-4"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 1000, ease: 'easeOut', delay: 300 } }"
      >
        <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-text">A Tribute to Timeless Culinary Craft</h1>
        
      </div>
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div class="w-6 h-10 border-2 border-text-muted flex justify-center items-start p-1">
          <div class="w-1 h-2 bg-text-muted animate-bounce"></div>
        </div>
      </div>
    </section>

    <!-- Minimalist Statement Section -->
    <section
      class="minimalist-statement-section min-h-screen w-full flex items-center justify-center bg-[#faf9f6] py-24 sm:py-32 bg-cover bg-center bg-no-repeat bg-fixed"
      :style="{ backgroundColor: '#f0ebe1' }"
    >
      <div class="w-full px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 text-center">
        <div class="w-full space-y-8 md:space-y-12">
          <!-- Founded Date -->
          <p class="text-2xl md:text-3xl font-decorative text-[#d4af37] mb-4">
            Founded in 2017
          </p>
          
          <!-- Main Headline -->
          <div class="space-y-4 md:space-y-6">
            <h2 class="text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-sans font-black uppercase leading-[1.1] tracking-tight text-[#1a1a1a]">
              A ROYAL CULINARY
            </h2>
            <h2 class="text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-sans font-black uppercase leading-[1.1] tracking-tight text-[#1a1a1a]">
              HERITAGE RESTAURANT
            </h2>
          </div>

          <!-- Supporting Text -->
          <div class="space-y-3 md:space-y-4 pt-4">
            <p class="text-3xl md:text-4xl lg:text-5xl font-decorative text-[#d4af37]">
              We Create and Preserve
            </p>
            <p class="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-sans font-bold uppercase leading-[1.2] tracking-tight text-[#1a1a1a]">
              THE WORLD'S MOST AUTHENTIC
            </p>
            <p class="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-sans font-bold uppercase leading-[1.2] tracking-tight text-[#1a1a1a]">
              DUM PUKHT EXPERIENCES
            </p>
          </div>
        </div>
      </div>
    </section>
 <!-- Our Story Section -->
    <section class="relative py-20 md:py-28 bg-[#f0ebe1]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div
          class="flex-1 text-left text-text"
          v-motion
          :initial="{ opacity: 0, x: -40 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 800, ease: 'easeOut', delay: 150 } }"
        >
          <p class="text-2xl font-decorative text-gold mb-4">Our Story</p>
          <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#2b2116]">
            From Royal Kitchens to Your Table
          </h2>
          <p class="text-base md:text-lg text-text-muted mb-4 max-w-xl">
            Art of Dum reimagines centuries-old Indian slow-cooking traditions with modern elegance. Inspired by the wisdom of Khansamas and royal kitchens, we create dishes that honor the past while celebrating the present. Each meal is thoughtfully designed to immerse diners in flavor, aroma, and heritage.
          </p>
          
        </div>

        <div
          class="flex-1 w-full"
          v-motion
          :initial="{ opacity: 0, x: 40 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 800, ease: 'easeOut', delay: 250 } }"
        >
          <div class="relative overflow-hidden bg-black/40 border border-white/5 shadow-[0_40px_80px_rgba(0,0,0,0.6)] backdrop-blur-sm group">
            <img
              src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Warmly lit dining room with elegant table settings"
              class="w-full h-full object-cover transform group-hover:scale-105 group-hover:brightness-110 transition-transform duration-700 ease-out"
            />
            <div class="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/10 to-transparent pointer-events-none"></div>
            <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs md:text-sm text-white/80">
              <span class="uppercase tracking-[0.25em]">Art of Dum</span>
              <span class="inline-flex items-center gap-2">
                <span class="h-[1px] w-10 bg-white/40"></span>
                Curated Dining Experience
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Parallax Stack Slides (final section) -->
    <ParallaxStackSection />

   
<!-- 
    <section class="bg-background pt-12 pb-24 sm:pt-16 sm:pb-28">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-text-muted">
        <p class="max-w-3xl mx-auto">
          The Art of Dum legacy continues in every dining room we serve. Each course is choreographed to sustain the wonder long after the final bite, inviting you to linger, reflect, and return.
        </p>
      </div>
    </section> -->
  </div>
</template>

<style scoped>
</style>
