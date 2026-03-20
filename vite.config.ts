import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'import.meta.env.VITE_ADMIN_USER': JSON.stringify(env.ADMIN_USER || env.VITE_ADMIN_USER),
      'import.meta.env.VITE_ADMIN_PASS': JSON.stringify(env.ADMIN_PASS || env.VITE_ADMIN_PASS),
      'import.meta.env.VITE_WHATSAPP_NUMBER': JSON.stringify(env.WHATSAPP_NUMBER || env.VITE_WHATSAPP_NUMBER),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
