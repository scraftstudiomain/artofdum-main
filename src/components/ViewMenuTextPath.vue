<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const textPath = ref<SVGTextPathElement | null>(null);
let animationFrame: number | null = null;
let startTime: number | null = null;

const originalText = 'View Our Menu • ';
// Repeat many times for seamless infinite looping
const repeatedText = originalText.repeat(20);

// Get text length from the actual text content (matching original JS code)
let textLength = 0;
let singleTextLength = 0; // Length of one instance for seamless looping
const duration = 15000; // Duration of one complete animation loop in milliseconds (reduced for faster animation)
const speedMultiplier = 80; // Adjust this value to control the speed of the animation (increased for faster movement)

function animateTextPath(timestamp: number) {
  if (!startTime) {
    startTime = timestamp;
  }

  if (!textPath.value) {
    animationFrame = requestAnimationFrame(animateTextPath);
    return;
  }

  // Get text content from the element (matching original implementation)
  if (textLength === 0 && textPath.value.textContent) {
    const fullText = textPath.value.textContent.trim();
    textLength = fullText.length;
    // Calculate single instance length for seamless looping
    singleTextLength = originalText.length;
  }

  if (textLength === 0 || singleTextLength === 0) {
    animationFrame = requestAnimationFrame(animateTextPath);
    return;
  }

  const elapsed = timestamp - startTime;
  // Calculate progress within the animation loop (0 to 1)
  const progress = (elapsed % duration) / duration;
  
  // For seamless infinite loop, use single text length so it wraps perfectly
  // This ensures the animation loops seamlessly when one instance completes
  const offset = -progress * singleTextLength * speedMultiplier;

  // Set the startOffset attribute with the adjusted offset
  textPath.value.setAttribute('startOffset', offset.toString());

  animationFrame = requestAnimationFrame(animateTextPath);
}

onMounted(async () => {
  await nextTick();
  // Wait a bit more for DOM to fully render
  setTimeout(() => {
    if (textPath.value) {
      // Get text length from the element
      if (textPath.value.textContent) {
        const fullText = textPath.value.textContent.trim();
        textLength = fullText.length;
        singleTextLength = originalText.length;
      }
      textPath.value.setAttribute('startOffset', '0');
    }
    // Start animation
    animationFrame = requestAnimationFrame(animateTextPath);
  }, 200);
});

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
});
</script>

<template>
  <div class="view-menu-text-path-container">
    <div class="spacer"></div>
    <svg
      width="100%"
      height="600px"
      viewBox="0 -50 1500.72 250"
      style="transform: scale(1.1) rotate(180deg)"
      class="text-path-svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        id="curve"
        d="M1476.133,835.271c-238.287,0-238.287-181.231-476.574-181.231a388.326,388.326,0,0,0-69.728,5.933c-171.338,31.1-194.294,175.3-406.845,175.3C284.7,835.271,284.7,654.041,46.413,654.041H.5V.5L1510.439,12.253V835.271Z"
        transform="translate(0 -700)"
        fill="none"
      />

      <text>
        <textPath
          ref="textPath"
          dominant-baseline="hanging"
          href="#curve"
          id="text-path"
          text-anchor="start"
          class="text-path"
        >
          {{ repeatedText }}
        </textPath>
      </text>
    </svg>
    <div class="spacer-bottom"></div>
  </div>
</template>

<style scoped>
.view-menu-text-path-container {
  width: 100%;
  overflow: visible;
  position: relative;
}

.spacer {
  height: 50px;
}

.spacer-bottom {
  height: 200px; /* Matches top spacer - adjust as needed */
}

.text-path-svg {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 300px;
  overflow: visible;
}

.text-path {
  font-family: serif;
  font-size: 32px;
  fill: #000000;
  white-space: nowrap;
  font-weight: bold;
  text-transform: uppercase;
  position: relative;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .text-path-svg {
    min-height: 500px;
  }

  .text-path {
    font-size: 24px;
  }

  .spacer {
    height: 60px;
  }

  .spacer-bottom {
    height: 60px; /* Matches top spacer */
  }
}

@media (max-width: 480px) {
  .text-path-svg {
    min-height: 400px;
  }

  .text-path {
    font-size: 18px;
  }

  .spacer {
    height: 40px;
  }

  .spacer-bottom {
    height: 40px; /* Matches top spacer */
  }
}
</style>

