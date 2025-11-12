<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DiamondIcon from './icons/DiamondIcon.vue';

gsap.registerPlugin(ScrollTrigger);

interface Review {
  id: number;
  text: string;
  source: string;
  dishImage: string;
}

const reviews: Review[] = [
  {
    id: 1,
    text: "The best Dum Biryani in Dubai!",
    source: "Zomato",
    dishImage: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2"
  },
  {
    id: 2,
    text: "Authentic flavors that remind me of home. Exceptional service!",
    source: "Talabat",
    dishImage: "https://images.pexels.com/photos/14832360/pexels-photo-14832360.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2"
  },
  {
    id: 3,
    text: "A royal dining experience. The Galouti Kebabs are divine!",
    source: "Careem",
    dishImage: "https://images.pexels.com/photos/2092916/pexels-photo-2092916.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2"
  },
  {
    id: 4,
    text: "Perfect blend of tradition and taste. Highly recommended!",
    source: "Noon",
    dishImage: "https://images.pexels.com/photos/941864/pexels-photo-941864.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2"
  },
  {
    id: 5,
    text: "Outstanding food quality and presentation. Will visit again!",
    source: "Zomato",
    dishImage: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2"
  }
];

const currentIndex = ref(0);
let autoRotateInterval: number | null = null;

const totalReviews = reviews.length;

// Drag/Swipe functionality
type DragEventType = MouseEvent | TouchEvent | PointerEvent;

const isDragging = ref(false);
const dragStartX = ref(0);
const dragCurrentX = ref(0);
const dragOffset = ref(0);
const carouselRef = ref<HTMLElement | null>(null);
const activePointerId = ref<number | null>(null);

const isTouchInput = (event: DragEventType): event is TouchEvent => 'touches' in event || 'changedTouches' in event;
const getClientX = (event: DragEventType): number | null => {
  if (isTouchInput(event)) {
    if (event.touches.length > 0) {
      return event.touches[0].clientX;
    }
    if (event.changedTouches.length > 0) {
      return event.changedTouches[0].clientX;
    }
    return null;
  }
  
  if ('clientX' in event) {
    return event.clientX;
  }
  
  return null;
};

const handleDragStart = (event: DragEventType) => {
  if ('pointerType' in event && event.pointerType === 'mouse' && 'button' in event && event.button !== 0) {
    return;
  }
  
  event.stopPropagation();
  if (isTouchInput(event) && event.cancelable) {
    event.preventDefault();
  }
  
  isDragging.value = true;
  stopAutoRotate();
  
  const clientX = getClientX(event);
  if (clientX === null) return;
  
  dragStartX.value = clientX;
  dragCurrentX.value = clientX;
  dragOffset.value = 0;
  
  if ('pointerId' in event) {
    activePointerId.value = event.pointerId;
    carouselRef.value?.setPointerCapture?.(event.pointerId);
  }
  
  if (carouselRef.value) {
    carouselRef.value.style.cursor = 'grabbing';
  }
};

const handleDragMove = (event: DragEventType) => {
  if (!isDragging.value) return;
  if ('pointerId' in event && activePointerId.value !== null && event.pointerId !== activePointerId.value) return;
  
  if (event.cancelable) {
    event.preventDefault();
  }
  event.stopPropagation();
  
  const clientX = getClientX(event);
  if (clientX === null) return;
  
  dragCurrentX.value = clientX;
  dragOffset.value = dragCurrentX.value - dragStartX.value;
  
  // Apply visual feedback during drag
  if (carouselRef.value) {
    const cards = carouselRef.value.querySelectorAll('.review-card');
    const offsetPercent = dragOffset.value / (carouselRef.value.clientWidth * 0.3);
    cards.forEach((card, index) => {
      const cardElement = card as HTMLElement;
      if (index === 1) { // Active card (center)
        cardElement.classList.add('dragging');
        cardElement.style.transform = `translateX(${dragOffset.value * 0.5}px) scale(${1 - Math.abs(offsetPercent) * 0.1})`;
      }
    });
  }
};

