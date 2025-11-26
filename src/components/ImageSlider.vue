<script setup lang="ts">

// Using same images from HorizontalGallery
const images = [
  'https://images.pexels.com/photos/2092916/pexels-photo-2092916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/941864/pexels-photo-941864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
];

// Duplicate images for seamless loop (total 10 items)
const totalItems = images.length * 2;
</script>

<template>
  <section class="loop-images" :style="{ '--bg': 'white' }">
    <!-- Desktop / tablet: original animated carousel -->
    <div class="hidden md:block w-full h-full relative">
      <div class="title-section">
        <h2 class="font-serif text-4xl md:text-5xl text-gold">A Visual Symphony</h2>
        <p class="mt-4 text-text-muted max-w-sm mx-auto">Glimpses of the artistry and passion infused into every creation.</p>
      </div>
      <div 
        class="carousel-track" 
        :style="{ '--time': '60s', '--total': totalItems.toString() }"
      >
        <div
          v-for="(image, index) in [...images, ...images]"
          :key="index"
          class="carousel-item"
          :style="{ '--i': (index + 1).toString() }"
        >
          <img :src="image" :alt="`Carousel image ${index + 1}`" />
        </div>
      </div>
    </div>

    <!-- Mobile: simple horizontal slider -->
    <div class="block md:hidden w-full px-4 pt-16 pb-10">
      <div class="text-center mb-6">
        <h2 class="font-serif text-2xl text-gold whitespace-nowrap">A Visual Symphony</h2>
        <p class="mt-2 text-text-muted text-sm">
          Glimpses of the artistry and passion infused into every creation.
        </p>
      </div>
      <div class="mobile-slider flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-4 px-4">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="flex-shrink-0 w-[75vw] snap-center"
        >
          <div
            class="w-full overflow-hidden rounded-sm shadow-2xl shadow-black/40 bg-black/5"
            style="aspect-ratio: 1 / 1;"
          >
            <img
              :src="image"
              :alt="`Carousel image ${index + 1}`"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.loop-images {
  position: relative;
  min-height: 600px; /* Changed from fixed height to min-height */
  width: 100%;
  background-color: transparent;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 4rem 2rem; /* Adjusted padding */
}

.title-section {
  position: absolute;
  top: 0; /* Moved to top relative to container */
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  max-width: 500px;
  text-align: center;
  padding-bottom: 2rem;
  margin-top: 2rem;
}

.carousel-track {
  --left: -300rem;
  min-width: calc(10rem * var(--total));
  height: 25rem; /* Reduced height slightly */
  position: relative;
  margin-top: 8rem; /* Reduced top margin significantly */
}

.carousel-track .carousel-item {
  position: absolute;
  width: 25rem; /* Reduced size slightly to match track height */
  height: 25rem;
  left: 100%;
  display: flex;
  justify-content: center;
  perspective: 1000px;
  transform-style: preserve-3d;
  animation: scroll-left var(--time) linear infinite;
  animation-delay: calc(var(--time) / var(--total) * (var(--i) - 1) - var(--time));
  will-change: left;
  transition: 0.5s ease-in-out;
  cursor: pointer;
}

.carousel-track .carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: white;
  transform: rotateY(-45deg);
  transition: 0.5s ease-in-out;
  /* Removed mask for hazy bottom effect */
  box-shadow: 0 10px 30px rgba(0,0,0,0.3); /* Added shadow for depth instead */
}

.carousel-track .carousel-item:hover img {
  transform: rotateY(0deg) translateY(-1rem);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}

@keyframes scroll-left {
  to {
    left: var(--left);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .loop-images {
    height: auto;
    width: 100%;
    padding: 3rem 0 2.5rem;
  }

  /* Mobile slider scrollbar styling (thin golden line) */
  .mobile-slider {
    scrollbar-width: thin;
    scrollbar-color: rgba(212, 163, 67, 0.7) transparent;
  }

  :deep(.mobile-slider::-webkit-scrollbar) {
    height: 3px;
  }

  :deep(.mobile-slider::-webkit-scrollbar-track) {
    background: transparent;
  }

  :deep(.mobile-slider::-webkit-scrollbar-thumb) {
    background: rgba(212, 163, 67, 0.9); /* gold-like */
    border-radius: 9999px;
  }
}
</style>

