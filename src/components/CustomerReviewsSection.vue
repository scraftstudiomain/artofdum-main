<template>
  <section
    id="testimonials"
    class="relative py-20 sm:py-28 bg-brand-cashew text-brand-earthen overflow-hidden"
  >
    <!-- Background graphical curves -->
    <div class="absolute top-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-brand-gold/5 blur-[80px] pointer-events-none"></div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Title -->
      <div
        class="text-center mb-16"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
      >
        <p class="text-[0.7rem] sm:text-xs tracking-[0.35em] uppercase text-brand-nutmeg mb-3 font-semibold">
          Words of Appreciation
        </p>
        <h2 class="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-earthen font-bold mb-4">
          Customer Reviews
        </h2>
        <div class="h-[1px] w-20 bg-[#885524] mx-auto"></div>
      </div>

      <!-- Testimonial Slideshow Card -->
      <div
        class="relative bg-brand-sesame/30 border border-[#885524]/20 shadow-2xl p-8 sm:p-12 md:p-16 text-center"
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 900, ease: 'easeOut', delay: 100 } }"
        @mouseenter="stopAutoPlay"
        @mouseleave="startAutoPlay"
      >
        <!-- Gold Quote Mark -->
        <span class="block font-serif text-7xl sm:text-8xl text-[#885524]/30 leading-none h-8 select-none">“</span>

        <!-- Carousel Content Wrapper -->
        <div class="relative min-h-[220px] sm:min-h-[180px] overflow-hidden flex items-center justify-center">
          <Transition name="fade-slide" mode="out-in">
            <div :key="currentIndex" class="w-full flex flex-col items-center">
              <!-- Circular Food Dish Image -->
              <div class="relative mb-6">
                <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#885524]/40 shadow-md">
                  <img
                    :src="reviews[currentIndex].dishImage"
                    :alt="reviews[currentIndex].source"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <!-- Quote text -->
              <p class="font-serif text-lg sm:text-xl md:text-2xl text-brand-earthen leading-relaxed italic max-w-2xl px-2 sm:px-6">
                {{ reviews[currentIndex].text }}
              </p>
            </div>
          </Transition>
        </div>

        <div class="h-[1px] w-16 bg-[#885524]/20 mx-auto my-6"></div>

        <!-- Platform Source Logo / Info -->
        <div class="flex flex-col items-center">
          <Transition name="fade-slide" mode="out-in">
            <div :key="currentIndex" class="flex flex-col items-center gap-1">
              <img
                :src="reviews[currentIndex].logo"
                :alt="reviews[currentIndex].source"
                class="h-6 sm:h-7 object-contain opacity-80"
              />
              <span class="text-[0.65rem] tracking-[0.2em] uppercase text-brand-nutmeg text-opacity-50 font-medium">
                Verified Reviewer
              </span>
            </div>
          </Transition>
        </div>

        <!-- Left/Right Arrow Controls (Overlay Desktop) -->
        <button
          @click="prevSlide"
          class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full border border-transparent hover:border-[#885524]/20 text-brand-earthen/40 hover:text-[#885524] transition-all duration-300 focus:outline-none"
          aria-label="Previous review"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 sm:w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button
          @click="nextSlide"
          class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full border border-transparent hover:border-[#885524]/20 text-brand-earthen/40 hover:text-[#885524] transition-all duration-300 focus:outline-none"
          aria-label="Next review"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 sm:w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      <!-- Carousel Pagination Dots -->
      <div
        class="flex justify-center gap-3 mt-10"
        v-motion
        :initial="{ opacity: 0 }"
        :visibleOnce="{ opacity: 1, transition: { duration: 600, delay: 200 } }"
      >
        <button
          v-for="(_, index) in reviews"
          :key="index"
          @click="goToSlide(index)"
          :class="[
            'w-2 h-2 rounded-full transition-all duration-300 focus:outline-none',
            index === currentIndex
              ? 'bg-[#885524] w-6'
              : 'bg-[#885524]/30 hover:bg-[#885524]/60'
          ]"
          :aria-label="`Go to slide ${index + 1}`"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Platform Logos
import careemLogo from '../Careem_logo1-removebg-preview.png'
import talabatLogo from '../Talabat_logo-removebg-preview.png'
import noonLogo from '../noon-2.png'
import zomatoLogo from '../zometo_cream-removebg-preview.png'

// Curated optimized dish images
import image1 from '../RAW IMAGES AGGREGATOR SHOOT/1.jpg'
import image3 from '../RAW IMAGES AGGREGATOR SHOOT/3.jpg'
import image4 from '../RAW IMAGES AGGREGATOR SHOOT/4.jpg'
import image5 from '../RAW IMAGES AGGREGATOR SHOOT/5.jpg'
import image6 from '../RAW IMAGES AGGREGATOR SHOOT/6.jpg'

const reviews = [
  {
    id: 1,
    text: 'The best Dum Biryani in Dubai! The rice was incredibly fluffy and the mutton was cooked to perfection.',
    source: 'Zomato',
    dishImage: image1,
    logo: zomatoLogo
  },
  {
    id: 2,
    text: 'Authentic flavors that remind me of home. Impeccable slow-cooked texture and exceptional service!',
    source: 'Talabat',
    dishImage: image6,
    logo: talabatLogo
  },
  {
    id: 3,
    text: 'A royal dining experience. The Galouti Kebabs are divine—they literally melt in the mouth!',
    source: 'Careem',
    dishImage: image3,
    logo: careemLogo
  },
  {
    id: 4,
    text: 'Perfect blend of tradition and taste. High-quality clay pot delivery. Highly recommended!',
    source: 'Noon',
    dishImage: image4,
    logo: noonLogo
  },
  {
    id: 5,
    text: 'Outstanding food quality and presentation. Reusable glass packaging is excellent. Will order again!',
    source: 'Zomato',
    dishImage: image5,
    logo: zomatoLogo
  }
]

const currentIndex = ref(0)
let autoPlayInterval: number | null = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % reviews.length
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + reviews.length) % reviews.length
}

const goToSlide = (index: number) => {
  currentIndex.value = index
}

const startAutoPlay = () => {
  stopAutoPlay()
  autoPlayInterval = window.setInterval(nextSlide, 6000) // Rotate slide every 6s
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
/* Buttery smooth slide-fade transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(12px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}
</style>