const handleDragEnd = (event?: DragEventType) => {
  if (!isDragging.value) return;
  if (event) {
    if ('pointerId' in event && activePointerId.value !== null && event.pointerId === activePointerId.value) {
      try {
        carouselRef.value?.releasePointerCapture?.(event.pointerId);
      } catch {
        // Ignore browsers that don't support pointer capture
      }
    }
    event.stopPropagation();
  }
  
  const wasDragging = isDragging.value;
  isDragging.value = false;
  activePointerId.value = null;
  
  if (carouselRef.value) {
    carouselRef.value.style.cursor = 'grab';
    
    // Reset transform and remove dragging class
    const cards = carouselRef.value.querySelectorAll('.review-card');
    cards.forEach((card) => {
      const cardElement = card as HTMLElement;
      cardElement.style.transform = '';
      cardElement.classList.remove('dragging');
    });
  }
  
  // Determine if swipe was significant enough to change review
  const swipeThreshold = 50; // Minimum pixels to trigger swipe
  const swipeDistance = Math.abs(dragOffset.value);
  
  if (wasDragging && swipeDistance > swipeThreshold) {
    if (dragOffset.value > 0) {
      // Swiped right - go to previous
      prevReview();
    } else {
      // Swiped left - go to next
      nextReview();
    }
  }
  
  // Reset drag values
  dragStartX.value = 0;
  dragCurrentX.value = 0;
  dragOffset.value = 0;
  
  // Restart auto-rotate after a delay
  setTimeout(() => {
    startAutoRotate();
  }, 2000);
};

// Get visible reviews (previous, current, next)
const getVisibleReviews = () => {
  const prevIndex = currentIndex.value === 0 ? totalReviews - 1 : currentIndex.value - 1;
  const nextIndex = currentIndex.value === totalReviews - 1 ? 0 : currentIndex.value + 1;
  
  return {
    prev: reviews[prevIndex],
    current: reviews[currentIndex.value],
    next: reviews[nextIndex]
  };
};

const visibleReviews = computed(() => getVisibleReviews());

const goToReview = (index: number) => {
  if (isDragging.value) return; // Prevent navigation during drag
  animateTransition(() => {
    currentIndex.value = index;
  });
};

const nextReview = () => {
  if (isDragging.value) return; // Prevent navigation during drag
  stopAutoRotate();
  animateTransition(() => {
    currentIndex.value = (currentIndex.value + 1) % totalReviews;
  });
  setTimeout(() => startAutoRotate(), 2000);
};

const prevReview = () => {
  if (isDragging.value) return; // Prevent navigation during drag
  stopAutoRotate();
  animateTransition(() => {
    currentIndex.value = currentIndex.value === 0 ? totalReviews - 1 : currentIndex.value - 1;
  });
  setTimeout(() => startAutoRotate(), 2000);
};

const animateTransition = (callback: () => void) => {
  const cardContents = document.querySelectorAll('.review-card > div');
  gsap.to(cardContents, {
    opacity: 0.5,
    duration: 0.2,
    ease: 'power2.in',
    onComplete: () => {
      callback();
      gsap.to(cardContents, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.03
      });
    }
  });
};

const startAutoRotate = () => {
  stopAutoRotate(); // Clear any existing interval
  autoRotateInterval = window.setInterval(() => {
    nextReview();
  }, 4000); // Change review every 4 seconds for smoother auto-scroll
};

const stopAutoRotate = () => {
  if (autoRotateInterval) {
    clearInterval(autoRotateInterval);
    autoRotateInterval = null;
  }
};

let scrollTriggerInstance: ScrollTrigger | null = null;

onMounted(() => {
  startAutoRotate();
  
  nextTick(() => {
    // Animate cards on scroll into view
    const section = document.querySelector('.customer-reviews-section');
    if (section) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.review-card', 
            { 
              opacity: 0, 
              scale: 0.9,
              y: 30,
              rotationY: -15
            },
            { 
              opacity: 1, 
              scale: 1,
              y: 0,
              rotationY: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out'
            }
          );
        },
        once: true
      });
    }
  });
});

onUnmounted(() => {
  stopAutoRotate();
  if (scrollTriggerInstance) {
    scrollTriggerInstance.kill();
  }
});
</script>

