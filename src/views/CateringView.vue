<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DecorativeDivider from '../components/icons/DecorativeDivider.vue';

gsap.registerPlugin(ScrollTrigger);

const main = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

const services = [
  {
    title: 'Weddings',
    description: 'Create an unforgettable culinary experience for your special day with bespoke menus that reflect your story.',
    image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    title: 'Corporate Galas',
    description: 'Impress your clients and colleagues with sophisticated dining that elevates your corporate events and meetings.',
    image: 'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    title: 'Private Soirées',
    description: 'From intimate family gatherings to lavish parties, we bring the royal kitchen experience to your home.',
    image: 'https://images.pexels.com/photos/2291463/pexels-photo-2291463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

const processSteps = [
    { step: "01", title: "Consultation", description: "We begin with a personal consultation to understand your vision, theme, and culinary desires." },
    { step: "02", title: "Menu Curation", description: "Our master chefs craft a bespoke menu, offering a tasting session to perfect every dish for your palate." },
    { step: "03", title: "Flawless Execution", description: "Our team ensures impeccable service and presentation, allowing you to enjoy a seamless and memorable event." }
];

const form = ref({
  name: '', email: '', phone: '', eventType: '', guests: '', eventDate: '', venue: '', services: [] as string[], message: ''
});

const handleSubmit = () => {
  alert('Thank you for your catering inquiry! Our team will be in touch with you shortly.');
  form.value = { name: '', email: '', phone: '', eventType: '', guests: '', eventDate: '', venue: '', services: [], message: '' };
};

onMounted(() => {
  nextTick(() => {
    ctx = gsap.context((self) => {
      if (!self || !self.selector) return;

      // Pinned Services Showcase
      const servicesSection = self.selector('.services-section')[0];
      const serviceItems = self.selector('.service-item');
      if (servicesSection && serviceItems.length > 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: servicesSection,
            start: 'top top',
            end: '+=2000',
            pin: true,
            scrub: 1,
          }
        });
        
        serviceItems.forEach((item, index) => {
          const image = item.querySelector('.service-bg-image');
          const content = item.querySelector('.service-content');
          
          tl.fromTo(image, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 1 }, `+=${index > 0 ? 1 : 0}`);
          tl.fromTo(content, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.5');

          if (index < serviceItems.length - 1) {
            tl.to(content, { opacity: 0, y: -30, duration: 0.5 }, '+=2');
            tl.to(image, { opacity: 0, scale: 1.05, duration: 1 }, '-=0.5');
          }
        });
      }

      // Animated Process Line
      const processSection = self.selector('.process-section')[0];
      if (processSection) {
        gsap.from(self.selector('.process-line'), {
          scaleY: 0,
          scrollTrigger: {
            trigger: processSection,
            start: 'top center',
            end: 'bottom bottom',
            scrub: 1,
          }
        });
        
        self.selector('.process-step').forEach((step, index) => {
          gsap.from(step, {
            opacity: 0,
            y: 50,
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            }
          });
        });
      }

      // Form animation
      const formSection = self.selector('.form-section')[0];
      if (formSection) {
        gsap.from(self.selector('.form-field'), {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          scrollTrigger: {
            trigger: formSection,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          }
        });
      }

    }, main.value!);
  });
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <div ref="main" class="bg-background text-text overflow-hidden">
    <!-- Page Header -->
    <div class="pt-32 pb-20 sm:pt-40 sm:pb-32">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          class="text-center"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
        >
          <h1 class="font-serif text-5xl md:text-7xl font-bold text-text">A Royal Affair, Delivered</h1>
          <p class="mt-4 text-lg text-text-muted max-w-3xl mx-auto">
            Allow us to bring the Art of Dum experience to your most cherished events. Our bespoke catering service is designed to transform any occasion into a royal celebration.
          </p>
        </div>
      </div>
    </div>

    <!-- Pinned Services Section -->
    <section class="services-section h-screen w-full relative">
      <div 
        v-for="(service, index) in services" 
        :key="service.title"
        class="service-item absolute inset-0"
      >
        <div class="service-bg-image absolute inset-0 opacity-0">
          <img :src="service.image" :alt="service.title" class="w-full h-full object-cover" loading="lazy" decoding="async">
          <div class="absolute inset-0 bg-black/60"></div>
        </div>
        <div class="service-content relative h-full flex items-center justify-center text-center px-4 opacity-0">
          <div class="max-w-2xl">
            <h3 class="font-serif text-5xl md:text-7xl text-gold mb-6">{{ service.title }}</h3>
            <p class="text-text-muted text-lg md:text-xl leading-relaxed">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="process-section py-20 sm:py-32 bg-background relative">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16" v-motion-fade-visible-once>
          <h2 class="font-serif text-4xl text-text mb-4">Our Royal Process</h2>
          <DecorativeDivider />
        </div>
        <div class="relative max-w-2xl mx-auto">
          <div class="process-line absolute left-4 md:left-1/2 top-0 h-full w-px bg-white/20 origin-top"></div>
          <div class="space-y-20">
            <div 
              v-for="(step) in processSteps" 
              :key="step.step"
              class="process-step relative pl-12 md:pl-0"
            >
              <div class="md:text-center">
                <div class="absolute top-0 left-0 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-background border-2 border-gold flex items-center justify-center font-serif text-gold">
                  {{ step.step }}
                </div>
                <div class="md:max-w-md md:mx-auto">
                  <h3 class="font-serif text-3xl text-gold mb-3 mt-10 md:mt-16">{{ step.title }}</h3>
                  <p class="text-text-muted">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Catering Form Section -->
    <section class="form-section py-20 sm:py-32 bg-background">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16" v-motion-fade-visible-once>
            <h2 class="font-serif text-5xl text-text mb-4">Begin Your Legacy</h2>
            <p class="text-lg text-text-muted">Share the details of your occasion to start the journey.</p>
          </div>
          <form @submit.prevent="handleSubmit" class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div class="form-field relative"><input type="text" id="name" v-model="form.name" required class="form-input peer"><label for="name" class="form-label">Full Name</label></div>
              <div class="form-field relative"><input type="email" id="email" v-model="form.email" required class="form-input peer"><label for="email" class="form-label">Email Address</label></div>
              <div class="form-field relative"><input type="tel" id="phone" v-model="form.phone" required class="form-input peer"><label for="phone" class="form-label">Phone Number</label></div>
              <div class="form-field relative"><input type="number" id="guests" v-model="form.guests" required class="form-input peer"><label for="guests" class="form-label">Number of Guests</label></div>
              <div class="form-field relative">
                <select id="eventType" v-model="form.eventType" required class="form-input peer">
                  <option value="" disabled selected></option>
                  <option>Wedding</option><option>Corporate Gala</option><option>Private Soirée</option><option>Other</option>
                </select>
                <label for="eventType" class="form-label">Type of Event</label>
              </div>
              <div class="form-field relative">
                <input type="text" id="eventDate" v-model="form.eventDate" required class="form-input peer" onfocus="(this.type='date')" onblur="(this.type='text')">
                <label for="eventDate" class="form-label">Event Date</label>
              </div>
            </div>
            <div class="form-field relative"><input type="text" id="venue" v-model="form.venue" class="form-input peer"><label for="venue" class="form-label">Venue / Location</label></div>
            <div class="form-field">
              <label class="block text-text-muted mb-4">Desired Services</label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" value="Buffet" v-model="form.services" class="form-checkbox"><span>Buffet</span></label>
                <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" value="Plated Dinner" v-model="form.services" class="form-checkbox"><span>Plated Dinner</span></label>
                <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" value="Passed Appetizers" v-model="form.services" class="form-checkbox"><span>Passed Appetizers</span></label>
                <label class="flex items-center space-x-3 cursor-pointer"><input type="checkbox" value="Live Station" v-model="form.services" class="form-checkbox"><span>Live Station</span></label>
              </div>
            </div>
            <div class="form-field relative"><textarea id="message" v-model="form.message" rows="4" class="form-input peer"></textarea><label for="message" class="form-label">Additional Details</label></div>
            <div class="text-center pt-8 form-field">
              <button type="submit" class="bg-gold text-background font-bold py-4 px-16 uppercase tracking-widest transition-transform hover:scale-105">Submit Inquiry</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.form-input {
  @apply w-full bg-transparent border-b border-white/20 pt-4 pb-2 text-text transition-colors duration-300 outline-none;
}
.form-label {
  @apply absolute top-4 left-0 text-text-muted transition-all duration-300 pointer-events-none;
}
.form-input:focus,
.form-input:not(:placeholder-shown) {
  @apply border-gold;
}
.form-input:focus ~ .form-label,
.form-input:not(:placeholder-shown) ~ .form-label {
  @apply -translate-y-4 text-xs text-gold;
}
/* Handle date input label correctly */
input[type="text"][onblur="(this.type='text')"]:not(:placeholder-shown) ~ .form-label,
input[type="date"] ~ .form-label {
    @apply -translate-y-4 text-xs text-gold;
}
select.form-input {
  @apply appearance-none;
}
select.form-input:not([value=""]):not(:focus) ~ .form-label {
  @apply -translate-y-4 text-xs text-gold;
}
option { @apply bg-background text-text; }

.form-checkbox {
  @apply appearance-none w-5 h-5 border border-gold relative cursor-pointer transition-colors;
}
.form-checkbox:checked { @apply bg-gold; }
.form-checkbox:checked::after {
  content: '✔';
  @apply absolute text-background top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm;
}
</style>
