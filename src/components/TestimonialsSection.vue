<script setup lang="ts">
import { ref } from 'vue';
import { testimonials } from '../data/testimonials';
import type { Testimonial } from '../data/testimonials';
import DecorativeDivider from './icons/DecorativeDivider.vue';
import DiamondIcon from './icons/DiamondIcon.vue';

const activeTestimonial = ref<Testimonial>(testimonials[0]);

const setActive = (testimonial: Testimonial) => {
  activeTestimonial.value = testimonial;
};
</script>

<template>
  <section class="py-12 md:py-20 sm:py-32 bg-background/90">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div 
        class="text-center mb-10 md:mb-16"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 1000, ease: 'easeOut' } }"
      >
        <h2 class="font-serif text-3xl md:text-4xl lg:text-5xl text-gold">Words of Praise</h2>
        <p class="mt-2 text-base md:text-lg text-text-muted">What our patrons say about their royal experience.</p>
        <DecorativeDivider />
      </div>

      <div class="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 md:gap-12 max-w-7xl mx-auto items-center">
        <div 
          class="lg:col-span-4"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 1000, ease: 'easeOut', delay: 400 } }"
        >
          <div class="flex flex-col justify-center space-y-2">
            <button
              v-for="testimonial in testimonials"
              :key="testimonial.id"
              @click="setActive(testimonial)"
              :class="[
                'text-left p-4 transition-all duration-300 relative',
                activeTestimonial.id === testimonial.id ? '' : 'hover:bg-white/5'
              ]"
            >
              <span v-if="activeTestimonial.id === testimonial.id" class="absolute inset-0 bg-white/5" v-motion-Id="`active-testimonial-bg`"></span>
              <div class="relative">
                <p class="font-bold text-text flex items-center gap-x-3">
                  <Transition name="fade-fast">
                    <DiamondIcon v-if="activeTestimonial.id === testimonial.id" class="w-2.5 h-2.5 text-gold" />
                  </Transition>
                  <span>{{ testimonial.author }}</span>
                </p>
                <p class="text-sm text-text-muted">{{ testimonial.title }}</p>
              </div>
            </button>
          </div>
        </div>
        <div 
          class="lg:col-span-8"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 1000, ease: 'easeOut', delay: 200 } }"
        >
          <div class="relative h-full min-h-[250px] flex flex-col justify-center text-center lg:text-left">
            <Transition name="fade" mode="out-in">
              <div :key="activeTestimonial.id" class="space-y-6">
                <p class="font-serif text-2xl md:text-4xl text-text leading-snug">
                  "{{ activeTestimonial.quote }}"
                </p>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-fast-enter-active,
.fade-fast-leave-active {
  transition: opacity 0.2s ease;
}
.fade-fast-enter-from,
.fade-fast-leave-to {
  opacity: 0;
}
</style>
