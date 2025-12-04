<template>
  <div
    v-if="isLoading"
    class="loading-screen"
    ref="loadingScreen"
  >
    <!-- Logo container - stays in center, above doors -->
    <div
      class="logo-container"
      ref="logoContainer"
    >
      <img
        :src="LogoImage"
        alt="Restaurant Logo"
        class="logo"
        ref="logo"
      />
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
import LogoImage from '../Art of Dum_Refined logos_Open_CTC Eng Gold H1.png'

const emit = defineEmits<{
  'loading-complete': []
}>()

const isLoading = ref(true)
const loadingScreen = ref<HTMLElement>()
const leftDoor = ref<HTMLElement>()
const rightDoor = ref<HTMLElement>()
const logoContainer = ref<HTMLElement>()
const logo = ref<HTMLElement>()

onMounted(() => {
  // Prevent body scroll during loading
  document.body.classList.add('loading')

  // Initial setup - doors closed, logo visible
  gsap.set([leftDoor.value!, rightDoor.value!], {
    x: 0
  })

  gsap.set(logo.value!, {
    scale: 1,
    opacity: 1
  })

  // Start the loading sequence
  startLoadingSequence()
})

onUnmounted(() => {
  // Re-enable body scroll
  document.body.classList.remove('loading')
})

const startLoadingSequence = () => {
  // Wait for page to be fully loaded before starting animation
  const checkPageLoaded = () => {
    return new Promise<void>((resolve) => {
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
          // Add extra delay to ensure everything is ready and create anticipation
          setTimeout(resolve, 3000)
        })
      }

      if (document.readyState === 'complete') {
        checkComplete()
      } else {
        window.addEventListener('load', checkComplete)
      }
    })
  }

  checkPageLoaded().then(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        isLoading.value = false
        // Re-enable body scroll when loading is complete
        document.body.classList.remove('loading')
        emit('loading-complete')
      }
    })

    // Logo animation sequence
    tl.to(logo.value!, {
      scale: 1.05,
      duration: 1.2,
      ease: "power2.out"
    })
    .to(logo.value!, {
      scale: 1,
      duration: 0.8,
      ease: "power2.inOut"
    })
    .to({}, { duration: 1.5 }) // Wait time

    // Door opening animation - doors slide apart like a real door
    .to(leftDoor.value!, {
      x: "-100%",
      duration: 2.5,
      ease: "power3.inOut"
    }, "-=1.0")
    .to(rightDoor.value!, {
      x: "100%",
      duration: 2.5,
      ease: "power3.inOut"
    }, "<")

    // Fade out logo as doors open
    .to(logo.value!, {
      opacity: 0,
      scale: 0.9,
      duration: 1.5,
      ease: "power2.out"
    }, "-=1.8")
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
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.logo {
  height: 14rem; /* h-56 */
  width: 14rem; /* w-56 */
  object-fit: contain;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.1));
  transition: filter 0.3s ease;
  animation: gold-pulse 2s infinite ease-in-out;
}

@keyframes gold-pulse {
  0% {
    filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 25px rgba(212, 175, 55, 0.8));
  }
  100% {
    filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.3));
  }
}

@media (min-width: 768px) {
  .logo {
    height: 16rem; /* md:h-64 */
    width: 16rem; /* md:w-64 */
  }
}

@media (min-width: 1024px) {
  .logo {
    height: 18rem; /* lg:h-72 */
    width: 18rem; /* lg:w-72 */
  }
}
</style>