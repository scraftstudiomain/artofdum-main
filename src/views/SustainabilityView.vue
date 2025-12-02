<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import { useTitle } from '@vueuse/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DecorativeDivider from '../components/icons/DecorativeDivider.vue';
import DiamondIcon from '../components/icons/DiamondIcon.vue';
import heroVideo from '../0_Cooking_Chef_1920x1080.mp4';

gsap.registerPlugin(ScrollTrigger);

const main = ref<HTMLElement | null>(null);

// Meta Tags
useTitle('Art of Dum Sustainability | Eco-Friendly Luxury Dining');

let ctx: gsap.Context;

onMounted(() => {
  // Update Meta Description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', 'Art of Dum is committed to sustainable fine dining with zero-plastic policies, reusable packaging, and eco-conscious practices in luxury Indian cuisine.');
  } else {
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = 'Art of Dum is committed to sustainable fine dining with zero-plastic policies, reusable packaging, and eco-conscious practices in luxury Indian cuisine.';
    document.head.appendChild(meta);
  }

  nextTick(() => {
    ctx = gsap.context((self) => {
      // Feature images animation
      const featureImages = self.selector('.feature-image');
      featureImages.forEach((image: HTMLElement, index: number) => {
        gsap.fromTo(image,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: image,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.2
          }
        );
      });

      // Feature cards animation
      const featureCards = self.selector('.feature-card');
      featureCards.forEach((card: HTMLElement, index: number) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            },
            delay: index * 0.2
          }
        );
      });
    }, main.value!);
  });
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <div class="min-h-screen bg-background text-text overflow-x-hidden" ref="main">
    <!-- Hero Section -->
    <section class="relative h-[100dvh] min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <video
          autoplay
          muted
          loop
          playsinline
          class="w-full h-full object-cover"
        >
          <source :src="heroVideo" type="video/mp4" />
        </video>
        <div class="absolute inset-0 bg-black/60"></div>
      </div>

      <div
        class="relative z-10 text-center px-4 max-w-6xl mx-auto"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 1000, ease: 'easeOut', delay: 300 } }"
      >
        <div class="text-gold/80 text-sm md:text-base tracking-[0.3em] uppercase mb-6">Art of Dum Sustainability</div>
        <h1 class="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-text">Dum With a Conscience</h1>
      
      </div>

      <!-- <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div class="w-6 h-10 border-2 border-text-muted flex justify-center items-start p-1">
          <div class="w-1 h-2 bg-text-muted animate-bounce"></div>
        </div>
      </div> -->
    </section>

    <!-- Sustainability Highlight Section -->
    <section class="w-full min-h-[80vh] flex items-center bg-[#f0ebe1] pt-16 pb-28 sm:py-0">
      <div class="w-full px-4 sm:px-8 lg:px-16">
        <div class="max-w-3xl mx-auto text-center mb-10">
          <p class="text-text-muted leading-relaxed">
            Art of Dum embraces sustainability without compromising luxury. Our zero-plastic policy, reusable glass jars, traditional clay handis, and steel cutlery ensure every dining experience is environmentally responsible. From restaurant to home delivery, we merge mindful practices with uncompromised elegance.
          </p>
        </div>
        <div class="flex gap-6 items-stretch">
          
          <div class="hidden md:flex items-center">
          
            <!-- <div
              class="text-xs tracking-[0.6em] uppercase text-text-muted"
              style="writing-mode: vertical-rl; text-orientation: mixed;"
            >
              Sustainability
            </div> -->
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
            <div
              class="feature-card"
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 200 } }"
            >
              <div class="feature-image overflow-hidden shadow-2xl shadow-black/50 h-72">
                <img
                  src="https://images.pexels.com/photos/886521/pexels-photo-886521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Eco-Friendly Practices"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="mt-4 text-center">
                <h3 class="font-serif text-xl md:text-2xl text-gold tracking-[0.25em] uppercase">
                  Eco-Friendly Practices
                </h3>
              </div>
            </div>

            <div
              class="feature-card"
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 300 } }"
            >
              <div class="feature-image overflow-hidden shadow-2xl shadow-black/50 h-72">
                <img
                  src="https://images.pexels.com/photos/3730760/pexels-photo-3730760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Reusable & Premium Packaging"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="mt-4 text-center">
                <h3 class="font-serif text-xl md:text-2xl text-gold tracking-[0.25em] uppercase">
                  Reusable & Premium Packaging
                </h3>
              </div>
            </div>

            <div
              class="feature-card"
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 400 } }"
            >
              <div class="feature-image overflow-hidden shadow-2xl shadow-black/50 h-72">
                <img
                  src="https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Sustainable Dining at Home"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="mt-4 text-center">
                <h3 class="font-serif text-xl md:text-2xl text-gold tracking-[0.25em] uppercase">
                  Sustainable Dining at Home
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- <div class="pt-32 pb-20 sm:pt-40 sm:pb-32 bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8"> -->

        <!-- Eco-Friendly Practices Section -->
        <!-- <div class="space-y-20 max-w-4xl mx-auto mb-20">
          <div
            v-motion-fade-visible-once
          >
            <div class="text-center mb-8">
              <h2 class="font-serif text-4xl text-gold mb-4">Eco-Friendly Practices</h2>
              <DecorativeDivider />
            </div>

            <div class="flex flex-col gap-y-8">
              <div
                v-for="(item, index) in [
                  { name: 'Zero-Plastic Policy', description: 'We\'ve completely eliminated single-use plastics from our operations, ensuring every meal serves the planet as well as our guests.' },
                  { name: 'Sustainable Sourcing', description: 'Our ingredients are sourced from local farms and ethical suppliers who share our commitment to environmental stewardship.' },
                  { name: 'Reusable Packaging', description: 'All our delivery and takeaway services use premium glass jars and containers that can be returned, sanitized, and reused.' },
                  { name: 'Eco-Conscious Design', description: 'Our restaurant features energy-efficient systems, water conservation measures, and sustainable building materials.' }
                ]"
                :key="index"
                class="feature-card p-6 bg-background/60 border border-gold/20"
              >
                <h3 class="font-serif text-2xl text-gold mb-2">{{ item.name }}</h3>
                <p class="text-text-muted leading-relaxed">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div> -->
