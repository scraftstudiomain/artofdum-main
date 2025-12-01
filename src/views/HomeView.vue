<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from '../components/HeroSection.vue'
import ExperienceArtSection from '../components/ExperienceArtSection.vue'
import CleanCulinaryOfferingsSection from '../components/CleanCulinaryOfferingsSection.vue'
// import IntroSection from '../components/IntroSection.vue'
import HorizontalGallery from '../components/HorizontalGallery.vue'
// import CurvedLoop from '../components/CurvedLoop.vue'
// import TestimonialsSection from '../components/TestimonialsSection.vue'
// import CurveDivider from '../components/icons/CurveDivider.vue'
// import VideoPinSection from '../components/VideoPinSection.vue'
import ViewMenuTextPath from '../components/ViewMenuTextPath.vue'

import CustomerReviewsSection from '../components/CustomerReviewsSection.vue'
import ScrollDrivenAnimationSection from '../components/ScrollDrivenAnimationSection.vue'
import ParallaxImpactSection from '../components/ParallaxImpactSection.vue'
import ReservationSection from '../components/ReservationSection.vue'

// Refresh ScrollTrigger after all components are mounted to fix positioning
onMounted(() => {
  nextTick(() => {
    // Wait for window load and then refresh ScrollTrigger
    const refreshScrollTrigger = () => {
      setTimeout(() => {
        ScrollTrigger.refresh()
        // Additional refresh after a short delay to ensure all layouts are settled
        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 300)
      }, 100)
    }
    
    if (document.readyState === 'complete') {
      refreshScrollTrigger()
    } else {
      window.addEventListener('load', refreshScrollTrigger, { once: true })
    }
  })
})
</script>

<template>
  <div class="home-view-container">
    <HeroSection />

    <ExperienceArtSection />

    <CleanCulinaryOfferingsSection />

    <!-- The Soul of Dum Pukht section hidden -->
    <!-- <div class="relative -mt-24 z-10">
      <CurveDivider class="w-full h-24 text-background fill-current" />
      <IntroSection />
    </div> -->

    <!-- <ImageSlider /> -->

    <!-- <WelcomeSection /> -->

    <HorizontalGallery />

    <!-- Fine Dining Experience section hidden -->
    <!-- <section class="bg-background py-8 md:py-12 w-full">
      <CurvedLoop
        marqueeText="Art of Dum ★ Authentic Indian Cuisine ★ Fine Dining Experience ★ Exquisite Flavors ★ Premium Dining ★ "
        :speed="3"
        :curve-amount="300"
        class="text-gold"
      />
    </section> -->

    <ViewMenuTextPath />
     <ReservationSection />

    <!-- <ScrollDrivenAnimationSection />

    <ParallaxImpactSection /> -->

    <!-- Customer Reviews Section -->
    <CustomerReviewsSection />

   

    <!-- Video section removed -->
    <!-- <VideoPinSection key="video-pin-section" /> -->

    <!-- Words of Praise section hidden -->
    <!-- <div class="relative">
      <TestimonialsSection />
    </div> -->
  </div>
</template>

<style scoped>
.home-view-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f0ebe1;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>
