<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

const repeatedText = 'Brand Pillars : Intimate - Heritage - Opulent - Immersive - Captivating - Grounded • '.repeat(30);

const svgWrapperRef = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const animationOffset = ref(0);

const LOOP_RANGE = 40;
const LOOP_DURATION = 18; // seconds that the original <animate> took to move 40%
const AUTO_SPEED = -(LOOP_RANGE / LOOP_DURATION);

let animationFrameId: number | null = null;
let lastTimestamp: number | null = null;
let pointerStartX = 0;
let dragStartOffset = 0;

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

const textPathOffset = computed(() => `${animationOffset.value}%`);

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
});

onBeforeUnmount(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
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
      :class="{ dragging: isDragging }"
      @pointerdown="handlePointerDown"
    >
      <svg
        class="text-path-svg"
        viewBox="0 0 1920 400"
        preserveAspectRatio="xMidYMid meet"
        role="presentation"
        aria-hidden="true"
      >
        <defs>
          <path
            id="view-menu-curve"
            d="M0,200 C240,40 480,40 720,200
               S1200,360 1440,200
               S1680,40 1920,200"
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
  padding: 0 0 15rem 0;
  cursor: grab;
  user-select: none;
  touch-action: none;
  transition: box-shadow 0.2s ease;
}

.svg-wrapper.dragging {
  cursor: grabbing;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.text-path-svg {
  display: block;
  width: 100%;
  height: auto;
}

.text-path {
  font-family: serif;
  font-size: clamp(1.5rem, 2vw, 2.25rem);
  fill: #000;
  white-space: nowrap;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .view-menu-text-path-container {
    margin-top: -3rem;
  }

  .svg-wrapper {
    padding-bottom: 2rem;
    touch-action: pan-y;
  }

  .text-path {
    font-size: clamp(1.9rem, 5.5vw, 2.4rem);
  }
}

@media (max-width: 480px) {
  .view-menu-text-path-container {
    margin-top: -4rem;
  }

  .svg-wrapper {
    padding-bottom: 1rem;
  }

  .text-path {
    font-size: clamp(2rem, 7vw, 2.6rem);
  }
}
</style>
