<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DecorativeDivider from '../components/icons/DecorativeDivider.vue';
import DiamondIcon from '../components/icons/DiamondIcon.vue';

gsap.registerPlugin(ScrollTrigger);

const main = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

const currentSeason = ref({
  name: "Winter Royal Feast",
  theme: "Warm spices and slow-cooked perfection",
  ingredients: ["Saffron", "Cardamom", "Cinnamon", "Nutmeg", "Cloves"],
  color: "from-orange-900/20 to-red-900/20"
});

const calendarEvents = ref([
  {
    month: "November",
    title: "Diwali Royal Banquet",
    description: "A celebration of light with traditional Awadhi sweets and savory delights",
    highlights: ["Traditional Mithai", "Live Music", "Lantern Ceremony"]
  },
  {
    month: "December",
    title: "Winter Dum Festival",
    description: "Experience the warmth of slow-cooked delicacies in our royal ambiance",
    highlights: ["Slow-Cooked Specials", "Mulled Wine", "Royal Storytelling"]
  },
  {
    month: "January",
    title: "Makar Sankranti Feast",
    description: "Harvest celebration with seasonal ingredients and ancient recipes",
    highlights: ["Sesame Specialties", "Kite Flying", "Folk Performances"]
  }
]);

const sensoryElements = [
  {
    symbol: "AURA",
    title: "Aromatic",
    subtitle: "Air Rituals",
    description: "Hand-picked spices roasted to release their essence"
  },
  {
    symbol: "SIGHT",
    title: "Dramatic",
    subtitle: "Unveilings",
    description: "Each dish revealed with theatrical precision"
  },
  {
    symbol: "FEEL",
    title: "Touch of",
    subtitle: "Tradition",
    description: "Handcrafted textures from generations of skill"
  },
  {
    symbol: "TASTE",
    title: "Flavor",
    subtitle: "Evolution",
    description: "Tastes that unfold in perfect harmony"
  }
];

