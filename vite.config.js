import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://workout-manager-inc0.onrender.com:10000",
        changeOrigin: true,
        secure: false,
        ws: true
      },
    },
  },

})
