import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      "/api": {
        // target: "http://localhost:5002",
        target: "https://chatappnew-1bng.onrender.com",
        changeOrigin: true,
      },
    },
  },
});