<template>
  <section class="customer-reviews-section relative overflow-hidden pb-16 md:pb-20 lg:pb-24">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Title -->
      <div 
        class="text-center mb-16"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 1000, ease: 'easeOut' } }"
      >
        <h2 class="font-serif text-4xl md:text-5xl text-black uppercase tracking-wider">
          Customer Reviews / Testimonials
        </h2>
      </div>

      <!-- Carousel Container -->
      <div class="relative max-w-7xl mx-auto">
        <!-- Cards Container -->
        <div 
          ref="carouselRef"
          class="flex items-center justify-center gap-4 md:gap-8 relative cursor-grab select-none"
          :class="{ 'cursor-grabbing': isDragging }"
          style="touch-action: pan-y;"
          @pointerdown="handleDragStart"
          @pointermove="handleDragMove"
          @pointerup="handleDragEnd"
          @pointercancel="handleDragEnd"
          @pointerleave="handleDragEnd"
          @lostpointercapture="handleDragEnd"
        >
          <!-- Previous Card (Left) -->
          <div 
            class="review-card review-card-inactive flex-shrink-0 w-[280px] md:w-[320px] lg:w-[360px] transition-all duration-500"
            @click="!isDragging && prevReview()"
          >
            <div class="review-card-box review-card-box-inactive rounded-lg p-6 md:p-8 h-full flex flex-col items-center">
              <!-- Circular Food Dish Image -->
              <div class="relative mb-6">
                <div class="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-gold/30 shadow-lg dish-image-inactive">
                  <img 
                    :src="visibleReviews.prev.dishImage" 
                    :alt="visibleReviews.prev.source"
                    class="w-full h-full object-cover transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
              <p class="text-black/60 text-sm md:text-base mb-4 line-clamp-3 text-center">
                "{{ visibleReviews.prev.text }}"
              </p>
              <div class="w-12 h-px bg-black/20 mb-4"></div>
              <p class="text-black/40 text-xs md:text-sm uppercase tracking-wider">
                {{ visibleReviews.prev.source }}
              </p>
              <!-- Diamond indicators -->
              <div class="flex gap-1.5 mt-6 justify-center">
                <DiamondIcon 
                  v-for="i in totalReviews" 
                  :key="i"
                  class="w-2 h-2 text-gold/30"
                />
              </div>
            </div>
          </div>

          <!-- Active Card (Center) -->
          <div 
            class="review-card review-card-active flex-shrink-0 w-[300px] md:w-[360px] lg:w-[400px] z-10 transition-all duration-500"
          >
            <div class="review-card-box review-card-box-active rounded-lg p-8 md:p-10 h-full shadow-2xl shadow-black/30 relative">
              <div class="relative z-10 flex flex-col items-center">
                <!-- Circular Food Dish Image -->
                <div class="relative mb-6">
                  <div class="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gold/60 shadow-2xl ring-4 ring-gold/20 dish-image-active">
                    <img 
                      :src="visibleReviews.current.dishImage" 
                      :alt="visibleReviews.current.source"
                      class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>
                <p class="text-black text-base md:text-lg mb-6 leading-relaxed text-center">
                  "{{ visibleReviews.current.text }}"
                </p>
                <div class="w-16 h-px bg-black/30 mb-6"></div>
                <p class="text-black/80 text-sm md:text-base uppercase tracking-wider font-medium">
                  {{ visibleReviews.current.source }}
                </p>
                <!-- Diamond indicators -->
                <div class="flex gap-1.5 mt-8 justify-center">
                  <DiamondIcon 
                    v-for="i in totalReviews" 
                    :key="i"
                    :class="[
                      'w-2 h-2 transition-all duration-300',
                      i <= currentIndex + 1 ? 'text-gold' : 'text-gold/30'
                    ]"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Next Card (Right) -->
          <div 
            class="review-card review-card-inactive flex-shrink-0 w-[280px] md:w-[320px] lg:w-[360px] transition-all duration-500"
            @click="!isDragging && nextReview()"
          >
            <div class="review-card-box review-card-box-inactive rounded-lg p-6 md:p-8 h-full flex flex-col items-center">
              <!-- Circular Food Dish Image -->
              <div class="relative mb-6">
                <div class="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-gold/30 shadow-lg dish-image-inactive">
                  <img 
                    :src="visibleReviews.next.dishImage" 
                    :alt="visibleReviews.next.source"
                    class="w-full h-full object-cover transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
              <p class="text-black/60 text-sm md:text-base mb-4 line-clamp-3 text-center">
                "{{ visibleReviews.next.text }}"
              </p>
              <div class="w-12 h-px bg-black/20 mb-4"></div>
              <p class="text-black/40 text-xs md:text-sm uppercase tracking-wider">
                {{ visibleReviews.next.source }}
              </p>
              <!-- Diamond indicators -->
              <div class="flex gap-1.5 mt-6 justify-center">
                <DiamondIcon 
                  v-for="i in totalReviews" 
                  :key="i"
                  class="w-2 h-2 text-gold/30"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Dots (Desktop) -->
        <div class="hidden md:flex justify-center gap-3 mt-12">
          <button
            v-for="(review, index) in reviews"
            :key="review.id"
            @click="goToReview(index)"
            @mouseenter="stopAutoRotate"
            @mouseleave="startAutoRotate"
            :class="[
              'w-2 h-2 rounded-full transition-all duration-300',
              index === currentIndex 
                ? 'bg-black w-8' 
                : 'bg-black/30 hover:bg-black/50'
            ]"
            :aria-label="`Go to review ${index + 1}`"
          />
        </div>

        <!-- Navigation Arrows (Mobile) -->
        <div class="md:hidden flex justify-center gap-8 mt-8">
          <button
            @click="prevReview"
            class="text-text/60 hover:text-text transition-colors p-2"
            aria-label="Previous review"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            @click="nextReview"
            class="text-text/60 hover:text-text transition-colors p-2"
            aria-label="Next review"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* CSS Custom Property for animated border */
