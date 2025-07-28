import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
    server: {
    port: 5173,
  },
  plugins: [
    tailwindcss(), 
    reactRouter(), 
    tsconfigPaths(),
    flowbiteReact()
  ],
});
