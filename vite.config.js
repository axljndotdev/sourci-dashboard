
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: [
      '39b034c0-55e6-475d-a43d-a6b736594651-00-30mvnr7hgusm2.pike.replit.dev'
    ]
  }
})
