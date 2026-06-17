<template>
  <section
    id="sustainability"
    class="relative py-20 sm:py-28 bg-brand-cashew text-brand-earthen overflow-hidden"
  >
    <!-- Background element -->
    <div class="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-brand-gold/5 blur-[90px] pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        <!-- Left Side: Copy and Features -->
        <div
          class="flex-1 max-w-xl text-center lg:text-left"
          v-motion
          :initial="{ opacity: 0, x: -40 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 900, ease: 'easeOut' } }"
        >
          <p class="text-[0.7rem] sm:text-xs tracking-[0.35em] uppercase text-brand-nutmeg mb-3 font-semibold">
            MINDFUL LUXURY
          </p>
          <h2 class="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-earthen leading-tight mb-6">
            Dum with a <span class="text-[#885524]">Conscience</span>
          </h2>
          <p class="text-sm sm:text-base md:text-lg text-brand-nutmeg text-opacity-90 leading-relaxed mb-8 font-light">
            Art of Dum redefines fine dining by pairing opulent slow-cooked heritage with an uncompromising commitment to our planet. From hand-baked terracotta clay vessels to our zero-plastic delivery policy, every detail is mindfully chosen to honor the earth.
          </p>

          <!-- Feature Bullets -->
          <div class="space-y-6 text-left">
            <div
              v-for="feature in features"
              :key="feature.title"
              class="flex gap-4 items-start"
            >
              <!-- Icon Container -->
              <div class="flex-shrink-0 w-10 h-10 rounded-full border border-[#885524]/60 flex items-center justify-center bg-brand-sesame text-[#885524] shadow-sm">
                <component :is="feature.icon" class="w-5 h-5" />
              </div>
              <div>
                <h4 class="font-serif text-lg font-bold text-brand-earthen mb-1">
                  {{ feature.title }}
                </h4>
                <p class="text-xs sm:text-sm text-brand-nutmeg text-opacity-80 leading-relaxed">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side: Graphic Layered Images -->
        <div
          class="flex-1 w-full max-w-lg lg:max-w-xl mx-auto"
          v-motion
          :initial="{ opacity: 0, x: 40 }"
          :visibleOnce="{ opacity: 1, x: 0, transition: { duration: 900, ease: 'easeOut', delay: 150 } }"
        >
          <div class="relative w-full aspect-[4/3] max-w-md mx-auto lg:max-w-none">
            <!-- Back image (Clay Handis) -->
            <div class="absolute top-0 right-4 w-[85%] h-[80%] overflow-hidden border border-brand-nutmeg/15 shadow-lg image-card bg-brand-sesame">
              <img
                src="https://images.pexels.com/photos/886521/pexels-photo-886521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Clay Handi Cooking"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <!-- Front overlapping image (Glass Jars/Sustainability packaging) -->
            <div class="absolute bottom-0 left-0 w-[80%] h-[78%] overflow-hidden border border-brand-gold/25 shadow-2xl image-card bg-brand-sesame">
              <img
                src="https://images.pexels.com/photos/3730760/pexels-photo-3730760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Eco-friendly Packaging"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { h } from 'vue'

// Custom inline SVG icons for features to avoid dependency clutter
const LeafIcon = () =>
  h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor', class: 'w-5 h-5' }, [
    h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21V9.75M20.716 14.253a8.99 8.99 0 00-6.966-6.967M3.284 14.253a8.99 8.99 0 016.966-6.967M20.716 14.253L12 9.75M3.284 14.253L12 9.75M13.784 7.286c.007-.123.016-.246.02-.369A3.376 3.376 0 0012 3.375a3.375 3.375 0 00-1.804 3.542c.004.123.013.246.02.369' })
  ])

const FlameIcon = () =>
  h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor', class: 'w-5 h-5' }, [
    h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z' }),
    h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z' })
  ])

const ShieldIcon = () =>
  h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', strokeWidth: '1.5', stroke: 'currentColor', class: 'w-5 h-5' }, [
    h('path', { strokeLinecap: 'round', strokeLinejoin: 'round', d: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z' })
  ])

const features = [
  {
    title: 'Clay Handi Cooking',
    description: 'Every single Biryani is prepared and delivered in traditional custom-crafted terracotta pots, preserving the authentic wood-fired flavor.',
    icon: FlameIcon
  },
  {
    title: 'Zero Plastic Packaging',
    description: 'We adhere strictly to a zero-plastic delivery policy, utilizing high-quality paper board, cotton threads, and clay vessels.',
    icon: LeafIcon
  },
  {
    title: 'Premium Glass Jars',
    description: 'Curries, gravies, and desserts are stored and sealed in reusable, luxury glass jars to retain heat and purity.',
    icon: ShieldIcon
  }
]
</script>

<style scoped>
.image-card {
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.6s ease;
}

.image-card:hover {
  transform: translateY(-5px) scale(1.01);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
}
</style>
