<script setup lang="ts">
import image1 from '../RAW IMAGES AGGREGATOR SHOOT/1.jpg'
import image4 from '../RAW IMAGES AGGREGATOR SHOOT/4.jpg'
import image8 from '../RAW IMAGES AGGREGATOR SHOOT/8.jpg'

const items = [
  {
    title: 'Signature Biryani',
    image: image1
  },
  {
    title: 'Handcrafted Kebabs',
    image: image4
  },
  {
    title: 'Rich Gravies',
    image: image8
  }
]

const offsets = ['md:-translate-y-6', 'md:translate-y-10', 'md:-translate-y-6']
</script>

<template>
  <section
    id="menu"
    class="relative py-20 sm:py-24 md:py-28 bg-[#f0ebe1] text-[#2b2116] overflow-hidden"
  >
    <div
      class="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 text-center mb-16 md:mb-20 relative z-10"
    >
      <p
        class="text-[0.7rem] sm:text-xs tracking-[0.35em] uppercase text-[#4e3b2d]/80 mb-3"
      >
        DISCOVER FLAVOR
      </p>

      <h2
        class="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold mb-4 leading-tight"
      >
       Our Signature Dum Cuisine
      </h2>

      <p
        class="text-sm sm:text-base md:text-lg text-[#4e3b2d]/85 max-w-xl mx-auto leading-relaxed"
      >
       Step into a world where culinary tradition meets modern refinement. From copper tandoors to live Dum stations, every element is designed to enchant your senses.
      </p>
    </div>

    <!-- Full-width wavy divider behind the cards -->
    <div
      class="pointer-events-none absolute inset-x-0 top-[60%] sm:top-1/2 -translate-y-1/2 opacity-70"
    >
      <svg viewBox="0 0 1440 320" class="w-full h-auto">
        <path
          fill="none"
          stroke="#c9a974"
          stroke-width="2"
          d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,138.7C672,117,768,107,864,122.7C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128"
        />
      </svg>
    </div>

    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      <div
        class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0 min-h-[320px]"
      >
        <div
          v-for="(item, index) in items"
          :key="item.title"
          :class="['flex flex-col items-center gap-5 group', offsets[index]]"
        >
          <div
            class="w-44 h-44 sm:w-52 sm:h-52 rounded-full border-[3px] border-[#c9a974] overflow-hidden shadow-2xl shadow-black/60 bg-black relative"
          >
            <div
              class="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500"
            />
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500 ease-out"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div
            class="px-5 py-2 bg-[#f0ebe1] border border-[#c9a974]/80 text-[#2b2116] text-xs sm:text-sm tracking-[0.18em] uppercase font-medium shadow-md"
          >
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>

    <div
      class="pointer-events-none absolute inset-x-0 bottom-[-2.5rem] sm:bottom-[-3rem] md:bottom-[-3.5rem] overflow-hidden"
    >
      <div class="clean-offer-big">
        <span
          class="whitespace-nowrap font-serif text-[18vw] sm:text-[16vw] md:text-[14vw] leading-none text-[#e4dcca]"
        >
          DUM BIRYANI  KEBABS  GRAVIES  DUM BIRYANI  KEBABS  GRAVIES
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.clean-offer-big {
  animation: clean-offer-scroll 40s linear infinite;
  will-change: transform;
}

@keyframes clean-offer-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@media (max-width: 768px) {
  .clean-offer-big {
    animation-duration: 55s;
  }
}
</style>
