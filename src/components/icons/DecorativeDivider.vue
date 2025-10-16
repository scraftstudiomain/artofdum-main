<script setup lang="ts"></script>
<template>
  <div class="w-48 h-auto mx-auto text-gold/80 my-4" role="separator" v-motion-fade-visible-once>
    <svg viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M0 10 H 80" 
        stroke="currentColor" 
        stroke-width="1"
        v-motion
        :initial="{ pathLength: 0, opacity: 0 }"
        :visible-once="{ pathLength: 1, opacity: 1, transition: { duration: 1, ease: 'easeOut' } }"
      />
      <path 
        d="M200 10 H 120" 
        stroke="currentColor" 
        stroke-width="1" 
        v-motion
        :initial="{ pathLength: 0, opacity: 0 }"
        :visible-once="{ pathLength: 1, opacity: 1, transition: { duration: 1, ease: 'easeOut' } }"
      />
      <g 
        v-motion
        :initial="{ scale: 0, opacity: 0 }"
        :visible-once="{ scale: 1, opacity: 1, transition: { delay: 0.5, duration: 0.5, ease: 'easeOut' } }"
      >
        <path d="M90 10 C 92.5 7.5, 97.5 7.5, 100 10" stroke="currentColor" stroke-width="0.5"/>
        <path d="M110 10 C 107.5 7.5, 102.5 7.5, 100 10" stroke="currentColor" stroke-width="0.5"/>
        <path d="M90 10 C 92.5 12.5, 97.5 12.5, 100 10" stroke="currentColor" stroke-width="0.5"/>
        <path d="M110 10 C 107.5 12.5, 102.5 12.5, 100 10" stroke="currentColor" stroke-width="0.5"/>
        <circle cx="100" cy="10" r="2.5" fill="currentColor" />
      </g>
    </svg>
  </div>
</template>