onMounted(() => {
  ctx = gsap.context((self) => {
    if (!self) return;

    // Parallax effect for hero section
    gsap.fromTo('.hero-bg',
      {
        y: 0,
        scale: 1.1
      },
      {
        y: -150,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      }
    );

    // Floating animation for sensory elements
    const sensoryItems = self.selector('.sensory-item');
    sensoryItems.forEach((item, index) => {
      gsap.to(item, {
        y: -10,
        duration: 2 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    });

    // Staggered animation for zone sections
    const zones = self.selector('.zone-section');
    zones.forEach((zone, index) => {
      gsap.fromTo(zone,
        {
          opacity: 0,
          y: 100
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: zone,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Tandoor glow animation
    const tandoors = self.selector('.tandoor-glow');
    tandoors.forEach((tandoor) => {
      gsap.to(tandoor, {
        opacity: 0.6,
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    });

    // Calendar card animations
    const calendarCards = self.selector('.calendar-card');
    calendarCards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          x: -50
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, main.value!);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <div class="min-h-screen bg-background text-text overflow-x-hidden" ref="main">
    <!-- Hero Section -->
    <section class="hero-section relative h-[100dvh] min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div class="hero-bg absolute inset-0">
        <img
          src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Royal Dining Experience"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div class="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 1000, ease: 'easeOut' } }"
        >
          <div class="text-gold/80 text-sm md:text-base tracking-[0.3em] uppercase mb-6">Art of Dum Experiences</div>
          <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-text mb-8 leading-tight">
            More Than a Meal <br><span class="text-gold">—An Experience</span>
          </h1>
        
        </div>
      </div>

      <!-- Scroll Indicator -->
      <!-- <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center items-start p-1">
          <div class="w-1 h-2 bg-white/60 rounded-full animate-bounce"></div>
        </div>
      </div> -->
    </section>

    <section class="relative py-20 md:py-24 bg-[#f0ebe1]">
      <div class="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-y-32 md:gap-12 items-center">
        <div class="relative flex justify-center md:justify-start">
          <div
            class="w-64 h-80 md:w-72 md:h-96 overflow-hidden shadow-xl bg-black/5 group"
            v-motion
            :initial="{ opacity: 0, x: -40, y: 20 }"
            :visibleOnce="{ opacity: 1, x: 0, y: 0, transition: { duration: 800, ease: 'easeOut', delay: 100 } }"
          >
            <img
              src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Warmly lit dining room with elegant table settings"
              class="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div
            class="absolute top-[7rem] left-[9rem] sm:left-40 sm:top-24 md:left-48 md:top-28 w-56 h-72 md:w-64 md:h-80 overflow-hidden shadow-xl bg-black/5 group"
            v-motion
            :initial="{ opacity: 0, x: 40, y: 20 }"
            :visibleOnce="{ opacity: 1, x: 0, y: 0, transition: { duration: 800, ease: 'easeOut', delay: 200 } }"
          >
            <img
              src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Plated gourmet dish showcasing Art of Dum's cuisine"
              class="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        <div class="space-y-6 text-[#2b2116]">
          <div class="h-px w-16 bg-gold/50"></div>
          <h2 class="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug text-[#2b2116]">
            Experiential Zones:
          </h2>
          <p class="text-sm md:text-base text-text-muted leading-relaxed">
            Each zone at Art of Dum is designed to immerse guests in a sensory journey. From aromatic air
            rituals to dramatic dish unveilings, every moment is curated to engage sight, smell, touch,
            and taste.
          </p>
          <div class="h-px w-16 bg-gold/30"></div>
        </div>
      </div>
    </section>

    <section class="relative py-20 md:py-24 bg-[#f0ebe1]">
      <div class="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-y-32 md:gap-12 items-center">
        <div class="space-y-6 text-[#2b2116] order-2 md:order-1">
          <div class="h-px w-16 bg-gold/50"></div>
          <h2 class="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug text-[#2b2116]">
            Show Kitchen & Tandoor Theatre:
          </h2>
          <p class="text-sm md:text-base text-text-muted leading-relaxed">
            Copper tandoors act as living sculptures, blending heat, light, and reflection. Witness ancient
            techniques elevated into contemporary spectacle.
          </p>
          <div class="h-px w-16 bg-gold/30"></div>
        </div>

        <div class="relative flex justify-center md:justify-end order-1 md:order-2">
          <div
            class="w-64 h-80 md:w-72 md:h-96 overflow-hidden shadow-xl bg-black/5 group"
            v-motion
            :initial="{ opacity: 0, x: 40, y: 20 }"
            :visibleOnce="{ opacity: 1, x: 0, y: 0, transition: { duration: 800, ease: 'easeOut', delay: 100 } }"
          >
            <img
              src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Chef working in an open kitchen with warm lighting"
              class="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div
            class="absolute top-[7rem] left-[9rem] sm:left-auto sm:-right-10 sm:top-24 md:-right-16 md:top-28 w-56 h-72 md:w-64 md:h-80 overflow-hidden shadow-xl bg-black/5 group"
            v-motion
            :initial="{ opacity: 0, x: 60, y: 20 }"
            :visibleOnce="{ opacity: 1, x: 0, y: 0, transition: { duration: 800, ease: 'easeOut', delay: 200 } }"
          >
            <img
              src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Glowing tandoor-inspired dish in focus"
              class="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-20 md:py-24 bg-[#f0ebe1]">
      <div class="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-y-32 md:gap-12 items-center">
        <div class="relative flex justify-center md:justify-start">
          <div
            class="w-64 h-80 md:w-72 md:h-96 overflow-hidden shadow-xl bg-black/5 group"
            v-motion
            :initial="{ opacity: 0, x: -40, y: 20 }"
            :visibleOnce="{ opacity: 1, x: 0, y: 0, transition: { duration: 800, ease: 'easeOut', delay: 100 } }"
          >
            <img
              src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Hand pouring sauce over a dum dish"
              class="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div
            class="block absolute top-[7rem] left-[9rem] sm:left-40 sm:top-24 md:left-48 md:top-28 w-56 h-72 md:w-64 md:h-80 overflow-hidden shadow-xl bg-black/5 group"
            v-motion
            :initial="{ opacity: 0, x: 40, y: 20 }"
            :visibleOnce="{ opacity: 1, x: 0, y: 0, transition: { duration: 800, ease: 'easeOut', delay: 200 } }"
          >
            <img
              src="https://images.pexels.com/photos/4109991/pexels-photo-4109991.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Chapati being prepared at a live station"
              class="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        <div class="space-y-6 text-[#2b2116]">
          <div class="h-px w-16 bg-gold/50"></div>
          <h2 class="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug text-[#2b2116]">
            Live Dum & Chapati Stations:
          </h2>
          <p class="text-sm md:text-base text-text-muted leading-relaxed">
            See handis sealed and rotis prepared in real time—transforming dining into theatre and ritual.
          </p>
          <div class="h-px w-16 bg-gold/30"></div>
        </div>
      </div>
    </section>

    <section class="relative py-20 md:pt-24 md:pb-48 bg-[#f0ebe1]">
      <div class="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-y-32 md:gap-12 items-center">
        <div class="space-y-6 text-[#2b2116] order-2 md:order-1">
          <div class="h-px w-16 bg-gold/50"></div>
          <h2 class="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug text-[#2b2116]">
            Culinary Calendar & Seasonal Specials:
          </h2>
          <p class="text-sm md:text-base text-text-muted leading-relaxed">
            Rotating heirloom ingredients, festival menus, and progressive pairings ensure curiosity and
            delight year-round.
          </p>
          <div class="h-px w-16 bg-gold/30"></div>
        </div>

        <div class="relative flex justify-center md:justify-end order-1 md:order-2">
          <div
            class="w-64 h-80 md:w-72 md:h-96 overflow-hidden shadow-xl bg-black/5 group"
            v-motion
            :initial="{ opacity: 0, x: 40, y: 20 }"
            :visibleOnce="{ opacity: 1, x: 0, y: 0, transition: { duration: 800, ease: 'easeOut', delay: 100 } }"
          >
            <img
              src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Seasonal dum dish presented elegantly"
              class="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div
            class="block absolute top-[7rem] left-[9rem] sm:left-auto sm:-right-10 sm:top-24 md:-right-16 md:top-28 w-56 h-72 md:w-64 md:h-80 overflow-hidden shadow-xl bg-black/5 group"
            v-motion
            :initial="{ opacity: 0, x: 60, y: 20 }"
            :visibleOnce="{ opacity: 1, x: 0, y: 0, transition: { duration: 800, ease: 'easeOut', delay: 200 } }"
          >
            <img
              src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Seasonal ingredients styled on a table"
              class="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

  </div>
</template>