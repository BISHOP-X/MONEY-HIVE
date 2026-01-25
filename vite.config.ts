import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  build: {
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - split heavy dependencies
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-three': ['three'],
          'vendor-motion': ['framer-motion'],
          'vendor-ui': ['@radix-ui/react-dropdown-menu', '@radix-ui/react-slot', 'lucide-react'],
          'vendor-supabase': ['@supabase/supabase-js'],
        },
      },
    },
    // Increase chunk warning limit (we're handling it with manual chunks)
    chunkSizeWarningLimit: 300,
    // Target modern browsers for smaller bundles
    target: 'es2020',
    // Enable source maps only in dev
    sourcemap: false,
  },
});