@property --border-angle {
  syntax: "<angle>";
  inherits: true;
  initial-value: 0turn;
}

.review-card {
  transition: transform 0.3s ease-out, opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  touch-action: pan-y;
}

.review-card:active {
  cursor: grabbing;
}

/* Disable transitions during drag for smoother experience */
.review-card.dragging {
  transition: none;
}

.review-card-inactive {
  opacity: 0.4;
  transform: scale(0.9);
}

.review-card-active {
  opacity: 1;
  transform: scale(1);
}

/* Animated border card boxes */
.review-card-box {
  --border-angle: 0turn;
  --gold-color: #c9a974;
  --gold-dark: #b8955f;
  --gold-light: #d4b888;
  
  --main-bg: white;
  background-color: white;
  border: solid 4px transparent;
  border-radius: 1rem;
  
  --gradient-border: conic-gradient(
    from var(--border-angle),
    transparent 25%,
    var(--gold-light),
    var(--gold-color),
    var(--gold-dark),
    var(--gold-color),
    var(--gold-light),
    transparent 99%
  );
  
  background-image: 
    var(--gradient-border);
  background-clip: border-box;
  background-origin: border-box;
  
  /* Ensure white background shows through */
  position: relative;
}

.review-card-box::after {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: calc(1rem - 4px);
  background: white;
  z-index: 0;
  pointer-events: none;
}

.review-card-box > * {
  position: relative;
  z-index: 1;
}

.review-card-box-active {
  animation: bg-spin 3s linear infinite;
  border-width: 5px;
}

.review-card-box-active::after {
  inset: 5px;
  border-radius: calc(1rem - 5px);
}

.review-card-box-inactive {
  animation: bg-spin 4s linear infinite;
  animation-play-state: paused;
  border-width: 3px;
  opacity: 0.6;
}

.review-card-box-inactive::after {
  inset: 3px;
  border-radius: calc(1rem - 3px);
}

.review-card-box-inactive:hover {
  animation-play-state: running;
  opacity: 0.8;
}

@keyframes bg-spin {
  to {
    --border-angle: 1turn;
  }
}

/* Smooth transitions for card content */
.review-card > div {
  transition: all 0.5s ease;
}

/* Hover effects for inactive cards */
.review-card-inactive:hover {
  opacity: 0.6;
  transform: scale(0.95) translateY(-2px);
}

/* Line clamp utility */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth fade transitions */
.review-card {
  will-change: transform, opacity;
}

/* Dish image animations */
.dish-image-active {
  animation: dish-pulse 3s ease-in-out infinite;
}

.dish-image-inactive {
  transition: all 0.5s ease;
}

.dish-image-inactive:hover {
  transform: scale(1.05);
}

@keyframes dish-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(201, 169, 116, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(201, 169, 116, 0);
  }
}
</style>

