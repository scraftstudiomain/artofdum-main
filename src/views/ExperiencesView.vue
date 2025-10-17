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
  ctx?.revert();
});
</script>

<template>
  <div ref="main" class="bg-background text-text">
    <!-- Hero Section -->
    <section class="hero-section relative h-screen flex items-center justify-center overflow-hidden">
      <div class="hero-bg absolute inset-0">
        <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/80"></div>
        <iframe
          class="w-full h-full object-cover"
          src="https://www.youtube.com/embed/W-Wl8elb4Vg?autoplay=1&mute=1&loop=1&playlist=W-Wl8elb4Vg&controls=0&showinfo=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&fs=0&rel=0&autohide=1&disablekb=1"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
        <div class="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
      </div>

      <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <div
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 1200, ease: 'easeOut', delay: 300 } }"
        >
          <div class="mb-8">
            <div class="inline-block">
              <div class="text-gold/60 text-sm tracking-[0.3em] uppercase mb-4">The Art of Sensory Dining</div>
              <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-text leading-[0.9] tracking-tight">
                EXPERIENTIAL
                <span class="block text-gold">ZONES</span>
              </h1>
            </div>
          </div>

          <p class="text-lg md:text-xl text-text/80 max-w-5xl mx-auto leading-relaxed mb-16 font-light">
            Each zone at Art of Dum is designed to immerse guests in a sensory journey. From aromatic air rituals to dramatic dish unveilings, every moment is curated to engage sight, smell, touch, and taste.
          </p>

          <!-- Premium Sensory Elements -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div
              v-for="(element, index) in sensoryElements"
              :key="index"
              class="sensory-item group relative"
            >
              <div class="relative">
                <!-- Geometric background -->
                <div class="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent border border-gold/20 rotate-3 group-hover:rotate-6 transition-transform duration-700"></div>

                <!-- Content -->
                <div class="relative bg-black/40 backdrop-blur-sm border border-gold/10 p-8 group-hover:border-gold/30 transition-all duration-700">
                  <div class="text-gold/40 text-xs tracking-widest uppercase mb-2">{{ element.symbol }}</div>
                  <div class="text-text text-xl font-light mb-1">{{ element.title }}</div>
                  <div class="text-gold text-lg font-serif mb-3">{{ element.subtitle }}</div>
                  <div class="w-8 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-3"></div>
                  <p class="text-text/60 text-xs leading-relaxed">{{ element.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Premium scroll indicator -->
      <div class="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <div class="flex flex-col items-center space-y-2">
          <div class="text-gold/60 text-xs tracking-widest uppercase">Scroll</div>
          <div class="w-px h-16 bg-gradient-to-b from-gold/60 to-transparent"></div>
        </div>
      </div>
    </section>

    <!-- Show Kitchen & Tandoor Theatre -->
    <section class="zone-section relative py-24 sm:py-40 bg-gradient-to-b from-black/20 to-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <!-- Left Content -->
          <div class="order-2 lg:order-1">
            <div class="relative">
              <!-- Section Number -->
              <div class="absolute -top-16 -left-8 text-gold/10 text-[8rem] font-black leading-none">01</div>

              <!-- Content -->
              <div class="relative z-10">
                <div class="flex items-center mb-8">
                  <div class="w-24 h-px bg-gradient-to-r from-gold/60 to-transparent mr-8"></div>
                  <div class="text-gold/60 text-xs tracking-widest uppercase">Zone One</div>
                </div>

                <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-6 leading-[0.9]">
                  Show Kitchen
                  <span class="block text-gold">&amp; Tandoor Theatre</span>
                </h2>

                <div class="w-32 h-px bg-gradient-to-r from-gold to-transparent mb-8"></div>

                <p class="text-lg text-text/70 leading-relaxed mb-12 font-light max-w-lg">
                  Copper tandoors act as living sculptures, blending heat, light, and reflection. Witness ancient techniques elevated into contemporary spectacle.
                </p>

                <!-- Features -->
                <div class="space-y-6">
                  <div class="group flex items-start space-x-4">
                    <div class="w-px h-8 bg-gradient-to-b from-gold to-transparent mt-1"></div>
                    <div>
                      <h4 class="font-light text-xl text-text mb-1">Living Sculptures</h4>
                      <p class="text-text/50 text-sm">Copper craftsmanship meets culinary art</p>
                    </div>
                  </div>
                  <div class="group flex items-start space-x-4">
                    <div class="w-px h-8 bg-gradient-to-b from-gold to-transparent mt-1"></div>
                    <div>
                      <h4 class="font-light text-xl text-text mb-1">Heat &amp; Light Symphony</h4>
                      <p class="text-text/50 text-sm">Dance of flames and reflection</p>
                    </div>
                  </div>
                  <div class="group flex items-start space-x-4">
                    <div class="w-px h-8 bg-gradient-to-b from-gold to-transparent mt-1"></div>
                    <div>
                      <h4 class="font-light text-xl text-text mb-1">Ancient Techniques</h4>
                      <p class="text-text/50 text-sm">Contemporary spectacle meets tradition</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Visual -->
          <div class="order-1 lg:order-2 relative">
            <div class="relative">
              <!-- Geometric Background Elements -->
              <div class="absolute -top-8 -right-8 w-32 h-32 border border-gold/10 rotate-45"></div>
              <div class="absolute -bottom-8 -left-8 w-24 h-24 border border-gold/10 rotate-12"></div>

              <!-- Image Grid -->
              <div class="grid grid-cols-2 gap-4 relative z-10">
                <div class="relative group overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Tandoor Theatre"
                    class="w-full h-80 object-cover transition-transform duration-1000 group-hover:scale-110"
                  >
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div class="absolute bottom-6 left-6 right-6">
                    <div class="text-gold/80 text-xs tracking-widest uppercase mb-2">Artistry</div>
                    <p class="text-text font-serif text-xl">Tandoor Craft</p>
                  </div>
                </div>
                <div class="relative group overflow-hidden mt-8">
                  <img
                    src="https://images.pexels.com/photos/1487511/pexels-photo-1487511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Show Kitchen"
                    class="w-full h-80 object-cover transition-transform duration-1000 group-hover:scale-110"
                  >
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div class="absolute bottom-6 left-6 right-6">
                    <div class="text-gold/80 text-xs tracking-widest uppercase mb-2">Performance</div>
                    <p class="text-text font-serif text-xl">Culinary Art</p>
                  </div>
                </div>
              </div>

              <!-- Animated Glow Effects -->
              <div class="tandoor-glow absolute top-1/2 -right-12 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl"></div>
              <div class="tandoor-glow absolute bottom-0 -left-12 w-48 h-48 bg-gradient-to-tr from-gold/10 to-transparent rounded-full blur-2xl" style="animation-delay: 2s;"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Dum & Chapati Stations -->
    <section class="zone-section relative py-24 sm:py-40 bg-gradient-to-b from-background to-black/20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <!-- Left Visual -->
          <div class="order-2 lg:order-1 relative">
            <div class="relative">
              <!-- Geometric Background Elements -->
              <div class="absolute top-1/2 -left-16 w-40 h-40 border border-gold/10 -rotate-12"></div>
              <div class="absolute bottom-0 right-0 w-32 h-32 border border-gold/10 rotate-45"></div>

              <!-- Image Grid -->
              <div class="grid grid-cols-2 gap-6 relative z-10">
                <div class="relative group overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/718742/pexels-photo-718742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Dum Preparation"
                    class="w-full h-96 object-cover transition-transform duration-1000 group-hover:scale-105"
                  >
                  <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                  <div class="absolute bottom-6 left-6 right-6">
                    <div class="text-gold/80 text-xs tracking-widest uppercase mb-2">Ritual</div>
                    <p class="text-text font-serif text-2xl">Handi Sealing</p>
                  </div>
                  <!-- Overlay Effect -->
                  <div class="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
                <div class="relative group overflow-hidden mt-16">
                  <img
                    src="https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Chapati Making"
                    class="w-full h-64 object-cover transition-transform duration-1000 group-hover:scale-105"
                  >
                  <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                  <div class="absolute bottom-6 left-6 right-6">
                    <div class="text-gold/80 text-xs tracking-widest uppercase mb-2">Craft</div>
                    <p class="text-text font-serif text-2xl">Rotis Artistry</p>
                  </div>
                  <!-- Overlay Effect -->
                  <div class="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>
              </div>

              <!-- Floating Elements -->
              <div class="absolute top-0 right-0 w-2 h-2 bg-gold/60 rounded-full animate-pulse"></div>
              <div class="absolute bottom-10 left-10 w-1 h-1 bg-gold/40 rounded-full"></div>
            </div>
          </div>

          <!-- Right Content -->
          <div class="order-1 lg:order-2">
            <div class="relative">
              <!-- Section Number -->
              <div class="absolute -top-16 -right-8 text-gold/10 text-[8rem] font-black leading-none">02</div>

              <!-- Content -->
              <div class="relative z-10">
                <div class="flex items-center mb-8 justify-end">
                  <div class="text-gold/60 text-xs tracking-widest uppercase mr-8">Zone Two</div>
                  <div class="w-24 h-px bg-gradient-to-l from-gold/60 to-transparent"></div>
                </div>

                <h2 class="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-6 leading-[0.9] text-right">
                  Live Dum
                  <span class="block text-gold">&amp; Chapati Stations</span>
                </h2>

                <div class="w-32 h-px bg-gradient-to-l from-gold to-transparent mb-8 ml-auto"></div>

                <p class="text-lg text-text/70 leading-relaxed mb-12 font-light max-w-lg ml-auto text-right">
                  See handis sealed and rotis prepared in real time—transforming dining into theatre and ritual.
                </p>

                <!-- Features -->
                <div class="space-y-6">
                  <div class="group flex items-start space-x-4 justify-end">
                    <div class="text-right">
                      <h4 class="font-light text-xl text-text mb-1">Real-Time Ritual</h4>
                      <p class="text-text/50 text-sm">Handis sealed before your eyes</p>
                    </div>
                    <div class="w-px h-8 bg-gradient-to-b from-gold to-transparent mt-1"></div>
                  </div>
                  <div class="group flex items-start space-x-4 justify-end">
                    <div class="text-right">
                      <h4 class="font-light text-xl text-text mb-1">Rotis Theatre</h4>
                      <p class="text-text/50 text-sm">Artisanal bread preparation</p>
                    </div>
                    <div class="w-px h-8 bg-gradient-to-b from-gold to-transparent mt-1"></div>
                  </div>
                  <div class="group flex items-start space-x-4 justify-end">
                    <div class="text-right">
                      <h4 class="font-light text-xl text-text mb-1">Interactive Experience</h4>
                      <p class="text-text/50 text-sm">Dining becomes performance</p>
                    </div>
                    <div class="w-px h-8 bg-gradient-to-b from-gold to-transparent mt-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Culinary Calendar & Seasonal Specials -->
    <section class="zone-section relative py-24 sm:py-40 bg-gradient-to-b from-black/20 to-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="text-center mb-20">
          <div class="relative inline-block">
            <!-- Section Number -->
            <div class="absolute -top-16 -left-20 text-gold/10 text-[8rem] font-black leading-none">03</div>

            <div class="relative z-10">
              <div class="flex items-center justify-center mb-8">
                <div class="w-32 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent mr-8"></div>
                <div class="text-gold/60 text-xs tracking-widest uppercase">Zone Three</div>
                <div class="w-32 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent ml-8"></div>
              </div>

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