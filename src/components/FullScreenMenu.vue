<script setup lang="ts">
import { X, Instagram, Youtube, Facebook, Mail, Gift } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import heroVideo from '../0_Cooking_Chef_1920x1080.mp4';

defineProps<{ isOpen: boolean }>();
const emit = defineEmits(['close']);
const router = useRouter();

interface MenuItem {
  name: string;
  path: string;
}

// Menu items matching the design (Home, About, Stay, Menu, Contact)
// Note: "Stay" maps to Experiences for now - can be updated if a Stay route is added
const menuItems: MenuItem[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Experiences', path: '/experiences' }, // Using Experiences as placeholder for Stay
  { name: 'Sustainability', path: '/sustainability' },
  { name: 'Menu', path: '/menu' },
  { name: 'Contact', path: '/contact' },
];

const closeMenu = () => {
  emit('close');
};

const handleReservation = () => {
  router.push('/contact');
  closeMenu();
};

// Contact information
const contactInfo = {
  locations: 'Chembur | Worli | Kamala Mills | Thane | Andheri | Saki Vihar | Belapur',
  phone: '+91 987 654 3210',
  email: 'reservations@artofdum.com'
};

// Social media links
const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Email', icon: Mail, href: `mailto:${contactInfo.email}` },
];
</script>

<template>
  <Transition name="menu-fade">
    <div v-if="isOpen" class="fixed inset-0 z-[60] flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden bg-background">
      <div class="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-3 md:gap-4 z-30 lg:hidden">
        <span class="text-gold text-xs md:text-sm uppercase tracking-wider font-medium">MENU</span>
        <button 
          @click="closeMenu" 
          class="text-white hover:text-gold transition-colors"
        >
          <X class="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
      <!-- Left Side - Background Image with Navigation (2/3 width on desktop, full on mobile) -->
      <div class="relative w-full lg:w-2/3 min-h-[60vh] lg:h-full shrink-0">
        <!-- Background Video -->
        <div class="absolute inset-0 overflow-hidden">
          <video
            class="w-full h-full object-cover"
            :src="heroVideo"
            autoplay
            muted
            loop
            playsinline
          />
          <div class="absolute inset-0 bg-black/60"></div>
        </div>
        
        <!-- Logo in upper left -->
        <div class="absolute top-4 left-4 md:top-8 md:left-8 z-10">
          <img
            src="/images/your-logo.png"
            alt="Art of Dum"
            class="h-10 w-10 md:h-12 md:w-12 lg:h-16 lg:w-16"
          />
        </div>

        <!-- Navigation Links - Vertically centered on left -->
        <nav class="relative z-10 h-full flex items-center pl-8 md:pl-12 lg:pl-16">
          <ul class="space-y-4 md:space-y-6">
            <li 
              v-for="(item, index) in menuItems" 
              :key="item.name"
              v-motion
              :initial="{ opacity: 0, x: -30 }"
              :enter="{ opacity: 1, x: 0, transition: { delay: 200 + index * 100, duration: 600, ease: 'easeOut' } }"
            >
              <router-link
                :to="item.path"
                class="menu-link text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white hover:text-gold transition-colors duration-300 block font-serif"
                @click="closeMenu" 
              >
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Right Side - Dark Panel with Contact Info (1/3 width on desktop, full on mobile) -->
      <div class="relative w-full lg:w-1/3 h-auto lg:h-full bg-background flex flex-col shrink-0">
        <!-- Close Button and MENU text in top right -->
        <div class="hidden lg:flex absolute top-4 right-4 md:top-6 md:right-6 items-center gap-3 md:gap-4 z-20">
          <span class="text-gold text-xs md:text-sm uppercase tracking-wider font-medium">MENU</span>
          <button 
            @click="closeMenu" 
            class="text-text-muted hover:text-text transition-colors"
          >
            <X class="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <!-- Logo centered near top -->
        <div class="flex justify-center mt-16 md:mt-20 mb-8 md:mb-12">
          <img
            src="/images/your-logo.png"
            alt="Art of Dum"
            class="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24"
          />
        </div>

        <!-- Contact Information -->
        <div class="flex-1 flex flex-col justify-center px-6 md:px-8 py-8 text-white">
          <div class="space-y-3 md:space-y-4 text-sm md:text-base">
            <p class="font-semibold text-gold mb-2">Find us</p>
            <p class="text-xs md:text-sm leading-relaxed">{{ contactInfo.locations }}</p>
            <p class="mt-4">{{ contactInfo.phone }}</p>
            <a 
              :href="`mailto:${contactInfo.email}`"
              class="block hover:text-gold transition-colors break-all"
            >
              {{ contactInfo.email }}
            </a>
          </div>

          <!-- Social Media Icons -->
          <div class="flex items-center gap-4 md:gap-6 mt-8 md:mt-12">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              class="text-white hover:text-gold transition-colors"
              :aria-label="social.name"
            >
              <component :is="social.icon" class="w-5 h-5 md:w-6 md:h-6" />
            </a>
          </div>
        </div>

        <!-- Nominee Label (optional - can be removed if not needed) -->
        <!-- <div class="absolute right-0 top-1/2 -translate-y-1/2 transform -rotate-90 origin-center">
          <div class="bg-black px-4 py-2 text-white text-xs uppercase tracking-wider">
            <div>W.</div>
            <div>Nominee</div>
          </div>
        </div> -->

        <!-- Reserve Button at bottom -->
        <div class="p-4 md:p-8 pb-6 md:pb-8">
          <button
            @click="handleReservation"
            class="w-full bg-gold text-background font-semibold py-3 md:py-4 px-4 md:px-6 flex items-center justify-between hover:bg-gold/90 transition-all duration-300 group"
          >
            <span class="uppercase tracking-wider text-sm md:text-base">Reserve a Table</span>
            <Gift class="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.4s ease;
}
.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}

.menu-link {
  font-family: 'Bagatela', serif;
  letter-spacing: 0.05em;
  position: relative;
}

.menu-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: currentColor;
  transition: width 0.3s ease;
}

.menu-link:hover::after {
  width: 100%;
}
</style>
