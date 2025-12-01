<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img1 from '../RAW IMAGES AGGREGATOR SHOOT/1.jpg';
import img2 from '../RAW IMAGES AGGREGATOR SHOOT/2.jpg';
import img3 from '../RAW IMAGES AGGREGATOR SHOOT/3.jpg';
import img4 from '../RAW IMAGES AGGREGATOR SHOOT/4.jpg';
import img5 from '../RAW IMAGES AGGREGATOR SHOOT/5.jpg';
import img6 from '../RAW IMAGES AGGREGATOR SHOOT/6.jpg';
import img7 from '../RAW IMAGES AGGREGATOR SHOOT/7.jpg';
import img8 from '../RAW IMAGES AGGREGATOR SHOOT/8.jpg';
import img9 from '../RAW IMAGES AGGREGATOR SHOOT/9.jpg';
import img10 from '../RAW IMAGES AGGREGATOR SHOOT/10.jpg';
import img11 from '../RAW IMAGES AGGREGATOR SHOOT/11.jpg';
import img12 from '../RAW IMAGES AGGREGATOR SHOOT/12.jpg';
import img13 from '../RAW IMAGES AGGREGATOR SHOOT/13.jpg';
import img14 from '../RAW IMAGES AGGREGATOR SHOOT/14.jpg';
import img15 from '../RAW IMAGES AGGREGATOR SHOOT/15.jpg';
import img16 from '../RAW IMAGES AGGREGATOR SHOOT/16.jpg';
import img17 from '../RAW IMAGES AGGREGATOR SHOOT/17.jpg';
import img18 from '../RAW IMAGES AGGREGATOR SHOOT/18.jpg';
import img19 from '../RAW IMAGES AGGREGATOR SHOOT/19.jpg';
import img20 from '../RAW IMAGES AGGREGATOR SHOOT/20.jpg';

gsap.registerPlugin(ScrollTrigger);

const main = ref<HTMLElement | null>(null);
const galleryRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
];

// Handle image loading error
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  console.error(`Failed to load image: ${img.src}`);
  // You could add a fallback placeholder image here if needed
  // img.src = '/path/to/placeholder.jpg';
};

let ctx: gsap.Context;

onMounted(() => {
  nextTick(() => {
    ctx = gsap.context(() => {
      const track = trackRef.value;
      const gallery = galleryRef.value;

      if (gallery && track) {
        // Use functions for values to make them responsive
        const getScrollAmount = () => {
          return track.scrollWidth - gallery.clientWidth;
        };

        if (getScrollAmount() > 0) {
          const tween = gsap.to(track, {
            x: () => -getScrollAmount(),
            ease: 'none',
          });

          ScrollTrigger.create({
            trigger: gallery,
            start: 'top top+=100', // tiny offset to avoid fighting with previous pin end
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            pinSpacing: true,
            fastScrollEnd: true,
            animation: tween,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 0,
            preventOverlaps: true,
          });
        }
      }
    }, main.value!);
  });
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <div ref="main">
    <!-- Top spacer hidden -->
    <!-- <div class="h-[20vh] bg-background"></div> -->
    <section ref="galleryRef" class="relative h-screen w-full overflow-hidden gallery-section">
      <div ref="trackRef" class="h-full flex items-start md:items-center">
        <div class="flex-shrink-0 w-[80vw] sm:w-[50vw] lg:w-[40vw] pl-6 sm:pl-12 md:pl-[10vw] flex flex-col justify-start md:justify-center pt-10 md:pt-0">
          <h2 class="font-serif text-3xl sm:text-4xl md:text-5xl text-gold text-center sm:text-left">Immersive Dining Theatre</h2>
          <p class="mt-3 sm:mt-4 text-text-muted max-w-sm mx-auto sm:mx-0 text-center sm:text-left">Glimpses of the artistry and passion infused into every creation.</p>
        </div>
        <div
          v-for="(image, index) in images"
          :key="index"
          class="flex-shrink-0 w-[75vw] sm:w-[50vw] md:w-[40vw] lg:w-[35vw] px-4 sm:px-6 md:px-8"
        >
          <div
            class="w-full h-full overflow-hidden shadow-2xl shadow-black/50 border-4 border-gold bg-gradient-to-br from-yellow-900/20 via-yellow-700/30 to-yellow-800/20 p-1 rounded-sm"
            style="aspect-ratio: 1 / 1; border-color: #e4dcca;"
          >
            <div class="w-full h-full overflow-hidden border-2 border-gold/60 bg-gradient-to-br from-yellow-700/10 to-yellow-900/20 p-0.5" style="border-color: #e4dcca;">
              <img
                :src="image"
                :alt="`Gallery image ${index + 1}`"
                loading="lazy"
                decoding="async"
                @error="handleImageError"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
         <div class="flex-shrink-0 w-[10vw]"></div> <!-- Spacer at the end -->
      </div>
    </section>
    <!-- Bottom spacer hidden -->
    <!-- <div class="h-[5vh] bg-background"></div> -->
  </div>
</template>

<style scoped>
.gallery-section {
  /* Background image removed - now handled by parent HomeView */
  background-color: transparent;
}

@media (max-width: 768px) {
  .gallery-section {
    height: 45vh;
  }
}

@media (max-width: 480px) {
  .gallery-section {
    height: 45vh;
  }
}
</style>