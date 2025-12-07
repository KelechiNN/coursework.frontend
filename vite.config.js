import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  // 👇 important for GitHub Pages
  base: '/coursework.frontend/',
});
