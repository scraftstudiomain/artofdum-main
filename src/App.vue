<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import Lenis from 'lenis'
import { useScrollLock } from '@vueuse/core'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import FullScreenMenu from './components/FullScreenMenu.vue'
import OrderViaSection from './components/OrderViaSection.vue'
import CurveDivider from './components/icons/CurveDivider.vue'
import LoadingScreen from './components/LoadingScreen.vue'

let lenis: Lenis;
const isMenuOpen = ref(false);
const bodyEl = document.body;
const isLocked = useScrollLock(bodyEl);
const route = useRoute();
const isLoading = ref(true);
const showMainContent = ref(false);
const showNavigation = ref(false);

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
  // Ensure scroll-based animations recalc after route changes
  nextTick(() => {
    ScrollTrigger.refresh();
  })
})

const handleLoadingComplete = () => {
  isLoading.value = false;
  
  // Show navigation immediately after doors open
  showNavigation.value = true;
  
  // Show main content after a delay to ensure smooth transition
  setTimeout(() => {
    showMainContent.value = true;
    
    // Initialize Lenis after main content is shown
    nextTick(() => {
      lenis = new Lenis({
        duration: 1.2,
        lerp: 0.08,
        smoothWheel: true,
      });

      // Integrate Lenis with GSAP's ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update)

      gsap.ticker.add((time)=>{
        lenis.raf(time * 1000)
      })

      gsap.ticker.lagSmoothing(0)

      // Recalculate ScrollTrigger positions after initial mount
      nextTick(() => {
        ScrollTrigger.refresh()
      })
    })
  }, 600) // Shorter delay for smoother transition
}

onMounted(() => {
  // Lenis initialization is now handled in handleLoadingComplete
})

onUnmounted(() => {
  if (lenis) {
    lenis.destroy();
  }
})
</script>

<template>
  <div class="bg-background font-sans text-text">
    <!-- Loading Screen -->
    <LoadingScreen
      v-if="isLoading"
      @loading-complete="handleLoadingComplete"
    />

    <!-- Main App Content - shown after doors open -->
    <div v-if="!isLoading" class="main-content-transition">
      <!-- Navigation - shown immediately with hero -->
      <div v-if="showNavigation" class="navigation-transition">
        <AppHeader @toggle-menu="isMenuOpen = !isMenuOpen" />
        <FullScreenMenu :is-open="isMenuOpen" @close="isMenuOpen = false" />
      </div>

      <!-- Main content with router view -->
      <main>
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

      <!-- Footer sections - shown after main content -->
      <div v-if="showMainContent" class="relative fade-in">
        <CurveDivider class="absolute bottom-full w-full h-24 text-background fill-current" />
        <div data-ordervia-section>
          <OrderViaSection />
        </div>
        <AppFooter />
      </div>
    </div>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.fade-in {
  animation: fadeIn 0.8s ease-in-out;
}

.navigation-transition {
  animation: navigationSlideDown 0.8s ease-out;
}

.main-content-transition {
  animation: contentFadeIn 1.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes navigationSlideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes contentFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
