<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Components
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import OrderViaSection from './components/OrderViaSection.vue';
import CurveDivider from './components/icons/CurveDivider.vue';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// State variables
const route = useRoute();
const selectedCountry = ref<'IN' | 'UAE'>('IN');
let lenis: Lenis;

watch(route, () => {
  nextTick(() => {
    ScrollTrigger.refresh();
  })
})

// Methods
const handleScrollToSection = (e: Event) => {
  const targetId = (e as CustomEvent).detail;
  const el = document.querySelector(targetId);
  if (el) {
    lenis?.scrollTo(el);
  }
};

onMounted(() => {
  // Initialize Lenis immediately on mount
  nextTick(() => {
    lenis = new Lenis({
      duration: 1.2,
      lerp: 0.08,
      smoothWheel: true,
    });

    window.addEventListener('scroll-to-section', handleScrollToSection);
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    nextTick(() => {
      ScrollTrigger.refresh();
    });
  });

  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.navigationStart;
      
      console.log(`Page load time: ${pageLoadTime}ms`);
      console.log(`DOM Content Loaded: ${domContentLoaded}ms`);
      
      if (window.gtag) {
        window.gtag('event', 'page_load_time', {
          value: pageLoadTime,
          custom_parameter: 'page_load'
        });
      }
    });
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll-to-section', handleScrollToSection);
  if (lenis) {
    lenis.destroy();
  }
});
</script>

<template>
  <div class="bg-background font-sans text-text">
    <!-- Main App Content - loaded instantly without delay -->
    <div class="main-content-wrapper">
      <AppHeader
        :country="selectedCountry"
        @update:country="selectedCountry = $event"
      />

      <!-- Main content with router view -->
      <main>
        <router-view />
      </main>

      <!-- Footer sections -->
      <div class="relative">
        <CurveDivider class="absolute bottom-full w-full h-24 text-[#4e3b2d] fill-current" />
        <div data-ordervia-section>
          <OrderViaSection />
        </div>
        <AppFooter />
      </div>
    </div>
  </div>
</template>

<style>
.main-content-wrapper {
  position: relative;
  z-index: 1;
}
</style>
