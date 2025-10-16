<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import IntroSection from '../components/IntroSection.vue'
import HorizontalGallery from '../components/HorizontalGallery.vue'
import CurvedLoop from '../components/CurvedLoop.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import CurveDivider from '../components/icons/CurveDivider.vue'
import VideoPinSection from '../components/VideoPinSection.vue'
</script>

<template>
  <div>
    <HeroSection />

    <div class="relative -mt-24 z-10">
      <CurveDivider class="w-full h-24 text-background fill-current" />
      <IntroSection />
    </div>

    <VideoPinSection />

    <HorizontalGallery />

    <section class="bg-background py-8 md:py-12 w-full">
      <CurvedLoop
        marqueeText="Art of Dum ★ Authentic Indian Cuisine ★ Fine Dining Experience ★ Exquisite Flavors ★ Premium Dining ★ "
        :speed="3"
        :curve-amount="300"
        class="text-gold"
      />
    </section>

    <div class="relative">
      <TestimonialsSection />
    </div>
  </div>
</template>
