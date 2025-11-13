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
  </section>
</template>

<style scoped>
.loop-images {
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: transparent;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
}

.title-section {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  max-width: 500px;
  text-align: center;
  padding-bottom: 2rem;
}

.carousel-track {
  --left: -300rem;
  min-width: calc(10rem * var(--total));
  height: 30rem;
  position: relative;
  margin-top: 12rem;
}

.carousel-track .carousel-item {
  position: absolute;
  width: 30rem;
  height: 30rem;
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
  mask: linear-gradient(black 70%, transparent 100%);
  -webkit-mask: linear-gradient(black 70%, transparent 100%);
}

.carousel-track .carousel-item:hover img {
  transform: rotateY(0deg) translateY(-1rem);
}

@keyframes scroll-left {
  to {
    left: var(--left);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .title-section {
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
    right: auto;
    max-width: 90%;
    padding: 0 1rem;
    padding-bottom: 2rem;
  }

  .title-section h2 {
    font-size: 2rem;
  }

  .carousel-track {
    height: 20rem;
    margin-top: 10rem;
  }

  .carousel-track .carousel-item {
    width: 20rem;
    height: 20rem;
  }
}
</style>

