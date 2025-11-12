<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import featureSteakImage from '../1 (5).png'
import finishedSteakImage from '../2.png'

const sectionRef = ref<HTMLElement | null>(null)
const overlayRef = ref<HTMLElement | null>(null)
const isEnhanced = ref(false)

const featureCopy = {
  title: 'A MASTERPIECE OF STEAK',
  body: `Unlocking the flavour of steak is an art. It requires perfection, passion, and precision.
It is about crafting the entire experience - one that's delicate, yet strong,
sensational, artisan, local yet global.`,
  rawImage: featureSteakImage,
  cookedImage: finishedSteakImage
}

let timeline: gsap.core.Timeline | null = null

onMounted(() => {
  if (!sectionRef.value || !overlayRef.value) return

  timeline = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top top',
      end: '+=900',
      scrub: true,
      pin: true,
      anticipatePin: 1
    }
  })

  timeline.fromTo(
    overlayRef.value,
    { clipPath: 'inset(0 100% 0 0)' },
    { clipPath: 'inset(0 0% 0 0)', ease: 'none' }
  )

  isEnhanced.value = true
})

onUnmounted(() => {
  timeline?.kill()
  timeline = null
})
</script>

<template>
  <section
    ref="sectionRef"
    class="scroll-ani-section"
    :class="{ 'scroll-ani--enhanced': isEnhanced }"
    aria-label="Crafted cuts showcase"
  >
    <div class="scroll-ani-viewport">
      <div class="scroll-ani-visual">
        <img
          class="scroll-ani-image"
          :src="featureCopy.rawImage"
          :alt="featureCopy.title"
          loading="lazy"
        />

        <span ref="overlayRef" class="scroll-ani-overlay" aria-hidden="true">
          <img
            class="scroll-ani-overlay-image"
            :src="featureCopy.cookedImage"
            :alt="`${featureCopy.title} finished steak`"
            loading="lazy"
          />
          <span class="scroll-ani-divider" />
        </span>
      </div>

      <div class="scroll-ani-text">
        <h1 class="scroll-ani-heading">{{ featureCopy.title }}</h1>
        <p class="scroll-ani-body">
          {{ featureCopy.body }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scroll-ani-section {
  position: relative;
  padding: 4rem 1.5rem;
  background: #000;
  color: #fff;
  scrollbar-color: orangered gainsboro;
  isolation: isolate;
}

.scroll-ani-section::-webkit-scrollbar {
  width: 0.75em;
}

.scroll-ani-section::-webkit-scrollbar-track {
  background: grey;
}

.scroll-ani-section::-webkit-scrollbar-thumb {
  background: orange;
}

.scroll-ani-viewport {
  position: relative;
  height: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.scroll-ani-visual {
  position: relative;
  width: min(80vw, 620px);
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4));
  z-index: 1;
}

.scroll-ani-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.scroll-ani-overlay {
  position: absolute;
  inset: 0;
  background: #fff;
  clip-path: inset(0 100% 0 0);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;
}

.scroll-ani-overlay-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.scroll-ani-text {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  margin-top: 3rem;
}

.scroll-ani-divider {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 3px;
  background: linear-gradient(180deg, transparent, #fff, transparent);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);
}

.scroll-ani-heading {
  margin: 0;
  text-align: center;
  color: #fff;
  font-family: 'Playfair Display', 'Times New Roman', serif;
  font-size: clamp(1.5rem, 4vw, 3.25rem);
  line-height: 1;
  letter-spacing: 0.08em;
}

.scroll-ani-body {
  margin: 0 auto;
  max-width: 45rem;
  color: #fff;
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.6;
  white-space: pre-line;
}

kbd,
code {
  padding: 2px;
  background: hsla(0, 0%, 0%, 0.35);
  font-family: 'Ubuntu Mono', Consolas, Monaco, monospace;
  font-size: 1.1em;
  line-height: 1.2;
}
</style>
