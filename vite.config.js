import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const devPort = Number(process.env.PORT || process.env.VITE_PORT || 5173);

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: devPort,
    strictPort: true,
  },
});
