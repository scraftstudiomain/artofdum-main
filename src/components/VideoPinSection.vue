<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, nextTick } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const isMobile = ref(false);
const sectionRef = ref<HTMLElement | null>(null);
const videoRef = ref<HTMLVideoElement | null>(null);

// Track viewport width for mobile detection
const updateIsMobile = () => {
  isMobile.value = window.matchMedia("(max-width: 768px)").matches;
};

let ctx: gsap.Context | null = null;
let initialized = false;
let onVideoReady: (() => void) | null = null;

onMounted(() => {
  updateIsMobile();
  window.addEventListener("resize", updateIsMobile);

  const initScroll = () => {
    if (initialized) {
      // prevent duplicate ScrollTriggers that can cause jumps/black frames
      ScrollTrigger.refresh();
      return;
    }
    ctx?.revert();
    ctx = gsap.context(() => {
      if (!isMobile.value && sectionRef.value) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.value,
            start: "top top",
            end: "+=225%",
            scrub: 1.2,
            pin: true,
            pinSpacing: true,
            pinReparent: true,
            fastScrollEnd: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            preventOverlaps: true,
            refreshPriority: 1,
            id: "video-pin",
          },
        });

        // 1) Reveal from small to beyond full to avoid edge clipping
        tl.to(".video-box", {
          clipPath: "circle(150% at 50% 50%)",
          ease: "none",
          duration: 0.8,
        });
        // 2) Hold at full-screen briefly so users can watch
        tl.to({}, { duration: 0.6 });

        // Stop this section from re-triggering after first complete pass
        const st = tl.scrollTrigger;
        if (st) {
          st.eventCallback("onLeave", () => {
            // Force final visual state, then fully revert pin/spacer to avoid duplicates
            gsap.set(".video-box", {
              clipPath: "circle(150% at 50% 50%)",
              WebkitClipPath: "circle(150% at 50% 50%)",
            });
            st.kill(true);
            ScrollTrigger.refresh();
          });
        }
        initialized = true;
      }
    });
    // refresh after mount to ensure measurements are correct
    nextTick(() => ScrollTrigger.refresh());
  };

  // Wait for video to be ready before initializing the scroll scene
  const tryInitWhenVideoReady = () => {
    const v = videoRef.value;
    if (!v) {
      initScroll();
      return;
    }
    if (v.readyState >= 2) {
      initScroll();
      return;
    }
    onVideoReady = () => {
      if (!videoRef.value) return;
      videoRef.value.removeEventListener(
        "loadedmetadata",
        onVideoReady as EventListener
      );
      videoRef.value.removeEventListener(
        "canplay",
        onVideoReady as EventListener
      );
      initScroll();
    };
    v.addEventListener("loadedmetadata", onVideoReady as EventListener);
    v.addEventListener("canplay", onVideoReady as EventListener);
  };

  // initialize once on mount
  tryInitWhenVideoReady();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateIsMobile);
  ctx?.revert();
  // Clean up ScrollTrigger by ID to ensure complete removal
  ScrollTrigger.getById("video-pin")?.kill(true);
  // Clean up any local video listeners
  if (onVideoReady && videoRef.value) {
    videoRef.value.removeEventListener(
      "loadedmetadata",
      onVideoReady as EventListener
    );
    videoRef.value.removeEventListener(
      "canplay",
      onVideoReady as EventListener
    );
  }
  // Force refresh to ensure all traces are removed
  ScrollTrigger.refresh();
});
</script>

<template>
  <section class="vd-pin-section" ref="sectionRef">
    <div
      class="video-box"
      :style="{
        clipPath: isMobile
          ? 'circle(150% at 50% 50%)'
          : 'circle(8% at 50% 50%)',
        WebkitClipPath: isMobile
          ? 'circle(150% at 50% 50%)'
          : 'circle(8% at 50% 50%)',
      }"
    >
      <video
        ref="videoRef"
        class="video-el"
        src="https://video.gumlet.io/67489ec0dad6bb7514b3bf09/68f93225609b9e4625ac8249/download.mp4"
        autoplay
        loop
        muted
        playsinline
      />
    </div>

    <!-- Overlay moved OUTSIDE of clipped .video-box to avoid being cut -->
    <div class="overlay-center md:scale-100">
      <img
        src="/images/circle-text.svg"
        alt="Circle text"
        class="spin-circle"
      />
      <div class="play-btn">
        <img src="/images/play.svg" alt="Play button" class="play-icon" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.vd-pin-section {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
}
.video-box {
  position: relative;
  width: 100%;
  height: 100vh;
  will-change: clip-path;
  contain: layout paint; /* reduce layout thrash for clip-path */
}
.video-el {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  backface-visibility: hidden;
}
.abs-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none; /* ensure overlay doesn't block scroll/pin */
}
.overlay-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 2; /* above video */
}
.spin-circle {
  width: 8rem;
  height: 8rem;
  animation: spin 12s linear infinite;
}
.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.play-icon {
  width: 3rem;
  height: 3rem;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
