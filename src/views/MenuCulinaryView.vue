<script setup lang="ts">
import heroVideo from '../0_Cooking_Chef_1920x1080.mp4';
import signatureDumBiryaniVideo from '../Signature Dum Biryani.mp4';
import meltInTheMouthKebabsVideo from '../Melt-in-the-Mouth Kebabs.mp4';
import lusciousGraviesVideo from '../Luscious Gravies.mp4';
import indulgentSweetDishesVideo from '../Indulgent Sweet Dishes.mp4';
import curatedBeveragesCocktailsVideo from '../Curated Beverages & Cocktails.mp4';
</script>

<template>
  <div class="bg-background text-text overflow-hidden">
    <!-- Cinematic Video Hero -->
    <section class="relative h-[100dvh] min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <video
          class="w-full h-full object-cover"
          :src="heroVideo"
          autoplay
          loop
          muted
          playsinline
        ></video>
        <div class="absolute inset-0 bg-black/60"></div>
      </div>

      <div
        class="relative z-10 text-center px-4"
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 900, ease: 'easeOut', delay: 200 } }"
      >
        <p class="text-xs md:text-sm tracking-[0.35em] uppercase text-[#f0ebe1]/80 mb-4">
          The Art of Dum Menu
        </p>
        <h1 class="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-[#fdfaf3] mb-6">
          Our Culinary Offerings
        </h1>
      </div>
    </section>

    <!-- Section 1: Signature Dum Biryani -->
    <section class="relative py-20 md:py-24 bg-[#f0ebe1]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16">
          <div
            class="flex-1 w-full mb-8 lg:mb-0"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut', delay: 100 } }"
          >
            <div class="relative overflow-hidden bg-black/40 border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <video
                class="w-full h-full object-cover"
                :src="signatureDumBiryaniVideo"
                autoplay
                loop
                muted
                playsinline
              ></video>
              <div class="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent"></div>
            </div>
          </div>

          <div
            class="flex-1 text-center lg:text-left"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut', delay: 140 } }"
          >
            <p class="text-xs md:text-sm tracking-[0.25em] uppercase text-[#4e3b2d] mb-3">
              Signature Dum Biryani
            </p>
            <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#2b2116] mb-4">
              Sealed Handis, Timeless Aroma
            </h2>
            <p class="text-base md:text-lg text-text-muted max-w-3xl mx-auto lg:mx-0">
              Fragrant, slow-cooked Biryani prepared in sealed handis, blending saffron, hand-ground spices, and the finest meats. Every pot is an orchestration of flavor, aroma, and tradition.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Melt-in-the-Mouth Kebabs -->
    <section class="relative py-20 md:py-24 bg-[#fdf8ee]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div
            class="flex-1 w-full mb-8 lg:mb-0"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut', delay: 140 } }"
          >
            <div class="relative overflow-hidden bg-black/40 border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <video
                class="w-full h-full object-cover"
                :src="meltInTheMouthKebabsVideo"
                autoplay
                loop
                muted
                playsinline
              ></video>
              <div class="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent"></div>
            </div>
          </div>

          <div
            class="flex-1 text-center lg:text-left"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut', delay: 180 } }"
          >
            <p class="text-xs md:text-sm tracking-[0.25em] uppercase text-[#4e3b2d] mb-3">
              Melt-in-the-Mouth Kebabs
            </p>
            <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#2b2116] mb-4">
              Smoke, Spice, and Patience
            </h2>
            <p class="text-base md:text-lg text-text-muted max-w-3xl mx-auto lg:mx-0">
              From smoky tandoor specials to delicately spiced skewers, our Kebabs exemplify precision and patience in every bite.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Luscious Gravies -->
    <section class="relative py-20 md:py-24 bg-[#f0ebe1]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16">
          <div
            class="flex-1 w-full mb-8 lg:mb-0"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut', delay: 160 } }"
          >
            <div class="relative overflow-hidden bg-black/40 border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <video
                class="w-full h-full object-cover"
                :src="lusciousGraviesVideo"
                autoplay
                loop
                muted
                playsinline
              ></video>
              <div class="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent"></div>
            </div>
          </div>

          <div
            class="flex-1 text-center lg:text-left"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut', delay: 200 } }"
          >
            <p class="text-xs md:text-sm tracking-[0.25em] uppercase text-[#4e3b2d] mb-3">
              Luscious Gravies
            </p>
            <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#2b2116] mb-4">
              Silken, Slow-Simmered Richness
            </h2>
            <p class="text-base md:text-lg text-text-muted max-w-3xl mx-auto lg:mx-0">
              Rich, delicately spiced, and velvety, our gravies are slow-simmered to perfection, honoring both tradition and contemporary palates.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 4: Indulgent Sweet Dishes -->
    <section class="relative py-20 md:py-24 bg-[#fdf8ee]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div
            class="flex-1 w-full mb-8 lg:mb-0"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut', delay: 180 } }"
          >
            <div class="relative overflow-hidden bg-black/40 border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <video
                class="w-full h-full object-cover"
                :src="indulgentSweetDishesVideo"
                autoplay
                loop
                muted
                playsinline
              ></video>
              <div class="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent"></div>
            </div>
          </div>

          <div
            class="flex-1 text-center lg:text-left"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut', delay: 220 } }"
          >
            <p class="text-xs md:text-sm tracking-[0.25em] uppercase text-[#4e3b2d] mb-3">
              Indulgent Sweet Dishes
            </p>
            <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#2b2116] mb-4">
              Heritage Desserts, Reimagined
            </h2>
            <p class="text-base md:text-lg text-text-muted max-w-3xl mx-auto lg:mx-0">
              Traditional Indian desserts reimagined with elegance, crafted for both the eyes and the palate.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 5: Curated Beverages & Cocktails -->
    <section class="relative py-20 md:py-24 bg-[#f0ebe1]">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16">
          <div
            class="flex-1 w-full mb-8 lg:mb-0"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut', delay: 200 } }"
          >
            <div class="relative overflow-hidden bg-black/40 border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
              <video
                class="w-full h-full object-cover"
                :src="curatedBeveragesCocktailsVideo"
                autoplay
                loop
                muted
                playsinline
              ></video>
              <div class="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent"></div>
            </div>
          </div>

          <div
            class="flex-1 text-center lg:text-left"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut', delay: 240 } }"
          >
            <p class="text-xs md:text-sm tracking-[0.25em] uppercase text-[#4e3b2d] mb-3">
              Curated Beverages &amp; Cocktails
            </p>
            <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#2b2116] mb-4">
              Spiced Sips, Modern Craft
            </h2>
            <p class="text-base md:text-lg text-text-muted max-w-3xl mx-auto lg:mx-0">
              Our bar menu celebrates Indian flavors: cardamom, cinnamon, ginger, and subtle chili infusions create drinks that are both complex and harmonious.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Closing CTA / Description Section -->
    <section class="pt-24 pb-48 md:pt-28 md:pb-48 bg-[#f0ebe1] border-t border-[#d4af37]/20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <p class="max-w-2xl mx-auto text-base md:text-lg text-text-muted">
          A slow-crafted journey through Dum Biryani, kebabs, gravies, desserts, and spice-led beverages, curated for lingering conversations and unhurried meals.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <router-link
            to="/contact"
            class="inline-flex items-center justify-center px-8 py-3 border border-transparent bg-gold text-background text-sm md:text-base font-semibold tracking-[0.25em] uppercase hover:bg-gold/90 transition-colors duration-300"
          >
            Reserve a Table
          </router-link>
          <router-link
            to="/menu-modern"
            class="inline-flex items-center justify-center px-8 py-3 border border-[#2b2116]/20 text-[#2b2116] text-sm md:text-base font-semibold tracking-[0.25em] uppercase bg-transparent hover:bg-black/5 transition-colors duration-300"
          >
            Order for Home
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
