import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
/*     https: {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
    }, */
    host: '0.0.0.0', // Permite que el servidor escuche en todas las interfaces
    port: 5173,
    allowedHosts: ["ge.patriciorodriguez.com.ar"],      // El puerto puede ser cambiado si es necesario
  },
  plugins: [react()],
})
