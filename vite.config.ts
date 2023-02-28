import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// import VueTypeImports from 'vite-plugin-vue-type-imports'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // VueTypeImports(),
    vue(),
    // VueTypeImports(),
  ],
  resolve: {
    alias: {
      'src': path.join(__dirname, 'src/'),
      'constants': path.join(__dirname, 'src', 'constants'),
    },
  },
})
