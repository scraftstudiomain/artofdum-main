<script setup lang="ts">
import DecorativeDivider from './icons/DecorativeDivider.vue';
import { ArrowUpRight } from 'lucide-vue-next';

const partners = [
  { name: 'Noon', link: '#' },
  { name: 'Talabat', link: '#' },
  { name: 'Careem', link: '#' },
  { name: 'Zomato', link: '#' },
];
</script>

<template>
  <section class="py-20 sm:py-24 bg-background">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div 
        class="text-center mb-12"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 1000, ease: 'easeOut' } }"
      >
        <h2 class="font-serif text-4xl md:text-5xl text-gold">Order Via</h2>
        <DecorativeDivider />
      </div>

      <div 
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
      >
        <a
          v-for="(partner, index) in partners"
          :key="partner.name"
          :href="partner.link"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative block p-10 text-center bg-transparent border border-white/10 overflow-hidden transition-all duration-300 ease-in-out hover:border-gold/50"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut', delay: 200 + index * 100 } }"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="absolute top-0 left-0 w-1/2 h-1/2 bg-gold/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative flex flex-col items-center justify-center h-full">
            <span class="font-serif text-3xl text-text-muted group-hover:text-gold transition-colors duration-300">{{ partner.name }}</span>
            <div class="absolute top-4 right-4 text-text-muted/50 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300">
              <ArrowUpRight class="w-5 h-5" />
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
