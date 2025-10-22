import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = dirname(fileURLToPath(import.meta.url))

// Export standard Vite config with Vue support and path aliases
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: () => false
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')
    },
    extensions: ['.ts', '.js', '.vue', '.json']
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(projectRoot, 'index.html')
      }
    }
  }
})
