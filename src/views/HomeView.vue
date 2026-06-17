<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Components
import HeroSection from '../components/HeroSection.vue'
import ExperienceArtSection from '../components/ExperienceArtSection.vue'
import LandingMenuSection from '../components/LandingMenuSection.vue'
import CleanCulinaryOfferingsSection from '../components/CleanCulinaryOfferingsSection.vue'
import LandingSustainabilitySection from '../components/LandingSustainabilitySection.vue'
import LandingCateringSection from '../components/LandingCateringSection.vue'
import HorizontalGallery from '../components/HorizontalGallery.vue'
import ViewMenuTextPath from '../components/ViewMenuTextPath.vue'
import ReservationSection from '../components/ReservationSection.vue'
import CustomerReviewsSection from '../components/CustomerReviewsSection.vue'

// Refresh ScrollTrigger after all components are mounted to fix positioning
onMounted(() => {
  nextTick(() => {
    const refreshScrollTrigger = () => {
      setTimeout(() => {
        ScrollTrigger.refresh()
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
    <!-- Hero Section -->
    <HeroSection id="hero" />

    <!-- Heritage & About Section -->
    <ExperienceArtSection id="about" />

    <!-- Tabbed Menu Highlights Section -->
    <LandingMenuSection id="menu-highlights" />

    <!-- Cooking Process / Signature Videos Section -->
    <CleanCulinaryOfferingsSection id="signatures" />

    <!-- Clay Pots & Brand Values Section -->
    <LandingSustainabilitySection id="sustainability" />

    <!-- Event Services & Catering Section -->
    <LandingCateringSection id="catering" />

    <!-- Photo Gallery Grid -->
    <HorizontalGallery id="experiences-gallery" />

    <!-- Moving Decorative Text Banner -->
    <ViewMenuTextPath />

    <!-- Reservations Form & Contact Section -->
    <ReservationSection id="reservation" />

    <!-- Testimonials & Customer Reviews Section -->
    <CustomerReviewsSection id="testimonials" />
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
