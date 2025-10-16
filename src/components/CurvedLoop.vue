<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

interface Props {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  marqueeText: '',
  speed: 2,
  className: '',
  curveAmount: 400,
  direction: 'left',
  interactive: true
});

const measureRef = ref<SVGTextElement | null>(null);
const textPathRef = ref<SVGTextPathElement | null>(null);
const pathRef = ref<SVGPathElement | null>(null);
const spacing = ref(0);
const offset = ref(0);
const isDragging = ref(false);
const lastX = ref(0);
const velocity = ref(0);
const currentDirection = ref<'left' | 'right'>(props.direction);

const uid = computed(() => `curve-${Math.random().toString(36).substr(2, 9)}`);
const pathId = computed(() => uid.value);
const pathD = computed(() => `M-100,40 Q500,${40 + props.curveAmount} 1540,40`);

const text = computed(() => {
  const hasTrailing = /\s|\u00A0$/.test(props.marqueeText);
  return (hasTrailing ? props.marqueeText.replace(/\s+$/, '') : props.marqueeText) + '\u00A0';
});

const totalText = computed(() => {
  const textLength = spacing.value;
  if (!textLength) return text.value;

  // Calculate how many repetitions we need for a seamless loop
  const repetitions = Math.ceil(3000 / textLength) + 3;
  return Array(repetitions).fill(text.value).join('');
});

const ready = computed(() => spacing.value > 0);
const cursorStyle = computed(() =>
  props.interactive ? (isDragging.value ? 'grabbing' : 'grab') : 'auto'
);

let animationFrame: number | null = null;

const updateSpacing = async () => {
  await nextTick();
  if (measureRef.value) {
    spacing.value = measureRef.value.getComputedTextLength();
  }
};

const initializeOffset = () => {
  if (!spacing.value) return;
  if (textPathRef.value) {
    const initial = -spacing.value;
    textPathRef.value.setAttribute('startOffset', initial + 'px');
    offset.value = initial;
  }
};

const animate = () => {
  if (!spacing.value || !ready.value) return;

  if (!isDragging.value && textPathRef.value) {
    const delta = currentDirection.value === 'right' ? props.speed : -props.speed;
    const currentOffset = parseFloat(textPathRef.value.getAttribute('startOffset') || '0');
    let newOffset = currentOffset + delta;

    const wrapPoint = spacing.value;
    if (newOffset <= -wrapPoint) newOffset += wrapPoint;
    if (newOffset > 0) newOffset -= wrapPoint;

    textPathRef.value.setAttribute('startOffset', newOffset + 'px');
    offset.value = newOffset;
  }
  animationFrame = requestAnimationFrame(animate);
};

const onPointerDown = (e: PointerEvent) => {
  if (!props.interactive) return;
  isDragging.value = true;
  lastX.value = e.clientX;
  velocity.value = 0;
  (e.target as HTMLElement).setPointerCapture(e.pointerId);
};

const onPointerMove = (e: PointerEvent) => {
  if (!props.interactive || !isDragging.value || !textPathRef.value) return;
  const dx = e.clientX - lastX.value;
  lastX.value = e.clientX;
  velocity.value = dx;

  const currentOffset = parseFloat(textPathRef.value.getAttribute('startOffset') || '0');
  let newOffset = currentOffset + dx;

  const wrapPoint = spacing.value;
  if (newOffset <= -wrapPoint) newOffset += wrapPoint;
  if (newOffset > 0) newOffset -= wrapPoint;

  textPathRef.value.setAttribute('startOffset', newOffset + 'px');
  offset.value = newOffset;
};

const endDrag = () => {
  if (!props.interactive) return;
  isDragging.value = false;
  currentDirection.value = velocity.value > 0 ? 'right' : 'left';
};

onMounted(() => {
  updateSpacing();
  initializeOffset();
  animationFrame = requestAnimationFrame(animate);
});

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
  }
});
</script>

<template>
  <div
    class="curved-loop-container"
    :style="{ visibility: ready ? 'visible' : 'hidden', cursor: cursorStyle }"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="endDrag"
    @pointerleave="endDrag"
  >
    <svg class="curved-loop-svg" viewBox="0 0 1440 120" preserveAspectRatio="xMidYMid meet">
      <text
        ref="measureRef"
        xmlSpace="preserve"
        class="measure-text"
      >
        {{ text }}
      </text>
      <defs>
        <path
          ref="pathRef"
          :id="pathId"
          :d="pathD"
          fill="none"
          stroke="transparent"
        />
      </defs>
      <text
        v-if="ready"
        fontWeight="bold"
        xmlSpace="preserve"
        :class="className"
        class="curved-text"
      >
        <textPath
          ref="textPathRef"
          :href="`#${pathId}`"
          :startOffset="offset + 'px'"
          xmlSpace="preserve"
        >
          {{ totalText }}
        </textPath>
      </text>
    </svg>
  </div>
</template>

<style scoped>
.curved-loop-container {
  min-height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0;
  padding: 0;
}

.curved-loop-svg {
  user-select: none;
  width: 100%;
  max-width: 100vw;
  height: auto;
  overflow: visible;
  display: block;
  font-size: clamp(3rem, 8vw, 6rem);
  fill: currentColor;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1;
}

.measure-text {
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
}

.curved-text {
  fill: currentColor;
  font-family: 'Academy Engraved', serif;
  letter-spacing: 0.05em;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .curved-loop-container {
    min-height: 25vh;
    margin: 0;
    padding: 0;
  }

  .curved-loop-svg {
    font-size: clamp(2rem, 6vw, 4rem);
  }
}

@media (max-width: 480px) {
  .curved-loop-container {
    min-height: 20vh;
    margin: 0;
    padding: 0;
  }

  .curved-loop-svg {
    font-size: clamp(1.5rem, 5vw, 3rem);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .curved-text {
    fill: #e5e5e5;
  }
}
</style>