import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      "/api": {
        target: "https://chatappnew-1bng.onrender.com", // The server endpoint
        // target: process.env.VITE_API_URL, // Use the environment variable
        changeOrigin: true,
      },
    },
  },
});