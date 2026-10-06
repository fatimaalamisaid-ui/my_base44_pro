import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    // The preview is served through an external hostname, so allow any host.
    allowedHosts: true,
  },
})
