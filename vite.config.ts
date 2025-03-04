import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // GitHub Pagesのサブディレクトリでのデプロイ用
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  // 開発サーバー設定
  server: {
    port: 3000,
    open: true,
  },
  // ビルド設定
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
  },
});
