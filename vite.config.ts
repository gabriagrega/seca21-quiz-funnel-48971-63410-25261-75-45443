import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Dev proxy to avoid CORS when calling external webhooks during local development.
    // Requests to /api/quiz/* will be forwarded to https://n8n.somosagrega.com.br/webhook-test/*
    proxy: {
      '/api/quiz': {
        target: 'https://n8n.somosagrega.com.br',
        changeOrigin: true,
        secure: true,
        // map /api/quiz/seca21 -> /webhook/quiz/seca21 (forward to production webhook)
        rewrite: (path) => path.replace(/^\/api\/quiz/, '/webhook/quiz')
      }
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
