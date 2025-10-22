import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Configuration specifically for easysite.ai compatibility
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue({
        script: {
          defineModel: true,
          propsDestructure: true
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      minify: false,
      sourcemap: true,
      // Ensure Vue files are properly processed
      rollupOptions: {
        external: [],
        output: {
          format: 'es'
        }
      }
    },
    optimizeDeps: {
      include: ['vue', 'vue-router']
    }
  }
})
