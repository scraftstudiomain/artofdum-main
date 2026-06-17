<template>
  <section
    id="menu-highlights"
    class="relative py-20 sm:py-28 bg-brand-earthen text-brand-cashew overflow-hidden"
  >
    <!-- Background subtle gold glow -->
    <div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Title -->
      <div
        class="text-center mb-12 sm:mb-16"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut' } }"
      >
        <p class="text-[0.7rem] sm:text-xs tracking-[0.35em] uppercase text-[#e8ba71] mb-3 font-semibold">
          TIMED TO PERFECTION
        </p>
        <h2 class="font-serif text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white mb-6">
          Menu Highlights
        </h2>
        <div class="h-[1px] w-24 bg-[#e8ba71] mx-auto mb-6"></div>
        <p class="text-sm sm:text-base md:text-lg text-brand-sesame/85 max-w-xl mx-auto leading-relaxed font-light">
          Savor a curated list of our royal slow-cooked delicacies, handcrafted to transport you to the historic kitchens of undivided India.
        </p>
      </div>

      <!-- Category Tabs -->
      <div
        class="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut', delay: 100 } }"
      >
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="activeCategory = cat.id"
          :class="[
            'px-5 py-2.5 text-xs sm:text-sm font-sans tracking-[0.2em] uppercase transition-all duration-300 border focus:outline-none',
            activeCategory === cat.id
              ? 'border-brand-gold bg-gold-gradient text-brand-earthen font-semibold'
              : 'border-white/10 hover:border-[#e8ba71]/60 text-white/70 hover:text-white bg-transparent'
          ]"
        >
          {{ cat.name }}
        </button>
      </div>

      <!-- Menu Items Grid -->
      <div class="relative min-h-[350px]">
        <TransitionGroup
          name="menu-stagger"
          tag="div"
          class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          <div
            v-for="item in filteredItems"
            :key="item.id"
            class="flex flex-col justify-between border-b border-white/5 pb-6 group"
          >
            <div>
              <div class="flex items-baseline justify-between gap-4 mb-2">
                <h3 class="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-[#e8ba71] transition-colors duration-300">
                  {{ item.name }}
                  <span
                    v-if="item.isSignature"
                    class="ml-2 text-[0.6rem] font-sans font-medium tracking-[0.2em] uppercase bg-brand-gold/20 text-[#ffd081] px-2 py-0.5 rounded-sm animate-pulse"
                  >
                    Signature
                  </span>
                </h3>
                <span class="text-[#e8ba71] font-serif text-lg font-bold whitespace-nowrap">
                  {{ item.price }} AED
                </span>
              </div>
              <p class="text-xs sm:text-sm text-brand-sesame/75 leading-relaxed font-sans font-light mb-2">
                {{ item.description }}
              </p>
            </div>
            <div class="text-[0.65rem] text-brand-sesame/40 italic font-sans">
              {{ item.allergens }}
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Bottom Conversion CTA -->
      <div
        class="text-center mt-16"
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, ease: 'easeOut', delay: 200 } }"
      >
        <button
          @click="scrollToReservation"
          class="inline-flex items-center justify-center px-10 py-4 bg-transparent border border-[#e8ba71] text-[#e8ba71] text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase hover:bg-gold-gradient hover:text-brand-earthen hover:border-transparent transition-all duration-300 group shadow-md hover:shadow-[#e8ba71]/10"
        >
          Book a Table to Experience More
          <span class="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeCategory = ref('starters')

const categories = [
  { id: 'starters', name: 'Starters' },
  { id: 'mains', name: 'Main Courses' },
  { id: 'biryanis', name: 'Biryanis' },
  { id: 'desserts', name: 'Desserts & Sips' }
]

