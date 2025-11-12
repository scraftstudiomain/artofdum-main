<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Using images from HorizontalGallery (excluding image 1)
const galleryImage2 = 'https://images.pexels.com/photos/2092916/pexels-photo-2092916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
const galleryImage3 = 'https://images.pexels.com/photos/941864/pexels-photo-941864.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
const galleryImage4 = 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
const galleryImage5 = 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const heroRef = ref<HTMLElement | null>(null)
const overlayCopyRef = ref<HTMLElement | null>(null)
const leftColumnRef = ref<HTMLElement | null>(null)
const rightColumnRef = ref<HTMLElement | null>(null)
const isEnhanced = ref(false)
const activeSlide = ref(0)

const heroCopy = {
  eyebrow: 'OUR IMPACT',
  title: 'We envision realities, move worlds and create the future',
  description:
    "We choreograph cinematic experiences for visionary brands. Inside the lens we find clarity, emotion and momentum so the audience can't look away.",
  ctaLabel: 'EXPLORE SERVICES'
}

const detailCopy = {
  left: `We craft visual stories that shift perspectives and celebrate the craft behind every scene. \
From concept to delivery we partner with architects, filmmakers and hospitality icons to build sensations that last.`,
  highlights: [
    'Authentic age-old recipes',
    'Slow-cooked, never rushed',
    'Sustainable packaging, zero plastic',
    'Multi-award-winning cloud kitchen'
  ]
}

const sliderImages = [
  { id: 0, src: galleryImage2, caption: 'Gallery image 2' },
  { id: 1, src: galleryImage3, caption: 'Gallery image 3' },
  { id: 2, src: galleryImage4, caption: 'Gallery image 4' },
  { id: 3, src: galleryImage5, caption: 'Gallery image 5' }
]

let sliderTimer: number | null = null
let timeline: gsap.core.Timeline | null = null

const startSlider = () => {
  stopSlider()
  sliderTimer = window.setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % sliderImages.length
  }, 4500)
}

const stopSlider = () => {
  if (!sliderTimer) return
  window.clearInterval(sliderTimer)
  sliderTimer = null
}

onMounted(() => {
  startSlider()

  if (!sectionRef.value) return

  const prefersDesktopLayout = window.matchMedia('(min-width: 1024px)').matches
  const finalScale = prefersDesktopLayout ? 0.35 : 0.7

  timeline = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top top',
      end: '+=180%',
      scrub: true,
      pin: true
    }
  })

  if (heroRef.value) {
    timeline.fromTo(
      heroRef.value,
      { scale: 1, borderRadius: '0px', yPercent: 0 },
      { scale: finalScale, borderRadius: '32px', yPercent: -4, ease: 'power2.out' },
      0
    )
  }

  if (overlayCopyRef.value) {
    timeline.fromTo(
      overlayCopyRef.value,
      { opacity: 1, yPercent: 0 },
      { opacity: 0, yPercent: -20, ease: 'power1.out' },
      0.1
    )
  }

  if (leftColumnRef.value) {
    timeline.fromTo(
      leftColumnRef.value,
      { opacity: 0, xPercent: -20, yPercent: 15 },
      { opacity: 1, xPercent: 0, yPercent: 0, ease: 'power2.out' },
      0.45
    )
  }

  if (rightColumnRef.value) {
    timeline.fromTo(
      rightColumnRef.value,
      { opacity: 0, xPercent: 20, yPercent: 15 },
      { opacity: 1, xPercent: 0, yPercent: 0, ease: 'power2.out' },
      0.55
    )
  }

  isEnhanced.value = true
})

onUnmounted(() => {
  stopSlider()
  timeline?.kill()
  timeline = null
})
</script>

<template>
  <section
    ref="sectionRef"
    class="scroll-parallax"
    :class="{ 'scroll-parallax--ready': isEnhanced }"
    aria-label="Scroll driven studio impact reel"
  >
    <div class="parallax-stage">
      <div ref="heroRef" class="hero-frame">
        <div class="hero-slider">
          <div
            v-for="slide in sliderImages"
            :key="slide.id"
            class="hero-slide"
            :class="{ 'is-active': slide.id === activeSlide }"
          >
            <img :src="slide.src" :alt="slide.caption" loading="lazy" draggable="false" />
          </div>
        </div>

        <div ref="overlayCopyRef" class="hero-overlay" aria-hidden="true">
          <p class="eyebrow">
            <span class="eyebrow-square" /> {{ heroCopy.eyebrow }}
          </p>
          <h2>{{ heroCopy.title }}</h2>
          <p class="hero-subcopy">
            {{ heroCopy.description }}
          </p>
          <a class="cta-link" href="#services">↳ {{ heroCopy.ctaLabel }}</a>
        </div>

        <div class="slider-progress" role="presentation">
          <span
            v-for="slide in sliderImages"
            :key="`progress-${slide.id}`"
            class="progress-dot"
            :class="{ 'is-active': slide.id === activeSlide }"
          />
        </div>
      </div>

      <div class="parallax-columns" aria-hidden="false">
        <article ref="leftColumnRef" class="column column--left">
          <p class="eyebrow">
            <span class="eyebrow-square" /> {{ heroCopy.eyebrow }}
          </p>
          <h3>{{ heroCopy.title }}</h3>
          <p class="column-body">
            {{ detailCopy.left }}
          </p>
          <a class="cta-link" href="#services">↳ {{ heroCopy.ctaLabel }}</a>
        </article>

        <article ref="rightColumnRef" class="column column--right">
          <ul class="highlight-list">
            <li v-for="(highlight, index) in detailCopy.highlights" :key="index" class="highlight-card">
              <span class="highlight-icon" aria-hidden="true" />
              <span class="highlight-text">{{ highlight }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scroll-parallax {
  position: relative;
  min-height: 100vh;
  background: transparent;
  color: #1a1a1a;
  overflow: hidden;
}

.parallax-stage {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  isolation: isolate;
}

.hero-frame {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  overflow: hidden;
  transform-origin: center;
  will-change: transform;
}

.hero-slider {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hero-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: scale(1.08);
  transition: opacity 1.2s ease, transform 1.2s ease;
}

.hero-slide.is-active {
  opacity: 1;
  transform: scale(1);
}

.hero-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(1.5rem, 5vw, 4rem);
  gap: 1.25rem;
  background: linear-gradient(180deg, transparent 20%, rgba(0, 0, 0, 0.6) 100%);
  pointer-events: none;
}

