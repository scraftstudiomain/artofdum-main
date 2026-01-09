<template>
  <div
    v-if="isLoading"
    class="loading-screen"
    ref="loadingScreen"
  >
    <!-- Video container - stays in center -->
    <div
      class="logo-container"
      ref="logoContainer"
    >
      <video
        ref="logo"
        class="logo"
        autoplay
        loop
        muted
        playsinline
        @loadedmetadata="onLoadedMetadata"
        @error="onVideoError"
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
const pageLoaded = ref(false)
const minTimeElapsed = ref(false)
const exitAnimationStarted = ref(false)

onMounted(() => {
  // Prevent body scroll during loading
  document.body.classList.add('loading')

  gsap.set(logo.value!, {
    scale: 1,
    opacity: 1
  })

  // Check if video metadata is already loaded (e.g. cached)
  if (logo.value && logo.value.readyState >= 1) {
    onLoadedMetadata()
  }

  // Safety timeout: Force exit after 8 seconds max
  setTimeout(() => {
    if (isLoading.value) {
      console.warn('Loading screen safety timeout triggered')
      minTimeElapsed.value = true
      pageLoaded.value = true
      checkExit()
    }
  }, 8000)

  // Check when page is loaded
  checkPageLoaded()
})

onUnmounted(() => {
  // Re-enable body scroll
  document.body.classList.remove('loading')
})

const onVideoError = () => {
  console.error('Video failed to load')
  minTimeElapsed.value = true
  checkExit()
}

const onLoadedMetadata = () => {
  if (logo.value && !minTimeElapsed.value) {
    const duration = logo.value.duration * 1000 // Convert to ms
    // Subtract a small buffer to ensure we trigger just before the loop restart if possible
    setTimeout(() => {
      minTimeElapsed.value = true
      checkExit()
    }, duration - 100)
  }
}

const checkPageLoaded = () => {
  const checkComplete = () => {
    // Wait for all images to load
    const images = document.querySelectorAll('img')
    const imagePromises = Array.from(images).map(img => {
      return new Promise<void>((imgResolve) => {
        if (img.complete) {
          imgResolve()
        } else {
          img.onload = () => imgResolve()
          img.onerror = () => imgResolve() // Resolve even if image fails to load
        }
      })
    })

    Promise.all(imagePromises).then(() => {
      pageLoaded.value = true
      checkExit()
    })
  }

  if (document.readyState === 'complete') {
    checkComplete()
  } else {
    window.addEventListener('load', checkComplete)
  }
}

const checkExit = () => {
  if (pageLoaded.value && minTimeElapsed.value && !exitAnimationStarted.value) {
    startExitAnimation()
  }
}

const startExitAnimation = () => {
  exitAnimationStarted.value = true
  
  // Signal that transition is starting so main content can be revealed behind
  emit('transition-start')
  
  const tl = gsap.timeline({
    onComplete: () => {
      isLoading.value = false
      // Re-enable body scroll when loading is complete
      document.body.classList.remove('loading')
      emit('loading-complete')
    }
  })

  // Slide up video container
  tl.to(logoContainer.value!, {
    y: "-100%",
    duration: 1.5,
    ease: "power2.out"
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
  background-color: transparent;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.logo-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>