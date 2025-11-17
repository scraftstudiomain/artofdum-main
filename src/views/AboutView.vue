<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroVideo from '../0_Cooking_Chef_1920x1080.mp4';

gsap.registerPlugin(ScrollTrigger);

const main = ref<HTMLElement | null>(null);
let ctx: gsap.Context;
let preparedStoryNodes: HTMLElement[] = [];
let storyScroll: ScrollTrigger | null = null;
let totalStoryChars = 0;
let storySectionEl: HTMLElement | null = null;

type ChapterState = {
  node: HTMLElement;
  text: string;
  length: number;
  start: number;
  end: number;
  done: boolean;
};

let storyChaptersState: ChapterState[] = [];
let clearStoryChapters = () => {};
const collapseStorySection = () => storySectionEl?.classList.add('story-section--collapsed');
const restoreStorySection = () => storySectionEl?.classList.remove('story-section--collapsed');

const storyChapters = [
  "Our story begins in the opulent kitchens of Awadh...",
  "Where royal chefs, the Khansamas, perfected a secret art...",
  "The slow, magical technique of 'Dum Pukht'.",
  "A legacy of flavor, passed down through generations.",
  "Now, we share this royal heritage with you."
];

const philosophyWords = ["Patience", "Alchemy", "Perfection", "Heritage"];

