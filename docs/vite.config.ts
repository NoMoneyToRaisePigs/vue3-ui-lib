import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import VueTypeImports from 'vite-plugin-vue-type-imports'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueTypeImports(),
    Pages({
      dirs: './pages',
      extensions: ['vue'],
      exclude: ['**/[A-Z]*.vue'],
      importMode: 'async',
    }),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src/'),
      docs: path.resolve(__dirname, '.'),
      src: path.resolve(__dirname, '../src'),
      constants: path.join(__dirname, '../src', 'constants'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        componentWrapper: path.resolve(__dirname, 'componentWrapper.html'),
      },
    },
  },
})
