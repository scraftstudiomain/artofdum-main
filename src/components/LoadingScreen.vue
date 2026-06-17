<template>
  <div
    v-if="isLoading"
    class="loading-screen"
  >
    <div class="logo-container" ref="logoContainer">
      <video
        ref="logo"
        class="logo"
        autoplay
        muted
        playsinline
        @ended="onVideoEnded"
        @timeupdate="onTimeUpdate"
      >
        <source src="/video/loading video.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const emit = defineEmits<{
  'loading-complete': [],
  'transition-start': []
}>()

const isLoading = ref(true)
const logo = ref<HTMLVideoElement>()
const logoContainer = ref<HTMLElement>()
const hasPlayedOnce = ref(false)
const isLooping = ref(false)
const exitAnimationStarted = ref(false)

onMounted(() => {
  document.body.classList.add('loading')
  
  // Safety timeout
  setTimeout(() => {
    if (isLoading.value && !exitAnimationStarted.value) {
      console.warn('Loading screen safety timeout')
      hasPlayedOnce.value = true
      checkExit()
    }
  }, 15000)
})

onUnmounted(() => {
  document.body.classList.remove('loading')
})

const onVideoEnded = () => {
  if (!hasPlayedOnce.value) {
    // First playthrough completed
    hasPlayedOnce.value = true
    checkExit()
    
    // Start looping for subsequent plays
    if (logo.value && !exitAnimationStarted.value) {
      isLooping.value = true
      logo.value.loop = true
      logo.value.play().catch(() => {})
    }
  }
}

const onTimeUpdate = () => {
  // Check if video is near the end and has played once
  if (logo.value && hasPlayedOnce.value && !isLooping.value) {
    const timeRemaining = logo.value.duration - logo.value.currentTime
    if (timeRemaining < 0.1) {
      isLooping.value = true
      logo.value.loop = true
    }
  }
}

const checkExit = () => {
  if (hasPlayedOnce.value && !exitAnimationStarted.value) {
    // Wait a bit for page to be ready
    setTimeout(() => {
      if (!exitAnimationStarted.value) {
        startExitAnimation()
      }
    }, 500)
  }
}

const startExitAnimation = () => {
  if (exitAnimationStarted.value) return
  exitAnimationStarted.value = true
  
  // Emit transition start
  emit('transition-start')
  
  // Wait for 3 frames to ensure content is fully painted
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            isLoading.value = false
            document.body.classList.remove('loading')
            emit('loading-complete')
          }
        })

        tl.to(logoContainer.value!, {
          y: "-100%",
          duration: 1.5,
          ease: "power2.out"
        })
      })
    })
  })
}
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #0a0a0a;
}

.logo-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0a0a0a;
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>