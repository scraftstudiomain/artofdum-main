<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { useScrollLock } from '@vueuse/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Components
import LoadingScreen from './components/LoadingScreen.vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import FullScreenMenu from './components/FullScreenMenu.vue';
import OrderViaSection from './components/OrderViaSection.vue';
import CurveDivider from './components/icons/CurveDivider.vue';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// State variables
const route = useRoute();
const isLoading = ref(true);
const showMainContent = ref(false);
const isMenuOpen = ref(false);
const selectedCountry = ref<'IN' | 'UAE'>('IN');
const bodyEl = document.body;
const isLocked = useScrollLock(bodyEl);

let lenis: Lenis;

// Watchers
watch(isMenuOpen, (newVal) => {
  isLocked.value = newVal;
  if (newVal) {
    lenis?.stop();
  } else {
    lenis?.start();
  }
});

watch(route, () => {
  isMenuOpen.value = false;
  nextTick(() => {
    ScrollTrigger.refresh();
  })
})

// Methods
const handleTransitionStart = () => {
  showMainContent.value = true
}

const handleLoadingComplete = () => {
  isLoading.value = false
  
  // Initialize Lenis after transition
  nextTick(() => {
    lenis = new Lenis({
      duration: 1.2,
      lerp: 0.08,
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    nextTick(() => {
      ScrollTrigger.refresh()
    })
  })
}

// Performance monitoring
onMounted(() => {
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
})

onUnmounted(() => {
  if (lenis) {
    lenis.destroy();
  }
})
</script>

<template>
  <div class="bg-background font-sans text-text">
    <!-- Loading Screen - overlays everything with high z-index -->
    <LoadingScreen
      v-if="isLoading"
      @transition-start="handleTransitionStart"
      @loading-complete="handleLoadingComplete"
    />

    <!-- Main App Content - ALWAYS rendered from the start, just behind loading screen -->
    <div class="main-content-wrapper">
      <!-- Navigation - always rendered -->
      <AppHeader
        :country="selectedCountry"
        @update:country="selectedCountry = $event"
        @toggle-menu="isMenuOpen = !isMenuOpen"
      />
      <FullScreenMenu :is-open="isMenuOpen" @close="isMenuOpen = false" />

      <!-- Main content with router view - ALWAYS rendered -->
      <main>
        <router-view />
      </main>

      <!-- Footer sections - shown after loading -->
      <div v-show="showMainContent" class="relative">
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
