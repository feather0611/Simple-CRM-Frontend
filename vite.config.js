import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig((mode) => {
  // const env = loadEnv(mode, process.cwd(), "")  
  return {
        plugins: [vue()],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
        define: {
            __API_URL__: "http://localhost:7189" // env.VITE_API_URL,
        },
    };
});