.hero-overlay .eyebrow {
  color: #8b6914;
}

.hero-overlay .eyebrow-square {
  background: #d4af37;
}

.hero-overlay h2 {
  max-width: 28rem;
  font-size: clamp(2rem, 5vw, 4.25rem);
  font-weight: 500;
  line-height: 1;
  margin: 0;
  color: #1a1a1a;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8);
}

.hero-overlay .cta-link {
  color: #8b6914;
}

.hero-overlay .cta-link:hover {
  color: #d4af37;
}

.hero-subcopy {
  margin: 0;
  max-width: 26rem;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(26, 26, 26, 0.9);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6);
}

.parallax-columns {
  position: absolute;
  inset: 0;
  padding: clamp(1rem, 4vw, 4rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(2rem, 4vw, 6rem);
  pointer-events: none;
}

.column {
  flex: 0 0 24rem;
  max-width: 26rem;
  opacity: 0;
  pointer-events: auto;
}

.column--right {
  text-align: left;
}

.highlight-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.highlight-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1.25rem;
  border: 2px solid #d4af37;
  background: rgba(212, 175, 55, 0.15);
  backdrop-filter: blur(5px);
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  position: relative;
}

.highlight-card::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, #d4af37, #f4d03f, #d4af37);
  z-index: -1;
  opacity: 0.3;
  filter: blur(4px);
}

.highlight-icon {
  width: 0.8rem;
  height: 0.8rem;
  border: 2px solid #d4af37;
  background: linear-gradient(135deg, #d4af37, #f4d03f);
  transform: rotate(45deg);
  display: inline-block;
  flex-shrink: 0;
  box-shadow: 0 0 8px rgba(212, 175, 55, 0.6);
}

.highlight-text {
  color: #1a1a1a;
  font-weight: 500;
}

.column h3 {
  font-size: clamp(2rem, 4vw, 3.35rem);
  line-height: 1.05;
  margin: 0 0 1.25rem;
  color: #1a1a1a;
}

.column-body {
  margin: 0 0 1.25rem;
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(26, 26, 26, 0.85);
}

.eyebrow {
  letter-spacing: 0.3em;
  text-transform: uppercase;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #8b6914;
  margin: 0;
}

.eyebrow-square {
  width: 0.55rem;
  height: 0.55rem;
  background: #d4af37;
  display: inline-block;
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.85rem;
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.35rem;
  width: fit-content;
  transition: color 0.3s ease;
  pointer-events: auto;
  color: #8b6914;
}

.cta-link:hover {
  color: #d4af37;
}

.slider-progress {
  position: absolute;
  bottom: clamp(1rem, 3vw, 2rem);
  right: clamp(1rem, 3vw, 2.5rem);
  display: flex;
  gap: 0.35rem;
}

.progress-dot {
  width: 38px;
  height: 2px;
  background: rgba(26, 26, 26, 0.4);
  transition: background 0.4s ease;
}

.progress-dot.is-active {
  background: #d4af37;
  box-shadow: 0 0 4px rgba(212, 175, 55, 0.6);
}

.scroll-parallax::after {
  content: '';
  position: absolute;
  inset: 0;
  background: transparent;
  pointer-events: none;
}

@media (max-width: 1024px) {
  .parallax-columns {
    display: none;
  }

  .hero-frame {
    width: 100%;
    height: 100%;
  }

  .hero-overlay h2 {
    max-width: 90%;
    font-size: clamp(2rem, 8vw, 3rem);
  }
}

@media (max-width: 640px) {
  .hero-overlay {
    gap: 1rem;
  }

  .cta-link {
    letter-spacing: 0.12em;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-slide {
    transition-duration: 0.01ms;
  }
}
</style>
