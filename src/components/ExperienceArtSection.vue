<script setup lang="ts">
import heroDishImage from '../RAW IMAGES AGGREGATOR SHOOT/1.jpg';
import potImage from '../RAW IMAGES AGGREGATOR SHOOT/2.jpg';
</script>

<template>
  <section class="relative py-20 sm:py-24 bg-brand-sesame text-brand-earthen">
    <div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div class="flex-1 max-w-xl text-center lg:text-left">
          <p class="text-xs sm:text-sm uppercase tracking-[0.3em] text-brand-nutmeg font-semibold mb-4">
            Slow-Cooked Stories from India's Kitchen
          </p>

          <h2 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-earthen leading-[1.2] mb-6">
            Experience the<br />
            <span class="text-brand-gold-dark font-serif">Art of Dum</span>
          </h2>

          <p class="text-base sm:text-lg text-brand-nutmeg leading-relaxed font-light mb-0">
            Art of Dum is a tribute to the timeless technique of slow-cooking in a sealed environment, reviving the soul of undivided India's royal kitchens. Anchored to the earth and unhurried traditions, our Khansamas craft a sensory journey of unsealed steam, melt-in-the-mouth Kebabs, fragrant Biryanis, and silken gravies designed as a modern, everyday luxury.
          </p>
        </div>

        <div class="flex-1 w-full max-w-lg lg:max-w-xl mx-auto">
          <div class="relative w-full aspect-[4/3]">
            <!-- Background Image (base layer) -->
            <div
              class="absolute top-0 left-10 w-[90%] h-[78%]
                     overflow-hidden border border-brand-nutmeg/10 bg-brand-earthen/5 shadow-lg image-card animate-subtle-pulse"
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
                     overflow-hidden border border-brand-gold/30 bg-brand-earthen/5 shadow-2xl image-card"
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
