<template>
  <div
    v-if="isLoading"
    class="loading-screen"
    ref="loadingScreen"
  >
    <!-- Video container - stays in center, above doors -->
    <div
      class="logo-container"
      ref="logoContainer"
    >
      <video
        ref="logo"
        class="logo"
        autoplay
        muted
        playsinline
        @ended="onVideoEnded"
      >
        <source src="/video/loading video.mp4" type="video/mp4" />
      </video>
    </div>

    <!-- Left door panel -->
    <div
      class="door-panel left-door"
      ref="leftDoor"
    ></div>

    <!-- Right door panel -->
    <div
      class="door-panel right-door"
      ref="rightDoor"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const emit = defineEmits<{
  'loading-complete': []
}>()

const isLoading = ref(true)
const leftDoor = ref<HTMLElement>()
const rightDoor = ref<HTMLElement>()
const logo = ref<HTMLVideoElement>()
const videoEnded = ref(false)
const pageLoaded = ref(false)

onMounted(() => {
  // Prevent body scroll during loading
  document.body.classList.add('loading')

  // Initial setup - doors closed, video visible
  gsap.set([leftDoor.value!, rightDoor.value!], {
    x: 0
  })

  gsap.set(logo.value!, {
    scale: 1,
    opacity: 1
  })

  // Check when page is loaded
  checkPageLoaded()
})

onUnmounted(() => {
  // Re-enable body scroll
  document.body.classList.remove('loading')
})

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
      // Try to start the door animation if video has also ended
      tryStartDoorAnimation()
    })
  }

  if (document.readyState === 'complete') {
    checkComplete()
  } else {
    window.addEventListener('load', checkComplete)
  }
}

const onVideoEnded = () => {
  videoEnded.value = true
  // Try to start the door animation if page has also loaded
  tryStartDoorAnimation()
}

const tryStartDoorAnimation = () => {
  // Only start door animation when both video ended and page loaded
  if (!videoEnded.value || !pageLoaded.value) return

  const tl = gsap.timeline({
    onComplete: () => {
      isLoading.value = false
      // Re-enable body scroll when loading is complete
      document.body.classList.remove('loading')
      emit('loading-complete')
    }
  })

  // Small delay before door opening animation
  tl.to({}, { duration: 0.5 })

  // Door opening animation - doors slide apart like a real door
  .to(leftDoor.value!, {
    x: "-100%",
    duration: 2.5,
    ease: "power3.inOut"
  })
  .to(rightDoor.value!, {
    x: "100%",
    duration: 2.5,
    ease: "power3.inOut"
  }, "<")

  // Slide up video as doors open
  .to(logo.value!, {
    opacity: 0,
    y: "-100%",
    duration: 1.5,
    ease: "power2.out"
  }, "-=1.8")
}
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.door-panel {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  background-color: #000000;
  z-index: 2;
  border: none;
}

.left-door {
  left: 0;
  transform-origin: right center;
}

.right-door {
  left: 50%;
  transform-origin: left center;
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
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>