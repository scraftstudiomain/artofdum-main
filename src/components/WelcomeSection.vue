<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Use landscape food images - one for background, one for front overlay
const backgroundImage = 'https://images.pexels.com/photos/14832360/pexels-photo-14832360.jpeg'
const frontImage = 'https://images.pexels.com/photos/2092916/pexels-photo-2092916.jpeg'

// Fallback images
const fallbackImage = '/images/hero-poster.jpg'

// Handle image loading errors
const handleImageError = (event: Event, isBackground: boolean) => {
  const img = event.target as HTMLImageElement
  console.error(`Failed to load ${isBackground ? 'background' : 'front'} image: ${img.src}`)
  // Use fallback image
  img.src = fallbackImage
}

const sectionRef = ref<HTMLElement | null>(null)
const contentBoxRef = ref<HTMLElement | null>(null)
const backgroundImageRef = ref<HTMLElement | null>(null)
const frontImageRef = ref<HTMLElement | null>(null)
let masterTimeline: gsap.core.Timeline | null = null

onMounted(() => {
  if (!sectionRef.value || !contentBoxRef.value || !backgroundImageRef.value || !frontImageRef.value) return

  // Calculate total animation duration
  const animationDuration = 1.2
  const totalDuration = animationDuration * 3 // 3 animations sequentially
  const scrollDistance = totalDuration * 800 // Convert to pixels for pinning/scroll distance

  // Create a scroll driven timeline so fast flicks stay in sync with scroll position.
  masterTimeline = gsap.timeline({
    defaults: {
      duration: animationDuration,
      ease: 'power3.out'
    },
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top top',
      end: `+=${scrollDistance}`,
      pin: true,
      scrub: 0.25,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  })

  // 1. First: Background image falls from top
  masterTimeline.fromTo(
    backgroundImageRef.value,
    {
      opacity: 0,
      y: -100,
      scale: 0.9
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: animationDuration,
      ease: 'power3.out'
    }
  )

  // 2. Then: Front image falls from top
  masterTimeline.fromTo(
    frontImageRef.value,
    {
      opacity: 0,
      y: -100,
      scale: 0.9
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: animationDuration,
      ease: 'power3.out'
    },
    `+=0` // Start immediately after previous animation
  )

  // 3. Finally: Content box comes up from bottom
  masterTimeline.fromTo(
    contentBoxRef.value,
    {
      opacity: 0,
      y: 100,
      scale: 0.95
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: animationDuration,
      ease: 'power3.out'
    },
    `+=0` // Start immediately after previous animation
  )

  ScrollTrigger.refresh()
})

onUnmounted(() => {
  masterTimeline?.scrollTrigger?.kill()
  masterTimeline?.kill()
  masterTimeline = null
})
</script>

<template>
  <section
    ref="sectionRef"
    class="welcome-section relative h-[700px] flex items-center px-4 sm:px-6 lg:px-8 overflow-visible"
  >
    <div class="container mx-auto max-w-7xl">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        <!-- Left Side: Content Box -->
        <div class="relative z-10 lg:pr-8 order-2 lg:order-1">
          <div
            ref="contentBoxRef"
            class="content-box bg-white/95 backdrop-blur-sm border border-black/20 p-8 md:p-10 lg:p-12 shadow-xl"
          >
            <div class="flex items-start gap-4">
              <div class="diamond-bullet w-2 h-2 bg-black mt-2 flex-shrink-0"></div>
              <div class="flex-1">
                <p class="text-black text-base md:text-lg leading-relaxed">
                  Welcome to Art of Dum, where a 300-year-old culinary legacy is brought alive in every Dum-sealed pot. Inspired by royal kitchens, we offer Dubai's finest slow-cooked biryanis, melt-in-your mouth kebabs, and rich gravies all delivered to you with sustainable elegance.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side: Layered Images -->
        <div class="relative w-full aspect-[16/10] md:aspect-[16/9] lg:aspect-[4/3] order-1 lg:order-2 overflow-visible">
          <!-- Background Image (Back Side - Base Layer) -->
          <div ref="backgroundImageRef" class="image-container absolute inset-0 lg:inset-x-0 lg:right-0 lg:left-auto w-full lg:w-[95%] h-full z-10">
            <img
              :src="backgroundImage"
              alt="Art of Dum culinary experience"
              class="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              @error="(e) => handleImageError(e, true)"
            />
          </div>

          <!-- Front Image (Same size, overlapping on top with padding) -->
          <div ref="frontImageRef" class="image-container absolute top-8 right-8 md:top-12 md:right-12 lg:top-16 lg:right-16 left-0 bottom-0 lg:left-auto lg:right-0 w-full lg:w-[95%] h-full z-20">
            <img
              :src="frontImage"
              alt="Art of Dum texture overlay"
              class="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              @error="(e) => handleImageError(e, false)"
            />
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.welcome-section {
  background: transparent;
}

.content-box {
  position: relative;
  transform-origin: center;
  border-width: 1px;
  opacity: 0;
  transform: translateY(100px);
}

.image-container {
  opacity: 0;
  transform: translateY(-100px);
}

.diamond-bullet {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .welcome-section {
    height: 700px;
  }
}
</style>

