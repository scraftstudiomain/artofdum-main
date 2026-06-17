<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const repeatedText = 'Intimate - Heritage - Opulent - Immersive - Captivating - Grounded • '.repeat(30);

const svgWrapperRef = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const animationOffset = ref(0);
const scrollOffsetAddition = ref(0);

const LOOP_RANGE = 40;
const LOOP_DURATION = 24; // Slow, premium auto-scrolling speed
const AUTO_SPEED = -(LOOP_RANGE / LOOP_DURATION);

let animationFrameId: number | null = null;
let lastTimestamp: number | null = null;
let pointerStartX = 0;
let dragStartOffset = 0;
let scrollTriggerInstance: ScrollTrigger | null = null;

const normalizeOffset = (value: number) => {
  const range = LOOP_RANGE;
  let normalized = value;

  while (normalized < -range) {
    normalized += range;
  }

  while (normalized > 0) {
    normalized -= range;
  }

  return normalized;
};

// Combines the continuous auto-scrolling with the scroll-tied parallax offset
const textPathOffset = computed(() => {
  const totalOffset = animationOffset.value + scrollOffsetAddition.value;
  return `${normalizeOffset(totalOffset)}%`;
});

const animate = (timestamp: number) => {
  if (isDragging.value) {
    lastTimestamp = timestamp;
    animationFrameId = requestAnimationFrame(animate);
    return;
  }

  if (lastTimestamp !== null) {
    const deltaSeconds = (timestamp - lastTimestamp) / 1000;
    const next = animationOffset.value + AUTO_SPEED * deltaSeconds;
    animationOffset.value = normalizeOffset(next);
  }

  lastTimestamp = timestamp;
  animationFrameId = requestAnimationFrame(animate);
};

const handlePointerDown = (event: PointerEvent) => {
  isDragging.value = true;
  pointerStartX = event.clientX;
  dragStartOffset = animationOffset.value;
  lastTimestamp = null;
};

const handlePointerMove = (event: PointerEvent) => {
  if (!isDragging.value) {
    return;
  }

  const wrapperWidth = svgWrapperRef.value?.offsetWidth ?? window.innerWidth;
  const deltaX = event.clientX - pointerStartX;
  const deltaPercent = (deltaX / wrapperWidth) * LOOP_RANGE;
  animationOffset.value = normalizeOffset(dragStartOffset + deltaPercent);
};

const stopDragging = () => {
  if (!isDragging.value) {
    return;
  }

  isDragging.value = false;
  lastTimestamp = null;
};

onMounted(() => {
  animationFrameId = requestAnimationFrame(animate);
  window.addEventListener('pointermove', handlePointerMove);
  window.addEventListener('pointerup', stopDragging);
  window.addEventListener('pointercancel', stopDragging);

  // Animate the text offset based on viewport scroll progress
  if (svgWrapperRef.value) {
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: svgWrapperRef.value,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2, // Buttery smooth lag for parallax gliding
      onUpdate: (self) => {
        // Shift text path offset by up to 25% based on scroll progress
        scrollOffsetAddition.value = self.progress * -25;
      }
    });
  }
});

onBeforeUnmount(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
  }
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
  }
  window.removeEventListener('pointermove', handlePointerMove);
  window.removeEventListener('pointerup', stopDragging);
  window.removeEventListener('pointercancel', stopDragging);
});
</script>

<template>
  <div class="view-menu-text-path-container">
    <div
      ref="svgWrapperRef"
      class="svg-wrapper"
      v-motion
      :initial="{ opacity: 0, y: 60, scale: 0.98 }"
      :visibleOnce="{ opacity: 1, y: 0, scale: 1, transition: { duration: 1100, ease: 'easeOut' } }"
      :class="{ dragging: isDragging }"
      @pointerdown="handlePointerDown"
    >
      <svg
        class="text-path-svg"
        viewBox="0 0 1920 160"
        preserveAspectRatio="xMidYMid meet"
        role="presentation"
        aria-hidden="true"
      >
        <defs>
          <path
            id="view-menu-curve"
            d="M0,80 C240,30 480,30 720,80
               S1200,130 1440,80
               S1680,30 1920,80"
            fill="none"
          />
        </defs>

        <text>
          <textPath
            href="#view-menu-curve"
            :startOffset="textPathOffset"
            dominant-baseline="middle"
            class="text-path"
          >
            {{ repeatedText }}
          </textPath>
        </text>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.view-menu-text-path-container {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.svg-wrapper {
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 2.5rem 0 4.5rem 0; /* Compact padding */
  cursor: grab;
  user-select: none;
  touch-action: none;
  transition: transform 0.2s ease;
}

.svg-wrapper.dragging {
  cursor: grabbing;
}

.text-path-svg {
  display: block;
  width: 100%;
  height: auto;
}

.text-path {
  font-family: 'Bagatela', serif !important; /* Premium brand serif font */
  font-size: clamp(1.2rem, 1.6vw, 1.6rem); /* Perfectly balanced desktop size */
  fill: #4e3b2d; /* Elegant theme dark brown */
  white-space: nowrap;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.22em; /* Sophisticated spacing */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .view-menu-text-path-container {
    margin-top: -1.5rem;
  }

  .svg-wrapper {
    padding-bottom: 2.5rem;
    touch-action: pan-y;
  }

  .text-path {
    font-size: clamp(1.05rem, 3.8vw, 1.25rem); /* Scaled down slightly for tablets */
    letter-spacing: 0.18em;
  }
}

@media (max-width: 480px) {
  .view-menu-text-path-container {
    margin-top: -1rem;
  }

  .svg-wrapper {
    padding-bottom: 2rem;
  }

  .text-path {
    font-size: clamp(1rem, 4.5vw, 1.15rem); /* Clear and readable on mobile */
  }
}
</style>
