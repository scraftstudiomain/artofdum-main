<script setup lang="ts">
import { ref } from 'vue';
import heroVideo from '../0_Cooking_Chef_1920x1080.mp4';
import ParallaxStackSection from '../components/ParallaxStackSection.vue';
import bgImage from '../011-01.png';
import TypewriterText from '../components/TypewriterText.vue';

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
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 1000, ease: 'easeOut', delay: 300 } }"
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
      class="minimalist-statement-section min-h-[37vh] md:min-h-screen w-full flex items-center justify-center bg-[#faf9f6] py-12 sm:py-20 lg:py-28 bg-cover bg-center bg-no-repeat bg-fixed"
      :style="{ backgroundColor: '#f0ebe1' }"
    >
      <div
        class="w-full px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 text-center"
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut', delay: 150 } }"
      >
        <div class="w-full space-y-8 md:space-y-12">
          <!-- Founded Date -->
          <p class="text-2xl md:text-3xl font-decorative text-[#d4af37] mb-4">
            <TypewriterText text="Founded in 2017" :speed="70" />
          </p>
          
          <!-- Main Headline -->
          <div class="space-y-4 md:space-y-6">
            <h2 class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-sans font-black uppercase leading-[1.1] tracking-tight text-[#1a1a1a]">
              A ROYAL CULINARY
            </h2>
            <h2 class="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-sans font-black uppercase leading-[1.1] tracking-tight text-[#1a1a1a]">
              HERITAGE RESTAURANT
            </h2>
          </div>

          <!-- Supporting Text -->
          <div class="space-y-3 md:space-y-4 pt-4">
            <p class="text-3xl md:text-4xl lg:text-5xl font-decorative text-[#d4af37]">
              <TypewriterText text="We Create and Preserve" :speed="70" :startDelay="150" />
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
          class="flex-1 text-center lg:text-left text-text"
          v-motion
          :initial="{ opacity: 0, x: -40 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 800, ease: 'easeOut', delay: 150 } }"
        >
          <p class="text-2xl font-decorative text-gold mb-4">
            <TypewriterText text="Our Story" :speed="70" />
          </p>
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
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 800, ease: 'easeOut', delay: 250 } }"
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

    <section class="relative py-20 md:py-28 bg-[#f0ebe1]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
        <div
          class="flex-1 w-full"
          v-motion
          :initial="{ opacity: 0, x: -40 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 800, ease: 'easeOut', delay: 250 } }"
        >
          <div class="relative overflow-hidden bg-black/40 border border-white/5 shadow-[0_40px_80px_rgba(0,0,0,0.6)] backdrop-blur-sm group">
            <img
              src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Slow-cooked dum dish being served"
              class="w-full h-full object-cover transform group-hover:scale-105 group-hover:brightness-110 transition-transform duration-700 ease-out"
            />
            <div class="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/10 to-transparent pointer-events-none"></div>
            <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs md:text-sm text-white/80">
              <span class="uppercase tracking-[0.25em]">Art of Dum</span>
              <span class="inline-flex items-center gap-2">
                <span class="h-[1px] w-10 bg-white/40"></span>
                The Dum Technique
              </span>
            </div>
          </div>
        </div>

        <div
          class="flex-1 text-center lg:text-left text-text"
          v-motion
          :initial="{ opacity: 0, x: 40 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 800, ease: 'easeOut', delay: 150 } }"
        >
          <p class="text-2xl font-decorative text-gold mb-4">
            <TypewriterText text="The Dum Technique" :speed="70" />
          </p>
          <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#2b2116]">
            Slow Cooking, Sealed in Time
          </h2>
          <p class="text-base md:text-lg text-text-muted mb-6 max-w-xl">
            Dum - slow cooking in a sealed environment - has been practiced for over a thousand years across Persian, Central Asian, and Indian cultures. By sealing ingredients in heavy-bottomed vessels, flavors meld gently, aromas intensify, and every dish becomes a sensory revelation.
          </p>
        </div>
      </div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16">
        <div class="text-center mb-10 md:mb-12">
          <p class="font-semibold text-xs md:text-sm tracking-[0.25em] uppercase text-[#2b2116]/80">
            Our Brand Pillars
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <div
            class="flex items-start gap-4"
            v-motion
            :initial="{ opacity: 0, y: 24 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 100 } }"
          >
            <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/10 border border-[#d4af37]/60 text-[#d4af37]">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4 8.04 4 9.54 4.81 10.35 6.09 11.16 4.81 12.66 4 14.2 4 16.7 4 18.7 6 18.7 8.5c0 3.78-3.4 6.86-8.25 11.54z" />
              </svg>
            </div>
            <div class="text-left">
              <p class="font-semibold text-[#2b2116]">Intimate</p>
              <p class="text-sm md:text-base text-text-muted">Creating deeply personal, memorable dining moments.</p>
            </div>
          </div>

          <div
            class="flex items-start gap-4"
            v-motion
            :initial="{ opacity: 0, y: 24 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 150 } }"
          >
            <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/10 border border-[#d4af37]/60 text-[#d4af37]">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M4 10L12 4l8 6" />
                <path d="M6 10h12v8H6z" />
                <path d="M4 18h16" />
              </svg>
            </div>
            <div class="text-left">
              <p class="font-semibold text-[#2b2116]">Heritage</p>
              <p class="text-sm md:text-base text-text-muted">Honouring age-old culinary rituals through refined interpretation.</p>
            </div>
          </div>

          <div
            class="flex items-start gap-4"
            v-motion
            :initial="{ opacity: 0, y: 24 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, ease: 'easeOut', delay: 200 } }"
          >
            <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/10 border border-[#d4af37]/60 text-[#d4af37]">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 19l3-7 4 4 4-10 3 13z" />
                <path d="M2 21h20" />
              </svg>
            </div>
            <div class="text-left">
              <p class="font-semibold text-[#2b2116]">Opulent</p>
              <p class="text-sm md:text-base text-text-muted">Offering soulful luxury in every bite, texture, and presentation.</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/10 border border-[#d4af37]/60 text-[#d4af37]">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="3" />
                <circle cx="12" cy="12" r="7" />
                <path d="M12 5V3" />
                <path d="M5 12H3" />
                <path d="M12 21v-2" />
                <path d="M21 12h-2" />
              </svg>
            </div>
            <div class="text-left">
              <p class="font-semibold text-[#2b2116]">Immersive</p>
              <p class="text-sm md:text-base text-text-muted">Engaging all senses to create a slow, mindful dining journey.</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/10 border border-[#d4af37]/60 text-[#d4af37]">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div class="text-left">
              <p class="font-semibold text-[#2b2116]">Captivating</p>
              <p class="text-sm md:text-base text-text-muted">Bringing culinary theatre to life in every unveiling, aroma, and detail.</p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/10 border border-[#d4af37]/60 text-[#d4af37]">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M7 20c4 0 10-4 10-12-2 2-4.5 3-7 3H8c0-2 1-4 3-6-4 0-8 4-8 9 0 3 2 6 4 6z" />
              </svg>
            </div>
            <div class="text-left">
              <p class="font-semibold text-[#2b2116]">Grounded</p>
              <p class="text-sm md:text-base text-text-muted">Staying anchored to ingredients, tradition, and time-honoured methods.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-20 md:py-28 bg-[#f0ebe1]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div
          class="flex-1 text-center lg:text-left text-text"
          v-motion
          :initial="{ opacity: 0, x: -40 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 800, ease: 'easeOut', delay: 150 } }"
        >
          <p class="text-2xl font-decorative text-gold mb-4">
            <TypewriterText text="Food Philosophy" :speed="70" />
          </p>
          <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-[#2b2116]">
            Ingredients That Honour Every Origin
          </h2>
          <p class="text-base md:text-lg text-text-muted max-w-xl mx-auto lg:mx-0">
            Every ingredient is sourced from the finest regions – saffron from Spain, rice from Himalayan valleys, hand-ground spices, and ethically reared meats. Through Dum, these treasures gently release their essence, creating dishes that are rich, fragrant, and deeply satisfying.
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
              src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Plated gourmet dish showcasing Art of Dum's food philosophy"
              class="w-full h-full object-cover transform group-hover:scale-105 group-hover:brightness-110 transition-transform duration-700 ease-out"
            />
            <div class="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/10 to-transparent pointer-events-none"></div>
            <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs md:text-sm text-white/80">
              <span class="uppercase tracking-[0.25em]">Art of Dum</span>
              <span class="inline-flex items-center gap-2">
                <span class="h-[1px] w-10 bg-white/40"></span>
                Food Philosophy
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Parallax Stack Slides (final section) -->
    <!-- <ParallaxStackSection /> -->

   
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
