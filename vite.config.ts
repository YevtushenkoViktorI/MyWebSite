import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const myEnv = loadEnv(mode, process.cwd(), "");
  const myBasePath = myEnv.VITE_BASE_PATH ?? "/";

  return {
    base: myBasePath,
    plugins: [react()],
    server: {
      host: true,
      port: 5174,
    },
  };
});
