<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DecorativeDivider from '../components/icons/DecorativeDivider.vue';

gsap.registerPlugin(ScrollTrigger);

const main = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

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
      const storySection = self.selector('.story-section')[0];
      const storyTextElements = self.selector('.story-text');
      if (storySection && storyTextElements.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: storySection,
            start: 'top top',
            end: '+=3000',
            pin: true,
            scrub: 1,
          }
        });

        tl.to(self.selector('.story-bg-video'), { scale: 1, duration: tl.duration() }, 0);

        storyTextElements.forEach((text, index) => {
          tl.fromTo(text, { opacity: 0 }, { opacity: 1, duration: 1 });
          if (index < storyTextElements.length - 1) {
            tl.to(text, { opacity: 0, duration: 1 }, '+=2');
          }
        });
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

      // Chef Reveal
      const chefSection = self.selector('.chef-section')[0];
      if (chefSection) {
        gsap.from(self.selector('.chef-image-wrapper img'), {
          scale: 1.2,
          y: '5%',
          ease: 'none',
          scrollTrigger: {
            trigger: chefSection,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
        gsap.from(self.selector('.chef-content'), {
          opacity: 0,
          y: 50,
          scrollTrigger: {
            trigger: chefSection,
            start: 'top center',
            toggleActions: 'play none none reverse'
          }
        });
      }

    }, main.value!);
  });
});

onUnmounted(() => {
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
          src="https://videos.pexels.com/video-files/8899388/8899388-hd_1920_1080_25fps.mp4"
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

    <!-- Philosophy Scroll -->
    <section class="philosophy-section h-screen w-full relative overflow-hidden bg-background">
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
    <section class="story-section h-screen w-full relative">
      <div class="absolute inset-0 overflow-hidden">
        <video 
          src="https://videos.pexels.com/video-files/7578541/7578541-hd_1920_1080_25fps.mp4" 
          class="story-bg-video w-full h-full object-cover scale-125"
          autoplay loop muted playsinline
        ></video>
        <div class="absolute inset-0 bg-black/60"></div>
      </div>
      <div class="relative h-full flex items-center justify-center text-center px-4">
        <div class="max-w-4xl">
          <p 
            v-for="(chapter, index) in storyChapters" 
            :key="index"
            class="story-text font-serif text-3xl md:text-5xl lg:text-6xl leading-tight absolute left-1/2 -translate-x-1/2 w-full px-4 opacity-0"
          >
            {{ chapter }}
          </p>
        </div>
      </div>
    </section>

    <!-- Meet the Ustad -->
    <section class="chef-section py-20 sm:py-32 bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div class="chef-image-wrapper h-96 md:h-[600px] overflow-hidden">
             <img 
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Portrait of Ustad Aisha Begum" 
              class="w-full h-full object-cover object-top"
              loading="lazy" decoding="async"
            >
          </div>
          <div class="chef-content">
            <h2 class="font-serif text-4xl text-gold mb-6">Meet the Ustad</h2>
            <p class="font-sans text-xl font-bold text-text mb-4">Ustad Aisha Begum</p>
            <div class="space-y-4 text-text-muted leading-relaxed">
              <p>Carrying the torch of her ancestors, Ustad Aisha Begum is the heart and soul of our kitchen. With over three decades of experience, she has mastered the delicate balance of spice and subtlety that defines our cuisine.</p>
              <p>Her hands move with the grace of an artist and the precision of a master craftswoman. For her, every dish is a tribute to her heritage and a gift to our guests.</p>
            </div>
            <DecorativeDivider />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
