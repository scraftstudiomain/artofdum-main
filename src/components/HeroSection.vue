<script setup lang="ts">
// No scroll animations - keeping logo static and centered
</script>

<template>
  <section class="relative h-screen w-full flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 z-0">
      <video 
        class="w-full h-full object-cover"
        poster="/images/hero-poster.jpg"
        src="/videos/Video.mp4"
        autoplay
        loop
        muted
        playsinline
        preload="metadata"
      ></video>
      <div class="absolute inset-0 bg-black/50"></div>
    </div>
    
    <!-- Hero Logo: centered and static -->
    <div class="relative z-10 flex items-center justify-center">
      <img 
        src="/images/your-logo.png" 
        alt="Art of Dum" 
        loading="eager"
        decoding="sync"
        class="h-56 w-56 md:h-64 md:w-64 lg:h-72 lg:w-72 block" 
      />
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
      <div class="w-6 h-10 border-2 border-text-muted flex justify-center items-start p-1">
        <div class="w-1 h-2 bg-text-muted animate-bounce"></div>
      </div>
    </div>
  </section>
</template>
