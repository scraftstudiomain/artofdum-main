<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { menuCategories } from '../data/menu';
import { getMenuItemImage } from '../data/menuImages';

// Generate shape type for each item (circle or rounded-square)
const getShapeType = (index: number): 'circle' | 'rounded-square' => {
  // Alternate between circle and rounded-square
  return index % 2 === 0 ? 'circle' : 'rounded-square';
};

// Active category tracking for sticky nav
const activeCategory = ref<string>('');
const categoryRefs = ref<Record<string, HTMLElement>>({});

// Scroll to category
const scrollToCategory = (categoryId: string) => {
  const element = categoryRefs.value[categoryId];
  if (element) {
    const headerOffset = 140; // Account for sticky nav
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Update active category on scroll
const handleScroll = () => {
  const scrollPosition = window.scrollY + 200; // Offset for sticky nav
  
  // Check categories in reverse order to get the most recent one
  for (let i = menuCategories.length - 1; i >= 0; i--) {
    const category = menuCategories[i];
    const element = categoryRefs.value[category.id];
    if (element) {
      const { offsetTop } = element;
      if (scrollPosition >= offsetTop - 100) {
        activeCategory.value = category.id;
        break;
      }
    }
  }
  
  // If scrolled to top, set first category as active
  if (window.scrollY < 100) {
    activeCategory.value = menuCategories[0]?.id || '';
  }
};

// Get short category names for navigation
const getShortCategoryName = (name: string): string => {
  const shortNames: Record<string, string> = {
    'STARTERS (Non Veg.)': 'Starters (NV)',
    'STARTERS (Veg.)': 'Starters (V)',
    'SIGNATURE MAIN COURSE (Non Veg.)': 'Main (NV)',
    'SIGNATURE MAIN COURSE (Veg.)': 'Main (V)',
    'SIGNATURE BIRYANIS & PULAOS (Non Veg.)': 'Biryani (NV)',
    'SIGNATURE BIRYANIS & PULAOS (Veg.)': 'Biryani (V)',
    'INDIAN BREADS': 'Breads',
    'ROLLS (Non Veg.)': 'Rolls (NV)',
    'ROLLS (Veg.)': 'Rolls (V)',
  };
  return shortNames[name] || name;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="menu-modern-page bg-white min-h-screen">
    <!-- Header Section -->
    <div class="bg-white border-b border-gray-200 pt-32 pb-8">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h1 class="font-serif text-5xl md:text-6xl font-bold text-gray-900 mb-4">Menu</h1>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            An ode to the culinary traditions of Indian royalty, where every dish is a masterpiece of flavor and finesse.
          </p>
        </div>
      </div>
    </div>

    <!-- Sticky Category Navigation -->
    <div class="sticky top-24 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div class="w-full px-4 sm:px-6 lg:px-8">
        <div class="overflow-x-auto">
          <div class="flex gap-2 md:gap-4 py-4 min-w-max">
            <button
              v-for="category in menuCategories"
              :key="category.id"
              @click="scrollToCategory(category.id)"
              :class="[
                'px-4 py-2 rounded-full text-sm md:text-base font-medium whitespace-nowrap transition-all duration-200',
                activeCategory === category.id
                  ? 'bg-gold text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ getShortCategoryName(category.name) }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Menu Content - Full Width -->
    <div class="w-full px-4 sm:px-6 lg:px-8 py-12">
      <div class="space-y-16 max-w-7xl mx-auto">
        <!-- Category Section -->
        <div
          v-for="category in menuCategories"
          :key="category.id"
          :ref="el => { if (el) categoryRefs[category.id] = el as HTMLElement }"
          :id="category.id"
          class="category-section"
        >
          <!-- Category Title -->
          <div class="text-center mb-12">
            <h2 class="font-serif text-4xl md:text-5xl text-gray-900 mb-2">{{ category.name }}</h2>
            <div class="w-24 h-1 bg-gold mx-auto"></div>
          </div>

          <!-- Menu Items Grid - 3 per row -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div
              v-for="(item, itemIndex) in category.items"
              :key="item.id"
              class="menu-item-card flex flex-col items-center text-center"
            >
              <!-- Item Image with Random Shapes -->
              <div 
                :class="[
                  'menu-image-container mb-4 transition-all duration-300',
                  getShapeType(itemIndex) === 'circle' ? 'menu-image-circle' : 'menu-image-rounded-square'
                ]"
              >
                <img
                  :src="getMenuItemImage(item.id)"
                  :alt="item.name"
                  class="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  @error="(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop';
                  }"
                />
              </div>

              <!-- Item Content -->
              <div class="w-full">
                <h3 class="font-serif text-lg md:text-xl font-bold text-gray-900 mb-2">
                  {{ item.name }}
                </h3>
                
                <p class="text-gray-600 text-sm mb-3 leading-relaxed min-h-[3rem]">
                  {{ item.description }}
                </p>
                
                <p class="text-lg md:text-xl font-semibold text-gold mb-2">
                  AED {{ item.priceDisplay || item.price }}
                </p>
                
                <p v-if="item.allergens" class="text-xs text-gray-500 italic">
                  {{ item.allergens }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back to Top Button -->
    <button
      @click="window.scrollTo({ top: 0, behavior: 'smooth' })"
      class="fixed bottom-8 right-8 bg-gold text-white p-4 rounded-full shadow-lg hover:bg-gold/90 transition-all duration-300 hover:scale-110 z-50"
      aria-label="Back to top"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.menu-modern-page {
  scroll-behavior: smooth;
}

.category-section {
  scroll-margin-top: 160px;
}

.menu-item-card {
  transition: transform 0.3s ease;
  padding: 0.5rem;
}

.menu-item-card:hover {
  transform: translateY(-4px);
}

.menu-item-card:hover .relative {
  transform: scale(1.02);
}

/* Menu Image Containers */
.menu-image-container {
  width: 100%;
  aspect-ratio: 1;
  position: relative;
  overflow: hidden;
  background: #f9fafb;
}

/* Circle Shape - with wooden board effect */
.menu-image-circle {
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: #f5f5dc; /* Light wooden board color */
  padding: 8px;
}

.menu-image-circle::before {
  content: '';
  position: absolute;
  inset: 8px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.8);
  z-index: 1;
  pointer-events: none;
}

.menu-image-circle img {
  border-radius: 50%;
  position: relative;
  z-index: 0;
}

/* Rounded Square Shape - with double border (white outer, gold inner) */
.menu-image-rounded-square {
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 4px;
  background: white;
  position: relative;
}

.menu-image-rounded-square::before {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: 20px;
  border: 2px solid #d4af37; /* Gold inner border */
  z-index: 1;
  pointer-events: none;
}

.menu-image-rounded-square::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 24px;
  border: 2px solid white; /* White outer border */
  z-index: 2;
  pointer-events: none;
}

.menu-image-rounded-square img {
  border-radius: 20px;
  position: relative;
  z-index: 0;
}

/* Ensure images fill container */
.menu-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Custom scrollbar for category navigation */
.sticky div::-webkit-scrollbar {
  height: 6px;
}

.sticky div::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.sticky div::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.sticky div::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