const menuData = [
  // Starters
  {
    id: 's1',
    category: 'starters',
    name: 'Lahori Boti (Mutton)',
    description: 'Melt-in-mouth morsel of mutton chunks, slow-cooked in homemade spices & desi ghee, served on flaky paratha.',
    price: 63,
    allergens: 'Contains: Milk, Nuts & Gluten',
    isSignature: true
  },
  {
    id: 's2',
    category: 'starters',
    name: 'Dum Pukht Kakori (Mutton)',
    description: 'A delicate kebab of finely minced mutton, flavored with cloves & cinnamon, wrapped around a skewer & char-grilled.',
    price: 58,
    allergens: 'Contains: Milk, Nuts & Gluten',
    isSignature: true
  },
  {
    id: 's3',
    category: 'starters',
    name: 'Chandi Malai Chicken Tikka',
    description: 'Chicken marinated in an aromatic mixture of yogurt, cream & cheese, then char-grilled to gold perfection.',
    price: 55,
    allergens: 'Contains: Milk & Nuts',
    isSignature: false
  },
  {
    id: 's4',
    category: 'starters',
    name: 'Tandoori Malai Broccoli',
    description: 'Florets of broccoli marinated in cream, cheese infused with cardamom & white peppercorns, roasted in tandoor.',
    price: 45,
    allergens: 'Contains: Milk & Nuts',
    isSignature: false
  },

  // Mains
  {
    id: 'm1',
    category: 'mains',
    name: 'Dum Handi Ka Gosht (Mutton Curry)',
    description: 'Mutton curry flavored with fried onions, house spices & tomatoes cooked in a sealed clay handi.',
    price: 68,
    allergens: 'Contains: Mustard, Milk & Gluten',
    isSignature: true
  },
  {
    id: 'm2',
    category: 'mains',
    name: 'Rogan Gosht Lucknowi (Mutton)',
    description: 'A slow-cooked Awadhi mutton delicacy in a rich yogurt gravy infused with aromatic spices & saffron.',
    price: 66,
    allergens: 'Contains: Mustard, Milk & Nuts',
    isSignature: false
  },
  {
    id: 'm3',
    category: 'mains',
    name: 'Butter Chicken',
    description: 'Grilled chicken cooked in a cashew nut-based tomato gravy infused with rich cream & butter.',
    price: 58,
    allergens: 'Contains: Milk & Nuts',
    isSignature: false
  },
  {
    id: 'm4',
    category: 'mains',
    name: 'Kofta Dilkhush',
    description: 'Homemade cottage cheese dumplings cooked in rich cream & cashew nut-based tomato gravy.',
    price: 48,
    allergens: 'Contains: Milk, Nuts & Gluten',
    isSignature: false
  },

  // Biryanis
  {
    id: 'b1',
    category: 'biryanis',
    name: 'Yakhni Dum Gosht Biryani (Mutton)',
    description: 'Basmati rice simmered with mace, rose & kewra flavoured lamb finished in a sealed handi.',
    price: 76,
    allergens: 'Contains: Milk, Nuts & Gluten',
    isSignature: true
  },
  {
    id: 'b2',
    category: 'biryanis',
    name: 'Awadhi Chicken Biryani',
    description: 'A classic delicacy of the Mughal Nizam, aromatic rice layered with chicken, saffron & spices.',
    price: 70,
    allergens: 'Contains: Milk, Nuts & Gluten',
    isSignature: false
  },
  {
    id: 'b3',
    category: 'biryanis',
    name: 'Nizami Dum Subz Biryani (Vegetable)',
    description: 'Seasoned vegetables & basmati rice mélange, dum cooked with a subtly flavored vegetable extract.',
    price: 60,
    allergens: 'Contains: Milk, Nuts & Gluten',
    isSignature: false
  },
  {
    id: 'b4',
    category: 'biryanis',
    name: 'Paneer Tikka Biryani',
    description: 'Char-grilled cottage cheese cubes layered with aromatic basmati rice & cooked in dum sealed pot.',
    price: 64,
    allergens: 'Contains: Mustard, Milk, Nuts & Gluten',
    isSignature: false
  },

  // Desserts
  {
    id: 'd1',
    category: 'desserts',
    name: 'Kesar Da Phirni',
    description: 'Rice pudding flavored with saffron, cardamom, garnished with almonds & pistachios in a clay saucer.',
    price: 25,
    allergens: 'Contains: Milk & Nuts',
    isSignature: true
  },
  {
    id: 'd2',
    category: 'desserts',
    name: 'Gulab Jamun',
    description: 'Deep fried milk dumplings dipped in warm sugar syrup & garnished with silver leaf.',
    price: 25,
    allergens: 'Contains: Gluten, Nuts & Milk',
    isSignature: false
  },
  {
    id: 'd3',
    category: 'desserts',
    name: 'Mango Ginger Lassi',
    description: 'Thick, creamy blend of mango puree, yogurt, and a subtle kick of fresh ginger.',
    price: 19,
    allergens: 'Contains: Dairy',
    isSignature: false
  },
  {
    id: 'd4',
    category: 'desserts',
    name: 'Saffron Pistachio Lassi',
    description: 'Royal yogurt blend infused with saffron strands and crushed green pistachios.',
    price: 19,
    allergens: 'Contains: Dairy, Nuts',
    isSignature: true
  }
]

const filteredItems = computed(() => {
  return menuData.filter(item => item.category === activeCategory.value)
})

const scrollToReservation = () => {
  window.dispatchEvent(new CustomEvent('scroll-to-section', { detail: '#reservation' }))
}
</script>

<style scoped>
/* Transition animations for tabs */
.menu-stagger-enter-active,
.menu-stagger-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.menu-stagger-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.menu-stagger-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  position: absolute;
  width: 48%; /* Keep layout intact during leave transition */
}
</style>
