<script setup lang="ts">
import DecorativeDivider from './icons/DecorativeDivider.vue';
import DiamondIcon from './icons/DiamondIcon.vue';

const socialLinks = [
  { name: 'Instagram', href: '#' },
  { name: 'Facebook', href: '#' },
  { name: 'Twitter', href: '#' },
];
</script>

<template>
  <footer class="bg-[#4e3b2d] text-text-muted border-t border-white/10">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div class="text-center mb-8 md:mb-12" v-motion-fade-visible-once>
        <router-link to="/" class="inline-block mb-4">
          <img src="/images/your-logo.png" alt="Art of Dum" class="h-24 w-auto mx-auto" />
        </router-link>
        <p class="italic">A Culinary Heritage</p>
        <DecorativeDivider />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div v-motion :initial="{opacity: 0, y: 20}" :visible-once="{opacity: 1, y: 0, transition: {delay: 200}}">
          <h3 class="font-bold text-text mb-4 uppercase tracking-widest text-sm">Location</h3>
          <p>123 Royal Palace Road,</p>
          <p>Jaipur, Rajasthan, 302001</p>
        </div>
        
        <div class="md:text-center" v-motion :initial="{opacity: 0, y: 20}" :visible-once="{opacity: 1, y: 0, transition: {delay: 300}}">
          <h3 class="font-bold text-text mb-4 uppercase tracking-widest text-sm">Reservations</h3>
          <a 
            href="mailto:reservations@artofdum.com" 
            class="hover:text-gold transition-colors link-underline"
          >
            reservations@artofdum.com
          </a>
          <p class="mt-1">+91 987 654 3210</p>
        </div>

        <div class="md:text-right" v-motion :initial="{opacity: 0, y: 20}" :visible-once="{opacity: 1, y: 0, transition: {delay: 400}}">
          <h3 class="font-bold text-text mb-4 uppercase tracking-widest text-sm">Follow Us</h3>
          <div class="flex items-center justify-center md:justify-end">
            <template v-for="(link, index) in socialLinks" :key="link.name">
              <a :href="link.href" class="hover:text-gold transition-colors link-underline">{{ link.name }}</a>
              <DiamondIcon v-if="index < socialLinks.length - 1" class="w-2 h-2 text-gold/50 mx-4" />
            </template>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-8 border-t border-white/10 text-center" v-motion-fade-visible-once>
        <p class="text-sm">&copy; 2025 Art of Dum. All Rights Reserved. Mindfully Crafted by <a href="https://scraft.studio/" target="_blank" class="underline hover:text-gold transition-colors">Scraft</a></p>
      </div>
    </div>
  </footer>
</template>
