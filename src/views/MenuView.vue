<script setup lang="ts">
import { menuCategories } from '../data/menu';
import DecorativeDivider from '../components/icons/DecorativeDivider.vue';
import DiamondIcon from '../components/icons/DiamondIcon.vue';
</script>

<template>
  <div class="pt-32 pb-20 sm:pt-40 sm:pb-32 bg-background">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div 
        class="text-center mb-16 sm:mb-24"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
      >
        <div class="text-gold text-2xl md:text-3xl font-decorative mb-4">Our Menu</div>
        <h1 class="font-serif text-5xl md:text-7xl font-bold text-text">A Royal Feast</h1>
        <p class="mt-4 text-lg text-text-muted max-w-3xl mx-auto">Step into a world where culinary tradition meets modern refinement. From copper tandoors to live Dum stations, every element is designed to enchant your senses.</p>
      </div>

      <div class="space-y-20 max-w-4xl mx-auto">
        <!-- Dynamic Categories -->
        <div
          v-for="(category, categoryIndex) in menuCategories"
          :key="category.id"
          v-motion-fade-visible-once
        >
          <div class="text-center mb-8">
            <h2 class="font-serif text-4xl text-gold mb-4">{{ category.name }}</h2>
            <DecorativeDivider />
          </div>
          <div class="flex flex-col gap-y-8">
            <div
              v-for="(item, index) in category.items"
              :key="item.id"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 100 + index * 50 } }"
            >
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 sm:gap-0">
                <div class="flex items-center gap-x-4">
                  <DiamondIcon class="w-2.5 h-2.5 text-gold flex-shrink-0 mt-1" />
                  <h3 class="font-serif text-xl text-text">{{ item.name }}</h3>
                </div>

              </div>
              <p class="text-text-muted mt-2 text-sm pl-6 sm:pl-8">{{ item.description }}</p>
              <p v-if="item.allergens" class="text-text-muted/70 mt-1 text-xs pl-6 sm:pl-8 italic">{{ item.allergens }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
