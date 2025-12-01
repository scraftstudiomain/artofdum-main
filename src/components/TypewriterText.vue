<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{
  text: string;
  speed?: number; // ms per character
  startDelay?: number; // initial delay before typing starts
}>();

const displayText = ref('');
const root = ref<HTMLElement | null>(null);

let observer: IntersectionObserver | null = null;
let timer: number | null = null;
let started = false;

const startTyping = () => {
  if (started) return;
  started = true;

  const full = props.text;
  let index = 0;

  const step = () => {
    if (index <= full.length) {
      displayText.value = full.slice(0, index);
      index += 1;
      timer = window.setTimeout(step, props.speed ?? 60);
    }
  };

  if (props.startDelay && props.startDelay > 0) {
    timer = window.setTimeout(step, props.startDelay);
  } else {
    step();
  }
};

onMounted(() => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window && root.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTyping();
            if (root.value) {
              observer?.unobserve(root.value);
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(root.value);
  } else {
    // Fallback: start immediately
    startTyping();
  }
});

onBeforeUnmount(() => {
  if (observer && root.value) {
    observer.unobserve(root.value);
  }
  observer?.disconnect();
  if (timer != null) {
    window.clearTimeout(timer);
  }
});
</script>

<template>
  <span ref="root" class="inline-block align-baseline">
    {{ displayText }}
  </span>
</template>
