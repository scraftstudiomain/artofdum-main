<script setup lang="ts">
import { ref } from 'vue';
import DecorativeDivider from '../components/icons/DecorativeDivider.vue';
import DiamondIcon from '../components/icons/DiamondIcon.vue';

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const handleSubmit = () => {
  // Placeholder for form submission logic
  alert('Thank you for your message! We will get back to you shortly.');
  form.value = { name: '', email: '', subject: '', message: '' };
};
</script>

<template>
  <div class="pt-32 pb-20 sm:pt-40 sm:pb-32 bg-background">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div 
        class="text-center mb-16 sm:mb-24"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
      >
        <h1 class="font-serif text-5xl md:text-7xl font-bold text-text">Connect with Royalty</h1>
        <p class="mt-4 text-lg text-text-muted max-w-3xl mx-auto">
          Book a table to immerse yourself in the art of Dum. For inquiries, catering requests, or private events, our team is ready to assist.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 max-w-7xl mx-auto">
        <!-- Left Column: Contact Info -->
        <div 
          class="lg:col-span-5"
          v-motion
          :initial="{ opacity: 0, x: -50 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 1000, ease: 'easeOut', delay: 200 } }"
        >
          <div class="space-y-10">
            <div>
              <h2 class="font-serif text-2xl text-gold mb-4">Our Palace</h2>
              <div class="flex items-start space-x-4 text-text-muted">
                <DiamondIcon class="w-3 h-3 flex-shrink-0 mt-1.5 text-gold" />
                <p>123 Royal Palace Road,<br>Jaipur, Rajasthan, 302001</p>
              </div>
            </div>
            <div>
              <h2 class="font-serif text-2xl text-gold mb-4">Royal Court</h2>
              <div class="space-y-3 text-text-muted">
                <div class="flex items-center space-x-4">
                  <DiamondIcon class="w-3 h-3 flex-shrink-0 text-gold" />
                  <a href="tel:+919876543210" class="hover:text-gold transition-colors">+91 987 654 3210</a>
                </div>
                <div class="flex items-center space-x-4">
                  <DiamondIcon class="w-3 h-3 flex-shrink-0 text-gold" />
                  <a href="mailto:reservations@artofdum.com" class="hover:text-gold transition-colors">reservations@artofdum.com</a>
                </div>
              </div>
            </div>
            <div>
              <h2 class="font-serif text-2xl text-gold mb-4">Opening Hours</h2>
              <div class="space-y-2 text-text-muted">
                <div class="flex items-center space-x-4">
                  <DiamondIcon class="w-3 h-3 flex-shrink-0 text-gold" />
                  <p><span class="font-bold text-text-muted w-20 inline-block">Dinner:</span> 6:00 PM - 11:00 PM</p>
                </div>
                 <div class="flex items-center space-x-4">
                  <DiamondIcon class="w-3 h-3 flex-shrink-0 text-gold" />
                  <p><span class="font-bold text-text-muted w-20 inline-block">Lunch:</span> 12:00 PM - 3:00 PM (Fri-Sun)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Contact Form -->
        <div 
          class="lg:col-span-7"
          v-motion
          :initial="{ opacity: 0, x: 50 }"
          :visible="{ opacity: 1, x: 0, transition: { duration: 1000, ease: 'easeOut', delay: 400 } }"
        >
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-text-muted mb-2">Full Name</label>
                <input type="text" id="name" v-model="form.name" required class="w-full bg-white/5 border border-white/10 py-3 px-4 text-text focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 outline-none">
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-text-muted mb-2">Email Address</label>
                <input type="email" id="email" v-model="form.email" required class="w-full bg-white/5 border border-white/10 py-3 px-4 text-text focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 outline-none">
              </div>
            </div>
            <div>
              <label for="subject" class="block text-sm font-medium text-text-muted mb-2">Subject</label>
              <input type="text" id="subject" v-model="form.subject" required class="w-full bg-white/5 border border-white/10 py-3 px-4 text-text focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 outline-none">
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-text-muted mb-2">Your Message</label>
              <textarea id="message" v-model="form.message" rows="6" required class="w-full bg-white/5 border border-white/10 py-3 px-4 text-text focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 outline-none"></textarea>
            </div>
            <div>
              <button type="submit" class="mt-4 inline-block bg-gold text-background font-bold py-4 px-12 uppercase tracking-widest transition-transform hover:scale-105">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
