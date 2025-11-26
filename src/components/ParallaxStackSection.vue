<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import bgImage from '../011-01.png'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref<HTMLElement | null>(null)
const slidesWrapperRef = ref<HTMLElement | null>(null)

const slides = [
  {
    id: 1,
    titleLine1: 'WE CREATE',
    titleLine2: 'BRAND MOMENTS THAT EARN ATTENTION.',
    body: `People won’t take notice unless you give them a genuine reason to. From identity to campaigns, we cut through the noise to earn lasting cultural relevance.`,
    image:
      'https://images.pexels.com/photos/5531525/pexels-photo-5531525.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  {
    id: 2,
    titleLine1: 'WE DESIGN',
    titleLine2: 'PLACES THAT DRAW PEOPLE IN & KEEP THEM COMING BACK.',
    body: `Venues that make an impact have a story to tell. From hotels to restaurants to bars, we craft experiences that stay with people.`,
    image:
      'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  {
    id: 3,
    titleLine1: 'WE SHAPE',
    titleLine2: 'PLACE CULTURE THAT KEEPS DESTINATIONS RELEVANT.',
    body: `Places that last offer more than just a service. We shape the culture of destinations so every moment feels considered and memorable.`,
    image:
      'https://images.pexels.com/photos/3771839/pexels-photo-3771839.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  {
    id: 4,
    titleLine1: 'WE AMPLIFY',
    titleLine2: 'EXPERIENCES THAT DRIVE INFLUENCE AND DEMAND.',
    body: `From PR to partnerships, we choreograph experiences that take brands to the forefront of their industry.`,
    image:
      'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1600'
  }
]

let scrollTrigger: ScrollTrigger | null = null
let ctx: gsap.Context

onMounted(() => {
  if (!sectionRef.value || !slidesWrapperRef.value) return

  ctx = gsap.context(() => {
    const cards = gsap.utils.toArray('.stack-slide') as HTMLElement[]
    const totalScroll = window.innerHeight * 3 // Adjust for scroll length

    // Initial state: cards are stacked but potentially off-screen or positioned
    // We want a "stacking" effect where they slide on top of each other.
    // Actually, a nice stack effect is:
    // Card 1 is there.
    // Card 2 slides up over Card 1.
    // Card 3 slides up over Card 2.
    // etc.
    
    // Set initial z-indices
    cards.forEach((card, i) => {
      card.style.zIndex = (i + 1).toString()
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: `+=${totalScroll}`,
        pin: true,
        scrub: 1, // Smooth scrubbing
        anticipatePin: 1,
      }
    })

    // Animate cards 2, 3, 4 sliding up
    // We skip the first card as it's already "there" (or we can animate it too if we want)
    // Let's keep card 1 static, and slide others on top.
    
    cards.forEach((card, i) => {
      if (i === 0) return // Skip first card

      tl.fromTo(card, 
        { 
          yPercent: 100,
          scale: 0.9 + (i * 0.02) // Slight scale difference for depth before entering
        },
        {
          yPercent: 0, // Slide to natural position (which is absolute inset 0)
          scale: 1,
          ease: 'none',
          duration: 1
        }
      )
      
      // Optional: Parallax/Scale effect for the card *below* the current one
      // When card i enters, card i-1 could scale down slightly or darken
      if (i > 0) {
        tl.to(cards[i-1], {
          scale: 0.95,
          filter: 'brightness(0.8)',
          duration: 1,
          ease: 'none'
        }, "<") // Run at same time as card i entering
      }
    })

  }, sectionRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section
    ref="sectionRef"
    class="stack-section"
    aria-label="Parallax stack story"
    :style="{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }"
  >
    <div class="stack-inner">
      <div ref="slidesWrapperRef" class="stack-wrapper">
        <article
          v-for="slide in slides"
          :key="slide.id"
          class="stack-slide"
        >
          <div class="stack-slide-inner">
            <div class="stack-left">
              <header class="stack-header">
                <p class="stack-label">WHAT WE DO</p>
              </header>

              <h2 class="stack-title">
                <span>{{ slide.titleLine1 }}</span>
                <span>{{ slide.titleLine2 }}</span>
              </h2>

              <p class="stack-body">
                {{ slide.body }}
              </p>
            </div>

            <div class="stack-right">
              <div class="stack-image-frame">
                <img :src="slide.image" alt="" loading="lazy" />
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
@property --border-angle {
  syntax: "<angle>";
  inherits: true;
  initial-value: 0turn;
}

.stack-section {
  position: relative;
  min-height: 100vh;
  color: #111111;
  overflow: hidden;
}

.stack-inner {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: clamp(1.5rem, 4vw, 3rem);
}

.stack-wrapper {
  position: relative;
  width: 100%;
  max-width: 1440px;
  height: min(80vh, 720px);
}

.stack-slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: stretch;
  justify-content: center;
  transform-origin: center;
  /* Animated border setup (similar to review-card-box) */
  --border-angle: 0turn;
  --gold-color: #c9a974;
  --gold-dark: #b8955f;
  --gold-light: #d4b888;

  background-color: #ffffff;
  border: solid 2px transparent;
  overflow: hidden;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);

  --gradient-border: conic-gradient(
    from var(--border-angle),
    transparent 20%,
    var(--gold-light),
    var(--gold-color),
    var(--gold-dark),
    var(--gold-color),
    var(--gold-light),
    transparent 99%
  );

  background-image: var(--gradient-border);
  background-clip: border-box;
  background-origin: border-box;

  /* Continuous spin animation */
  animation: stack-border-spin 5s linear infinite;
}

.stack-slide-inner {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.1fr);
  height: 100%;
}

.stack-slide::after {
  content: '';
  position: absolute;
  inset: 2px;
  background: #ffffff;
  pointer-events: none;
  z-index: 0;
}

.stack-slide-inner > * {
  position: relative;
  z-index: 1;
}

@keyframes stack-border-spin {
  to {
    --border-angle: 1turn;
  }
}

.stack-left {
  padding: clamp(2rem, 4vw, 3rem);
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centered vertically since list is gone */
  gap: 1.75rem;
}

.stack-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 0.75rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #8b6914;
}

.stack-label {
  opacity: 0.9;
}

.stack-title {
  font-size: clamp(2.4rem, 3vw, 2.8rem);
  font-weight: 800;
  line-height: 1.04;
  text-transform: uppercase;
  margin: 0.5rem 0 1rem;
}

.stack-title span {
  display: block;
}

.stack-body {
  max-width: 28rem;
  font-size: 1.05rem; /* Slightly larger for better readability */
  line-height: 1.7;
  color: #333333;
}

.stack-right {
  position: relative;
  background: #f5f5f5;
}

.stack-image-frame {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1.25rem;
}

.stack-image-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 1024px) {
  .stack-wrapper {
    height: min(82vh, 640px);
  }

  .stack-slide-inner {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.9fr);
  }
}

@media (max-width: 768px) {
  .stack-inner {
    padding-inline: 1rem;
  }

  .stack-wrapper {
    height: auto;
    min-height: 80vh;
  }

  .stack-slide-inner {
    grid-template-columns: 1fr;
    grid-template-rows: 200px 1fr;
  }

  .stack-right {
    display: block;
    order: -1; /* Image on top */
  }

  .stack-left {
    padding: 1.5rem;
    justify-content: flex-start;
  }

  .stack-title {
    font-size: clamp(1.8rem, 6vw, 2.4rem);
  }
}
</style>
