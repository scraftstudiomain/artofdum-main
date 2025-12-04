<script setup lang="ts">
import DecorativeDivider from './icons/DecorativeDivider.vue';
import noonLogo from '../noon-2.svg';
import talabatLogo from '../Talabat_logo-removebg-preview.png';
import careemLogo from '../Careem_logo.svg.png';
import deliverooLogo from '../deliveroo-logo.svg';
import keetaLogo from '../keeta logo.png';
import zometoLogo from '../zometo.png';

const partners = [
  { name: 'Noon', link: '#', logo: noonLogo },
  { name: 'Talabat', link: '#', logo: talabatLogo },
  { name: 'Careem', link: '#', logo: careemLogo },
  { name: 'Deliveroo', link: '#', logo: deliverooLogo },
  { name: 'Zomato', link: '#', logo: zometoLogo },
  { name: 'Keeta', link: '#', logo: keetaLogo },
];
</script>

<template>
  <section class="py-12 sm:py-16" style="background-color: #4e3b2d">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-8">
        <h2 class="font-serif text-4xl md:text-5xl text-gold">Order Via</h2>
        <DecorativeDivider />
      </div>

      <div
        class="flex flex-row flex-nowrap gap-8 items-center justify-center max-w-5xl mx-auto overflow-x-auto"
      >
        <a
          v-for="partner in partners"
          :key="partner.name"
          :href="partner.link"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center"
        >
          <img
            :src="partner.logo"
            :alt="`${partner.name} logo`"
            class="h-10 sm:h-12 md:h-14 w-auto object-contain"
          />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partner-logo {
  max-width: 100%;
  height: auto;
}
</style>
