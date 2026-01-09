<script setup lang="ts">
import heroDishImage from '../RAW IMAGES AGGREGATOR SHOOT/1.jpg';
import potImage from '../RAW IMAGES AGGREGATOR SHOOT/2.jpg';
</script>

<template>
  <section class="relative py-16 sm:py-20 lg:py-24 bg-[#f0ebe1]">
    <div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div class="flex-1 max-w-xl text-center lg:text-left">
          <p class="text-xs sm:text-sm uppercase tracking-[0.3em] text-gold/80 mb-4">
            Slow-Cooked Perfection
          </p>

          <h2 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight mb-6">
            Experience the
            <span class="block text-gold"> Art of Dum</span>
          </h2>

          <p class="text-base sm:text-lg text-black/80 leading-relaxed mb-0">
            Art of Dum is a celebration of the timeless Dum technique, slow cooking in sealed vessels that preserves
            flavor, aroma, and depth. Inspired by royal Indian kitchens and crafted for today’s design-conscious
            diners, every dish is a journey: melt-in-the-mouth Kebabs, fragrant Biryani, delicately spiced Gravies,
            and indulgent desserts.
          </p>
        </div>

        <div class="flex-1 w-full max-w-lg lg:max-w-xl mx-auto">
          <div class="relative w-full aspect-[4/3]">
            <!-- Background Image (base layer) -->
            <div
              class="absolute top-0 left-10 w-[90%] h-[78%]
                     overflow-hidden border border-black/10 bg-black/5 shadow-lg image-card"
            >
              <img
                :src="heroDishImage"
                alt="Signature Dum Biryani"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Front Image (overlapping card, slightly lower and more to the left) -->
            <div
              class="absolute top-10 left-0 w-[88%] h-[82%]
                     overflow-hidden border border-black/10 bg-black/5 shadow-2xl image-card"
            >
              <img
                :src="potImage"
                alt="Traditional Handi Pot"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.image-card {
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.image-card:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);
}
</style>
