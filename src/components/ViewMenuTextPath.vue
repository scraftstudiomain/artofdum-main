<script setup lang="ts">
const repeatedText = 'View Our Menu \u2022 '.repeat(30);
</script>

<template>
  <div class="view-menu-text-path-container">
    <div class="svg-wrapper">
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
            d="M0,260 C240,80 480,80 720,260
               S1200,440 1440,260
               S1680,80 1920,260"
            fill="none"
          />
        </defs>

        <text>
          <textPath
            href="#view-menu-curve"
            startOffset="0%"
            dominant-baseline="middle"
            class="text-path"
          >
            <animate
              attributeName="startOffset"
              from="0%"
              to="-40%"
              dur="18s"
              repeatCount="indefinite"
            />
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
  padding: 2rem 0;
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
  .text-path {
    font-size: clamp(1.25rem, 4vw, 1.75rem);
  }
}

@media (max-width: 480px) {
  .text-path {
    font-size: 1.1rem;
  }
}
</style>

