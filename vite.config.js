import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: "138.197.37.38",
    host: "192.168.12.90",
    port: "3002",
  },
});