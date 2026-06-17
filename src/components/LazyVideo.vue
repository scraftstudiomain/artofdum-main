<template>
  <div ref="containerRef" class="w-full h-full relative bg-black/10">
    <video
      v-if="isIntersecting"
      ref="videoRef"
      :src="src"
      :poster="poster"
      class="w-full h-full object-cover"
      autoplay
      loop
      muted
      playsinline
    ></video>
    <!-- Show poster image as placeholder before video loads/intersects -->
    <img
      v-else-if="poster"
      :src="poster"
      class="w-full h-full object-cover"
      loading="lazy"
      decoding="async"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  src: string
  poster?: string
}>()

const containerRef = ref<HTMLElement>()
const videoRef = ref<HTMLVideoElement>()
const isIntersecting = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      isIntersecting.value = entry.isIntersecting
    },
    {
      rootMargin: '200px 0px', // Start loading when the video is 200px from the viewport
      threshold: 0.01,
    }
  )

  if (containerRef.value) {
    observer.observe(containerRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
