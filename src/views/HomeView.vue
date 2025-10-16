<script setup lang="ts">
import HeroSection from '../components/HeroSection.vue'
import IntroSection from '../components/IntroSection.vue'
import HorizontalGallery from '../components/HorizontalGallery.vue'
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

    <div class="relative">
      <TestimonialsSection />
    </div>
  </div>
</template>
