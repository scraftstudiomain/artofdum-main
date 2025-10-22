<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const main = ref<HTMLElement | null>(null);
const galleryRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);

const images = [
  'https://images.pexels.com/photos/14832360/pexels-photo-14832360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/2092916/pexels-photo-2092916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/941864/pexels-photo-941864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
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
    ctx = gsap.context((self) => {
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
            start: 'top top+=1', // tiny offset to avoid fighting with previous pin end
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
    <div class="h-[20vh] bg-background"></div>
    <section ref="galleryRef" class="relative h-screen w-full overflow-hidden bg-background">
      <div ref="trackRef" class="h-full flex items-center">
        <div class="flex-shrink-0 w-[80vw] sm:w-[50vw] lg:w-[40vw] pl-6 sm:pl-12 md:pl-[10vw] flex flex-col justify-center">
          <h2 class="font-serif text-4xl md:text-5xl text-gold">A Visual Symphony</h2>
          <p class="mt-4 text-text-muted max-w-sm">Glimpses of the artistry and passion infused into every creation.</p>
        </div>
        <div
          v-for="(image, index) in images"
          :key="index"
          class="flex-shrink-0 w-[75vw] sm:w-[50vw] md:w-[40vw] lg:w-[35vw] h-[60vh] px-4 sm:px-6 md:px-8"
        >
          <div class="w-full h-full overflow-hidden shadow-2xl shadow-black/50 border-4 border-gold bg-gradient-to-br from-yellow-900/20 via-yellow-700/30 to-yellow-800/20 p-1 rounded-sm">
            <div class="w-full h-full overflow-hidden border-2 border-gold/60 bg-gradient-to-br from-yellow-700/10 to-yellow-900/20 p-0.5">
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
    <div class="h-[5vh] bg-background"></div>
  </div>
</template>