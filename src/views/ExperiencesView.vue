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
          <div class="text-gold/80 text-sm md:text-base tracking-[0.3em] uppercase mb-6">Discover The Art</div>
          <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-text mb-8 leading-tight">
            Curated <span class="text-gold">Experiences</span>
          </h1>
          <p class="text-lg md:text-xl text-text/80 max-w-2xl mx-auto font-light leading-relaxed mb-12">
            Immerse yourself in a culinary journey where every detail tells a story of royal heritage and contemporary elegance.
          </p>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center items-start p-1">
          <div class="w-1 h-2 bg-white/60 rounded-full animate-bounce"></div>
        </div>
      </div>
    </section>

    <!-- Culinary Calendar Section -->
    <section class="py-20 bg-background">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <div
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible="{ opacity: 1, y: 0, transition: { duration: 800 } }"
          >
            <div class="text-gold/60 text-xs tracking-widest uppercase mb-4">Seasonal Delights</div>
            <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-6 leading-[0.9]">
              Culinary Calendar
              <span class="block text-gold">&amp; Seasonal Specials</span>
            </h2>
            <div class="w-48 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8"></div>
            
            <p class="text-lg text-text/70 leading-relaxed max-w-4xl mx-auto font-light">
              Rotating heirloom ingredients, festival menus, and progressive pairings ensure curiosity and delight year-round.
            </p>
          </div>
        </div>

        <!-- Current Season Highlight -->
        <div class="mb-20 text-center">
          <div class="relative inline-block">
            <div class="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-red-900/20 blur-3xl"></div>
            <div class="relative bg-black/40 backdrop-blur-sm border border-gold/20 p-12 lg:p-16">
              <div class="text-gold/60 text-xs tracking-widest uppercase mb-4">Current Season</div>
              <h3 class="font-serif text-3xl lg:text-4xl font-bold text-gold mb-4">{{ currentSeason.name }}</h3>
              <p class="text-text/70 mb-8 max-w-2xl mx-auto">{{ currentSeason.theme }}</p>
              <div class="flex flex-wrap justify-center gap-3">
                <span
                  v-for="ingredient in currentSeason.ingredients"
                  :key="ingredient"
                  class="px-6 py-3 bg-gold/5 border border-gold/20 text-gold/80 text-sm tracking-wide transition-all duration-500 hover:bg-gold/10 hover:border-gold/40"
                >
                  {{ ingredient }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Calendar Events -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            v-for="(event, index) in calendarEvents"
            :key="index"
            class="calendar-card group relative"
          >
            <!-- Background Gradient -->
            <div class="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            <!-- Content -->
            <div class="relative bg-black/20 backdrop-blur-sm border border-gold/10 p-8 group-hover:border-gold/30 transition-all duration-700">
              <div class="text-gold/60 text-xs tracking-widest uppercase mb-4">{{ event.month }}</div>
              <h3 class="font-serif text-2xl font-bold text-text mb-4">{{ event.title }}</h3>
              <div class="w-16 h-px bg-gradient-to-r from-gold/50 to-transparent mb-4"></div>
              <p class="text-text/60 leading-relaxed mb-6 text-sm">{{ event.description }}</p>

              <!-- Highlights -->
              <div class="space-y-3">
                <div
                  v-for="highlight in event.highlights"
                  :key="highlight"
                  class="flex items-center space-x-3 text-sm text-text/50"
                >
                  <div class="w-1 h-1 bg-gold/60 rounded-full"></div>
                  <span>{{ highlight }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Premium CTA Section -->
    <section class="relative py-32 sm:py-40 bg-gradient-to-b from-background to-black">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center relative">
          <!-- Background Elements -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl"></div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-2xl"></div>

          <div class="relative z-10">
            <div
              v-motion
              :initial="{ opacity: 0, y: 50 }"
              :visible="{ opacity: 1, y: 0, transition: { duration: 1200, ease: 'easeOut' } }"
            >
              <div class="text-gold/60 text-xs tracking-widest uppercase mb-6">The Experience Awaits</div>
              <h2 class="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-text mb-8 leading-[0.9]">
                Begin Your
                <span class="block text-gold">Sensory Journey</span>
              </h2>

              <div class="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-12"></div>

              <p class="text-lg text-text/70 max-w-3xl mx-auto mb-16 font-light leading-relaxed">
                Experience the art of Dum through our carefully curated experiential zones. Each visit offers a new chapter in your culinary story.
              </p>

              <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href="tel:+919876543210"
                  class="relative group inline-flex items-center justify-center bg-gold text-background font-light py-6 px-12 text-sm tracking-[0.2em] uppercase transition-all duration-700 hover:bg-gold/90 hover:scale-105 hover:shadow-2xl hover:shadow-gold/30 overflow-hidden"
                >
                  <span class="relative z-10">Reserve Your Zone</span>
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </a>
                <a
                  href="/contact"
                  class="relative group inline-flex items-center justify-center border border-gold/50 text-gold font-light py-6 px-12 text-sm tracking-[0.2em] uppercase transition-all duration-700 hover:bg-gold hover:text-background hover:scale-105 hover:shadow-2xl hover:shadow-gold/30 overflow-hidden"
                >
                  <span class="relative z-10">Plan Your Experience</span>
                  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>