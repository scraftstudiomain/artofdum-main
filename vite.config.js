import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Standard Vue setup; keep config minimal for compatibility with hosted builders.
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
  }
})
