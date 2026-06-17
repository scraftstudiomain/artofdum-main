<script setup lang="ts">
import img1 from '../RAW IMAGES AGGREGATOR SHOOT/1.jpg';
import img2 from '../RAW IMAGES AGGREGATOR SHOOT/2.jpg';
import img3 from '../RAW IMAGES AGGREGATOR SHOOT/3.jpg';
import img4 from '../RAW IMAGES AGGREGATOR SHOOT/4.jpg';
import img5 from '../RAW IMAGES AGGREGATOR SHOOT/5.jpg';

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
];

// Handle image loading error
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  console.error(`Failed to load image: ${img.src}`);
};
</script>

<template>
  <section class="relative w-full overflow-hidden bg-transparent py-16 sm:py-24">
    <!-- Section Title -->
    <div
      class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center"
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
    >
      <p class="text-[0.7rem] sm:text-xs tracking-[0.35em] uppercase text-brand-nutmeg mb-3 font-semibold">
        Visual Showcase
      </p>
      <h2 class="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-earthen font-bold mb-4">
        Immersive Dining Theatre
      </h2>
      <p class="text-xs sm:text-sm md:text-base text-brand-nutmeg text-opacity-80 max-w-lg mx-auto leading-relaxed font-light">
        Glimpses of the artistry, culinary fire, and passion infused into every creation.
      </p>
    </div>

    <!-- Horizontal Swipeable Track -->
    <div
      class="w-full flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar px-6 md:px-[10vw]"
    >
      <!-- Carousel Cards -->
      <div
        v-for="(image, index) in images"
        :key="index"
        class="flex-shrink-0 w-[75vw] sm:w-[45vw] md:w-[35vw] lg:w-[28vw] snap-center pb-4"
        v-motion
        :initial="{ opacity: 0, scale: 0.98 }"
        :visibleOnce="{ opacity: 1, scale: 1, transition: { duration: 700, ease: 'easeOut', delay: index * 100 } }"
      >
        <div
          class="w-full overflow-hidden shadow-xl shadow-black/20 border-4 border-brand-sesame bg-brand-earthen/5 p-1 rounded-sm aspect-square"
        >
          <div
            class="w-full h-full overflow-hidden border border-brand-sesame/40 bg-brand-earthen/5 p-0.5"
          >
            <img
              :src="image"
              :alt="`Gallery image ${index + 1}`"
              loading="lazy"
              decoding="async"
              @error="handleImageError"
              class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500 ease-out"
            />
          </div>
        </div>
      </div>
      <!-- Spacer at end to allow scrolling past the last element cleanly -->
      <div class="flex-shrink-0 w-[4vw] md:w-[8vw]"></div>
    </div>
  </section>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>