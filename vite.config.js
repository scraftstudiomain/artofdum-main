import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

console.info('[build] Loading Vite config with Vue plugin support and performance optimizations')

// Standard Vue setup with performance optimizations
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Allow defining custom elements via components when needed.
          isCustomElement: () => false
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router'],
          'animations': ['gsap', '@vueuse/motion'],
          'ui': ['@vueuse/core']
        }
      }
    },
    minify: 'terser',
    sourcemap: false,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000
  }
})
