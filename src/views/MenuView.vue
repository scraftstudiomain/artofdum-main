<script setup lang="ts">
import { menu } from '../data/menu';
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
        <h1 class="font-serif text-5xl md:text-7xl font-bold text-text">A Royal Feast</h1>
        <p class="mt-4 text-lg text-text-muted max-w-3xl mx-auto">An ode to the culinary traditions of Indian royalty, where every dish is a masterpiece of flavor and finesse.</p>
      </div>

      <div class="space-y-20 max-w-4xl mx-auto">
        <!-- Starters -->
        <div v-motion-fade-visible-once>
          <div class="text-center mb-8">
            <h2 class="font-serif text-4xl text-gold mb-4">Starters</h2>
            <DecorativeDivider />
          </div>
          <div class="flex flex-col gap-y-8">
            <div 
              v-for="(item, index) in menu.starters" 
              :key="item.id"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 100 + index * 100 } }"
            >
              <div class="flex justify-between items-baseline">
                <div class="flex items-center gap-x-4">
                  <DiamondIcon class="w-2.5 h-2.5 text-gold flex-shrink-0 mt-1" />
                  <h3 class="font-serif text-xl text-text">{{ item.name }}</h3>
                </div>
                <div class="flex-1 h-px overflow-hidden mx-4">
                  <div 
                    class="border-b border-dotted border-white/20 w-full"
                    v-motion
                    :initial="{ x: '-101%' }"
                    :visible-once="{ x: 0, transition: { duration: 800, ease: 'easeOut', delay: 300 + index * 100 } }"
                  ></div>
                </div>
                <p class="text-xl text-text-muted">${{ item.price.toFixed(2) }}</p>
              </div>
              <p class="text-text-muted mt-2 text-sm pl-8">{{ item.description }}</p>
            </div>
          </div>
        </div>

        <!-- Mains -->
        <div v-motion-fade-visible-once>
          <div class="text-center mb-8">
            <h2 class="font-serif text-4xl text-gold mb-4">Mains</h2>
            <DecorativeDivider />
          </div>
          <div class="flex flex-col gap-y-8">
            <div 
              v-for="(item, index) in menu.mains" 
              :key="item.id"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 100 + index * 100 } }"
            >
              <div class="flex justify-between items-baseline">
                 <div class="flex items-center gap-x-4">
                  <DiamondIcon class="w-2.5 h-2.5 text-gold flex-shrink-0 mt-1" />
                  <h3 class="font-serif text-xl text-text">{{ item.name }}</h3>
                </div>
                <div class="flex-1 h-px overflow-hidden mx-4">
                  <div 
                    class="border-b border-dotted border-white/20 w-full"
                    v-motion
                    :initial="{ x: '-101%' }"
                    :visible-once="{ x: 0, transition: { duration: 800, ease: 'easeOut', delay: 300 + index * 100 } }"
                  ></div>
                </div>
                <p class="text-xl text-text-muted">${{ item.price.toFixed(2) }}</p>
              </div>
              <p class="text-text-muted mt-2 text-sm pl-8">{{ item.description }}</p>
            </div>
          </div>
        </div>
        
        <!-- Desserts -->
        <div v-motion-fade-visible-once>
          <div class="text-center mb-8">
            <h2 class="font-serif text-4xl text-gold mb-4">Desserts</h2>
            <DecorativeDivider />
          </div>
          <div class="flex flex-col gap-y-8">
            <div 
              v-for="(item, index) in menu.desserts" 
              :key="item.id"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 100 + index * 100 } }"
            >
              <div class="flex justify-between items-baseline">
                 <div class="flex items-center gap-x-4">
                  <DiamondIcon class="w-2.5 h-2.5 text-gold flex-shrink-0 mt-1" />
                  <h3 class="font-serif text-xl text-text">{{ item.name }}</h3>
                </div>
                <div class="flex-1 h-px overflow-hidden mx-4">
                  <div 
                    class="border-b border-dotted border-white/20 w-full"
                    v-motion
                    :initial="{ x: '-101%' }"
                    :visible-once="{ x: 0, transition: { duration: 800, ease: 'easeOut', delay: 300 + index * 100 } }"
                  ></div>
                </div>
                <p class="text-xl text-text-muted">${{ item.price.toFixed(2) }}</p>
              </div>
              <p class="text-text-muted mt-2 text-sm pl-8">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
