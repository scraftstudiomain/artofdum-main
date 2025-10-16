<script setup lang="ts">
defineProps<{ pageTitle: string }>();
</script>

<template>
  <div class="pt-32 pb-20 sm:pt-40 sm:pb-32 bg-background min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div 
        class="text-center"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
      >
        <h1 class="font-serif text-5xl md:text-7xl font-bold text-text">{{ pageTitle }}</h1>
        <p class="mt-4 text-lg text-text-muted max-w-2xl mx-auto">This page is currently under construction. Please check back soon for updates.</p>
        <router-link 
          to="/" 
          class="mt-8 inline-block font-sans font-medium tracking-widest uppercase text-sm border-b border-text text-text hover:border-gold hover:text-gold transition-colors"
        >
          Return to Home
        </router-link>
      </div>
    </div>
  </div>
</template>
