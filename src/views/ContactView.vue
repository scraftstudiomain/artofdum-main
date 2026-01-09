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
  <div class="pt-32 pb-20 sm:pt-40 sm:pb-32 bg-[#f0ebe1] text-gray-900">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Page Header -->
      <div 
        class="text-center mb-16 sm:mb-24"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
      >
        <h1 class="font-serif text-5xl md:text-7xl font-bold text-gray-900">Connect with the Art of Dum Team</h1>
        <p class="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
         We’d love to hear from you. 
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
              <div class="flex items-start space-x-4 text-gray-700">
                <DiamondIcon class="w-3 h-3 flex-shrink-0 mt-1.5 text-gold" />
                <p>Al Reem Island, Abu Dhabi,<br>Hazza Bin Zayed the First Street,<br>Abdullah Omran Taryam Street - Abu Dhabi</p>
              </div>
            </div>
            <div>
              <h2 class="font-serif text-2xl text-gold mb-4">Royal Court</h2>
              <div class="space-y-3 text-gray-700">
                <div class="flex items-center space-x-4">
                  <DiamondIcon class="w-3 h-3 flex-shrink-0 text-gold" />
                  <a href="tel:0568561276" class="hover:text-gold transition-colors">0568561276</a>
                </div>
                <div class="flex items-center space-x-4">
                  <DiamondIcon class="w-3 h-3 flex-shrink-0 text-gold" />
                  <a href="mailto:reservations@artofdum.com" class="hover:text-gold transition-colors">reservations@artofdum.com</a>
                </div>
              </div>
            </div>
            <div>
              <h2 class="font-serif text-2xl text-gold mb-4">Opening Hours</h2>
              <div class="space-y-2 text-gray-700">
                <div class="flex items-center space-x-4">
                  <DiamondIcon class="w-3 h-3 flex-shrink-0 text-gold" />
                  <div class="flex items-center gap-3">
                    <span class="font-bold text-gray-800">Sunday to Thursday:</span>
                    <span>11:00 AM - 11:00 PM</span>
                  </div>
                </div>
                 <div class="flex items-center space-x-4">
                  <DiamondIcon class="w-3 h-3 flex-shrink-0 text-gold" />
                  <div class="flex items-center gap-3">
                    <span class="font-bold text-gray-800">Friday to Saturday:</span>
                    <span>11:00 AM - 12:00 AM</span>
                  </div>
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
                <label for="name" class="block text-sm font-medium text-gray-800 mb-2">Full Name</label>
                <input type="text" id="name" v-model="form.name" required class="w-full bg-white/70 border border-gray-300 py-3 px-4 text-gray-900 focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 outline-none">
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-800 mb-2">Email Address</label>
                <input type="email" id="email" v-model="form.email" required class="w-full bg-white/70 border border-gray-300 py-3 px-4 text-gray-900 focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 outline-none">
              </div>
            </div>
            <div>
              <label for="subject" class="block text-sm font-medium text-gray-800 mb-2">Subject</label>
              <input type="text" id="subject" v-model="form.subject" required class="w-full bg-white/70 border border-gray-300 py-3 px-4 text-gray-900 focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 outline-none">
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-gray-800 mb-2">Your Message</label>
              <textarea id="message" v-model="form.message" rows="6" required class="w-full bg-white/70 border border-gray-300 py-3 px-4 text-gray-900 focus:ring-2 focus:ring-gold focus:border-gold transition-all duration-300 outline-none"></textarea>
            </div>
            <div>
              <button type="submit" class="mt-4 inline-block bg-gold text-background font-bold py-4 px-12 uppercase tracking-widest transition-transform hover:scale-105">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Google Map Section -->
      <div 
        class="mt-16 sm:mt-24 max-w-7xl mx-auto"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visible="{ opacity: 1, y: 0, transition: { duration: 1000, ease: 'easeOut', delay: 600 } }"
      >
        <div class="w-full h-[450px] rounded-2xl overflow-hidden shadow-xl border-4 border-white/50">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3630.9159701722974!2d54.400385899999996!3d24.488368199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e67eccaee4d9d%3A0x2a2770fe3ef7d91d!2sArt%20of%20Dum%20-%20Reem%20Mall!5e0!3m2!1sen!2sin!4v1767958216385!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style="border:0;" 
            allowfullscreen="true" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade"
            class="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
