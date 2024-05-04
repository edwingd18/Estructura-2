import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
    open: true,
  },
  mime: {
    '.jsx': 'text/jsx',
    '.js': 'text/javascript'
  },
})
