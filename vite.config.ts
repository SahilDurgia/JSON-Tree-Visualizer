import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Import the plugin
import path from 'path'; // Import path

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], // Add the plugin here
  resolve: {
    alias: {
      'use-sync-external-store/shim/with-selector': './src/shims/use-sync-external-store-shim.js',
      '@context': path.resolve(__dirname, './src/context'),
    },
  },
  optimizeDeps: {
    include: ['reactflow', 'use-sync-external-store/shim/with-selector', './src/context/ThemeContext.tsx'],
  },})