onMounted(() => {
  nextTick(() => {
    ctx = gsap.context((self) => {
      if (!self || !self.selector) return;

      // Pinned Narrative
      const storySection = self.selector('.story-section')[0] as HTMLElement | undefined;
      const storyTextNodes = Array.from(self.selector('.story-text') as HTMLElement[] ?? []);

      if (storySection && storyTextNodes.length > 0) {
        storySectionEl = storySection;
        restoreStorySection();
        preparedStoryNodes = storyTextNodes;

        storyChaptersState = [];
        totalStoryChars = 0;

        storyTextNodes.forEach((node) => {
          const original = node.textContent?.trim() ?? '';
          node.dataset.originalText = original;
          node.setAttribute('aria-label', original);
          node.textContent = '';
          node.style.opacity = '0';
          node.classList.remove('is-typing');
          node.setAttribute('aria-hidden', 'true');

          const length = original.length;
          const start = totalStoryChars;
          totalStoryChars += Math.max(length, 1);
          const end = totalStoryChars;

          storyChaptersState.push({ node, text: original, length, start, end, done: false });
        });

        clearStoryChapters = () => {
          storyChaptersState.forEach((chapter) => {
            chapter.node.textContent = '';
            chapter.node.style.opacity = '0';
            chapter.node.classList.remove('is-typing');
            chapter.node.setAttribute('aria-hidden', 'true');
            chapter.done = false;
          });
        };

        const updateStory = (rawCount: number) => {
          if (storyChaptersState.length === 0) return;
          const clamped = Math.min(Math.max(rawCount, 0), totalStoryChars);

          let active = storyChaptersState[storyChaptersState.length - 1];
          for (const chapter of storyChaptersState) {
            if (clamped < chapter.end) {
              active = chapter;
              break;
            }
          }

          storyChaptersState.forEach((chapter) => {
            const within = Math.min(
              Math.max(clamped - chapter.start, 0),
              chapter.length
            );
            const isActive = chapter === active;

            chapter.node.textContent = chapter.text.slice(0, within);
            chapter.node.style.opacity =
              isActive && within > 0 ? '1' : '0';
            chapter.node.classList.toggle(
              'is-typing',
              isActive && within < chapter.length
            );
            chapter.node.setAttribute(
              'aria-hidden',
              (!isActive || within === 0).toString()
            );

            if (!isActive) {
              chapter.node.classList.remove('is-typing');
            }

            if (!chapter.done && within >= chapter.length) {
              gsap.timeline({ defaults: { ease: 'power2.out' } })
                .to(chapter.node, { opacity: 1, duration: 0.25 })
                .to({}, { duration: 0.45 })
                .to(chapter.node, { opacity: 0, duration: 0.5 });
              chapter.done = true;
            }
          });
        };

        const scrollLength = Math.max(1800, totalStoryChars * 15);

        storyScroll = ScrollTrigger.create({
          trigger: storySection,
          start: 'top top',
          end: () => `+=${scrollLength}`,
          pin: true,
          pinSpacing: false, // This prevents the extra space
          scrub: 0.4,
          anticipatePin: 1,
          onUpdate: (self) => {
            updateStory(Math.round(self.progress * totalStoryChars));
          },
          onLeave: () => {
            gsap.to(storySection, {
              autoAlpha: 0,
              duration: 0.25,
              overwrite: 'auto',
              onComplete: () => {
                clearStoryChapters();
                collapseStorySection();
              },
            });
          },
          onLeaveBack: () => {
            restoreStorySection();
            gsap.to(storySection, { 
              autoAlpha: 1, 
              duration: 0.2, 
              overwrite: 'auto',
              onComplete: () => {
                clearStoryChapters();
                updateStory(0);
              }
            });
          },
          onRefresh: (self) =>
            updateStory(Math.round(self.progress * totalStoryChars)),
        });

        const bgVideo = storySection.querySelector('.story-bg-video');
        if (bgVideo) {
          gsap.fromTo(
            bgVideo,
            { scale: 1.08 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: storySection,
                start: 'top top',
                end: `+=${scrollLength}`,
                scrub: true,
              },
            }
          );
        }

        updateStory(0);
      }

      // Philosophy Scroll
      const philosophySection = self.selector('.philosophy-section')[0];
      const philosophyTrack = self.selector('.philosophy-track')[0];
      if (philosophySection && philosophyTrack) {
        const getScrollAmount = () => philosophyTrack.scrollWidth - philosophySection.clientWidth;
        
        if (getScrollAmount() > 0) {
          gsap.to(philosophyTrack, {
            x: () => -getScrollAmount(),
            ease: 'none',
            scrollTrigger: {
              trigger: philosophySection,
              start: 'top top',
              end: () => `+=${getScrollAmount()}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            }
          });
        }
      }

  
    }, main.value!);
  });
});

onUnmounted(() => {
  preparedStoryNodes.forEach((node) => {
    const original = node.dataset.originalText;
    if (original) {
      node.textContent = original;
      node.style.opacity = '';
      node.classList.remove('is-typing');
      node.removeAttribute('aria-hidden');
    }
  });

  preparedStoryNodes = [];
  storyChaptersState = [];
  totalStoryChars = 0;
  clearStoryChapters = () => {};
  storyScroll?.kill();
  storyScroll = null;
  ctx?.revert();
});
</script>

<template>
  <div ref="main" class="bg-background text-text overflow-hidden">
    <!-- Cinematic Video Hero -->
    <section class="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <video 
          class="w-full h-full object-cover"
          :src="heroVideo"
          autoplay loop muted playsinline
        ></video>
        <div class="absolute inset-0 bg-black/60"></div>
      </div>
      <div 
        class="relative z-10 text-center px-4"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 1000, ease: 'easeOut', delay: 300 } }"
      >
        <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-text">Our Legacy, Your Table</h1>
        <p class="mt-4 text-lg text-text-muted max-w-3xl mx-auto">
          A culinary journey that began in the royal kitchens of Awadh, now brought to you with reverence and passion.
        </p>
      </div>
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div class="w-6 h-10 border-2 border-text-muted flex justify-center items-start p-1">
          <div class="w-1 h-2 bg-text-muted animate-bounce"></div>
        </div>
      </div>
    </section>

    <!-- Minimalist Statement Section -->
    <section class="minimalist-statement-section min-h-screen w-full flex items-center justify-center bg-[#faf9f6] py-24 sm:py-32">
      <div class="w-full px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 text-center">
        <div class="w-full space-y-8 md:space-y-12">
          <!-- Founded Date -->
          <p class="text-sm md:text-base font-sans font-medium tracking-[0.2em] uppercase text-[#1a1a1a]">
            FOUNDED IN 2017
          </p>
          
          <!-- Main Headline -->
          <div class="space-y-4 md:space-y-6">
            <h2 class="text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-sans font-black uppercase leading-[1.1] tracking-tight text-[#1a1a1a]">
              A ROYAL CULINARY
            </h2>
            <h2 class="text-4xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-sans font-black uppercase leading-[1.1] tracking-tight text-[#1a1a1a]">
              HERITAGE RESTAURANT
            </h2>
          </div>
          
          <!-- Supporting Text -->
          <div class="space-y-3 md:space-y-4 pt-4">
            <p class="text-lg md:text-xl lg:text-2xl font-serif italic text-[#1a1a1a]">
              We Create and Preserve
            </p>
            <p class="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-sans font-bold uppercase leading-[1.2] tracking-tight text-[#1a1a1a]">
              THE WORLD'S MOST AUTHENTIC
            </p>
            <p class="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-sans font-bold uppercase leading-[1.2] tracking-tight text-[#1a1a1a]">
              DUM PUKHT EXPERIENCES
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Philosophy Scroll -->
    <section v-if="false" class="philosophy-section h-screen w-full relative overflow-hidden bg-background">
      <div class="philosophy-track h-full flex items-center">
        <div 
          v-for="(word, index) in philosophyWords"
          :key="index"
          class="flex-shrink-0 px-12 md:px-24"
        >
          <h2 class="font-serif text-7xl md:text-9xl lg:text-[12rem] font-black text-text-muted/30 whitespace-nowrap">{{ word }}</h2>
        </div>
      </div>
    </section>

    <!-- Pinned Narrative -->
    <section v-if="false" class="story-section relative h-screen isolate bg-background">
      <div class="absolute inset-0 overflow-hidden -z-10">
        <video 
          src="https://videos.pexels.com/video-files/7578541/7578541-hd_1920_1080_25fps.mp4" 
          class="story-bg-video w-full h-full object-cover scale-125"
          autoplay loop muted playsinline
        ></video>
        <div class="absolute inset-0 bg-black/60"></div>
      </div>
      <div class="relative h-full flex items-center justify-center text-center px-4 py-16 sm:py-24">
        <div class="relative w-full pointer-events-none">
          <p 
            v-for="(chapter, index) in storyChapters" 
            :key="index"
            class="story-text story-typewriter font-decorative text-3xl md:text-5xl lg:text-6xl leading-snug absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 sm:px-8 opacity-0 z-10"
          >
            {{ chapter }}
          </p>
        </div>
      </div>
    </section>

    <section class="bg-background pt-12 pb-24 sm:pt-16 sm:pb-28">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-text-muted">
        <p class="max-w-3xl mx-auto">
          The Art of Dum legacy continues in every dining room we serve. Each course is choreographed to sustain the wonder long after the final bite, inviting you to linger, reflect, and return.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.story-section--collapsed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0 !important;
  opacity: 0 !important;
  visibility: hidden !important;
  pointer-events: none !important;
  z-index: -1;
}
</style>
