# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 restaurant website for "Art of Dum" built with TypeScript, Vite, and Tailwind CSS. The project showcases a fine dining Indian restaurant with sophisticated animations and a premium user experience.

## Development Commands

- `npm install` - Install dependencies
- `npm run dev` - Start development server (localhost:5173)
- `npm run build` - Build for production (runs TypeScript compilation first)
- `npm run preview` - Preview production build

## Architecture

### Core Technologies
- **Vue 3** with Composition API and TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Vue Router** for navigation
- **GSAP** + **ScrollTrigger** for animations
- **Lenis** for smooth scrolling
- **@vueuse/motion** for Vue animation utilities

### Project Structure
```
src/
├── components/          # Reusable Vue components
│   ├── icons/          # Custom icon components
│   └── [various sections]
├── views/              # Page-level components
├── data/               # Static data (menu, testimonials)
├── types/              # TypeScript type definitions
├── router/             # Vue Router configuration
└── style.css           # Global styles
```

### Key Components

**App.vue**: Main application wrapper with loading screen management, Lenis smooth scrolling integration, and global layout.

**LoadingScreen.vue**: Sophisticated loading animation with door-opening effect using GSAP. Includes video background and logo animations.

**AppHeader.vue**: Fixed header with scroll-based styling changes, order button, and menu toggle.

**FullScreenMenu.vue**: Full-screen navigation menu with animated menu items using @vueuse/motion.

**HomeView.vue**: Homepage layout combining multiple section components (Hero, Intro, Gallery, Testimonials, Video).

### Animation System

The project uses a multi-layered animation approach:

1. **GSAP + ScrollTrigger**: For scroll-based animations and complex sequences
2. **Lenis**: Provides smooth scrolling integrated with GSAP
3. **@vueuse/motion**: For Vue component animations
4. **CSS Transitions**: For simple state changes

Scroll animations are refreshed after route changes to ensure proper positioning.

### State Management

- **Menu State**: Managed in App.vue with reactive refs
- **Scroll Lock**: Uses @vueuse/core's useScrollLock
- **Loading States**: Coordinated between App.vue and LoadingScreen.vue

### Data Management

Menu items and testimonials are stored in `src/data/` with TypeScript interfaces defined in `src/types/`. The menu is organized by categories (starters, mains, desserts).

### Routing

Vue Router is configured with 6 routes:
- `/` - Home
- `/menu` - Menu page
- `/catering` - Catering information
- `/about` - About page
- `/blog` - Blog section
- `/contact` - Contact information

All routes reset scroll position and close the menu when navigated.

## Deployment

The project is configured for Netlify deployment with:
- Node.js 18 runtime
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Development server runs on port 3000

## Key Features

1. **Loading Experience**: Custom door-opening animation with video background
2. **Smooth Scrolling**: Lenis integration for buttery-smooth page scrolling
3. **Responsive Design**: Mobile-first approach with Tailwind CSS
4. **Micro-interactions**: Hover states, transitions, and animated elements throughout
5. **Performance**: Optimized animations and asset loading

## Development Notes

- The loading sequence waits for all images to load before starting animations
- ScrollTrigger animations are refreshed after route changes
- The body scroll is locked when the menu is open
- Component transitions use Vue's built-in transition system
- All interactive elements have hover states and smooth transitions