<template>
  <section
    id="catering"
    class="relative py-20 sm:py-28 bg-brand-sesame text-brand-earthen overflow-hidden"
  >
    <!-- Background graphics -->
    <div class="absolute top-[20%] left-[-5%] w-[300px] h-[300px] rounded-full bg-brand-gold/5 blur-[80px] pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Title -->
      <div
        class="text-center mb-16 sm:mb-20"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
      >
        <p class="text-[0.7rem] sm:text-xs tracking-[0.35em] uppercase text-brand-nutmeg mb-3 font-semibold">
          ROYAL HOSPITALITY
        </p>
        <h2 class="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-brand-earthen mb-6">
          Bespoke Catering
        </h2>
        <div class="h-[1px] w-24 bg-brand-gold-dark mx-auto mb-6"></div>
        <p class="text-sm sm:text-base md:text-lg text-brand-nutmeg text-opacity-85 max-w-xl mx-auto leading-relaxed font-light">
          From intimate family gatherings to grand wedding banquets, bring the theatrical slow-cooking legacy of Art of Dum to your special occasions.
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 sm:mb-24">
        <div
          v-for="(service, index) in services"
          :key="service.title"
          class="relative group overflow-hidden shadow-xl shadow-black/15 flex flex-col justify-end min-h-[380px] p-6 bg-black"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut', delay: index * 150 } }"
        >
          <!-- Background image with zoom effect -->
          <div class="absolute inset-0 z-0">
            <img
              :src="service.image"
              :alt="service.title"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
          </div>

          <!-- Content overlay -->
          <div class="relative z-10 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <h3 class="font-serif text-2xl font-bold mb-3 text-brand-sesame group-hover:text-[#e8ba71] transition-colors">
              {{ service.title }}
            </h3>
            <p class="text-xs sm:text-sm text-white/70 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
              {{ service.description }}
            </p>
            <div class="h-[1px] w-12 bg-brand-gold mt-4 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
          </div>
        </div>
      </div>

      <!-- Timeline Orchestration -->
      <div class="border-t border-brand-nutmeg/20 pt-16 sm:pt-20">
        <h3
          class="font-serif text-2xl sm:text-3xl font-bold text-center text-brand-earthen mb-12 sm:mb-16"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
        >
          The Catering Orchestration
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 relative">
          <!-- Horizontal connecting line for desktop -->
          <div class="hidden md:block absolute top-10 left-[10%] right-[10%] h-[1px] bg-brand-gold-dark/30 z-0"></div>

          <div
            v-for="(step, index) in steps"
            :key="step.title"
            class="flex flex-col items-center text-center relative z-10"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut', delay: index * 200 } }"
          >
            <!-- Step Circle -->
            <div class="w-16 h-16 rounded-full border border-brand-nutmeg bg-brand-nutmeg text-brand-cashew font-serif text-xl font-bold flex items-center justify-center mb-6 shadow-md shadow-brand-gold/5 hover:bg-gold-gradient hover:text-brand-earthen hover:border-transparent transition-all duration-500 cursor-default">
              {{ step.step }}
            </div>
            <h4 class="font-serif text-lg font-bold text-brand-earthen mb-3">{{ step.title }}</h4>
            <p class="text-xs sm:text-sm text-brand-nutmeg text-opacity-80 max-w-xs leading-relaxed font-light">{{ step.description }}</p>
          </div>
        </div>
      </div>

      <!-- Catering Inquiry CTA -->
      <div
        class="text-center mt-16 sm:mt-20"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut', delay: 100 } }"
      >
        <button
          @click="scrollToReservation"
          class="inline-flex items-center justify-center px-10 py-4 bg-gold-gradient text-brand-earthen text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase hover:brightness-110 border border-transparent transition-all duration-300 shadow-md shadow-brand-gold/10"
        >
          Inquire About Catering
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const services = [
  {
    title: 'Weddings',
    description: 'Create an unforgettable culinary experience for your special day with bespoke menus that reflect your story, complete with live Dum stations.',
    image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    title: 'Corporate Galas',
    description: 'Impress your clients and colleagues with sophisticated dining that elevates your corporate events, meetings, and major launch parties.',
    image: 'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    title: 'Private Soirées',
    description: 'From intimate family dinners to milestone birthday parties, our master chefs bring the theatrical royal kitchen experience directly to your home.',
    image: 'https://images.pexels.com/photos/2291463/pexels-photo-2291463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
]

const steps = [
  { step: '01', title: 'Consultation', description: 'We begin with a personal consultation to understand your vision, guest list, and culinary desires.' },
  { step: '02', title: 'Menu Curation', description: 'Our master chefs craft a bespoke menu, offering a private tasting session to perfect every flavor.' },
  { step: '03', title: 'Flawless Execution', description: 'Our live-cooking team and staff ensure impeccable service and presentation on event day.' }
]

const scrollToReservation = () => {
  window.dispatchEvent(new CustomEvent('scroll-to-section', { detail: '#reservation' }))
}
</script>

<style scoped>
/* Scoped custom styling if needed */
</style>