<!-- 
        <div class="max-w-6xl mx-auto mb-20">
          <div class="text-center mb-16">
            <h2 class="font-serif text-4xl text-gold mb-4">Reusable & Premium Packaging</h2>
            <DecorativeDivider />
          </div> -->

          <!-- <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div
              class="feature-card"
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 200 } }"
            >
              <div class="feature-image overflow-hidden shadow-2xl shadow-black/50 h-64 mb-6">
                <img
                  src="https://images.pexels.com/photos/1400165/pexels-photo-1400165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Glass Jars"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="text-center px-4">
                <h3 class="font-serif text-2xl text-gold mb-4">Glass Jars</h3>
                <p class="text-text-muted">Premium glass containers for all our sauces, chutneys, and prepared items. Fully reusable and returnable for credit.</p>
              </div>
            </div>

            <div
              class="feature-card"
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 300 } }"
            >
              <div class="feature-image overflow-hidden shadow-2xl shadow-black/50 h-64 mb-6">
                <img
                  src="https://images.pexels.com/photos/952632/pexels-photo-952632.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Clay Handis"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="text-center px-4">
                <h3 class="font-serif text-2xl text-gold mb-4">Clay Handis</h3>
                <p class="text-text-muted">Traditional clay pots for authentic cooking and elegant presentation. Natural, sustainable, and enhances flavor.</p>
              </div>
            </div>

            <div
              class="feature-card"
              v-motion
              :initial="{ opacity: 0, y: 30 }"
              :visible-once="{ opacity: 1, y: 0, transition: { delay: 400 } }"
            >
              <div class="feature-image overflow-hidden shadow-2xl shadow-black/50 h-64 mb-6">
                <img
                  src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Farm Produce"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="text-center px-4">
                <h3 class="font-serif text-2xl text-gold mb-4">Local Sourcing</h3>
                <p class="text-text-muted">Partnering with local farms and ethical suppliers who share our commitment to environmental stewardship.</p>
              </div>
            </div>
          </div> -->
        <!-- </div> -->

        <!-- Call to Action -->
        <!-- <div
          class="text-center"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut', delay: 500 } }"
        >
          <div class="relative inline-block">
            <div class="absolute inset-0 bg-gold/20 blur-xl"></div>
            <div class="relative bg-background/80 backdrop-blur-sm border border-gold/30 p-8">
              <h3 class="font-serif text-3xl text-gold mb-4">Join Our Sustainable Journey</h3>
              <p class="text-text-muted leading-relaxed max-w-2xl mx-auto mb-8">
                Experience luxury dining that respects both tradition and tomorrow.
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <router-link
                  to="/menu"
                  class="inline-flex items-center justify-center px-8 py-3 border border-gold text-gold font-serif tracking-widest uppercase text-sm hover:bg-gold hover:text-background transition-colors duration-300"
                >
                  Explore Menu
                </router-link>
                <router-link
                  to="/contact"
                  class="inline-flex items-center justify-center px-8 py-3 border border-text text-text font-serif tracking-widest uppercase text-sm hover:bg-text hover:text-background transition-colors duration-300"
                >
                  Contact Us
                </router-link>
              </div>
            </div>
          </div>
        </div> -->
      <!-- </div>
    </div> -->
  </div>
</template>