import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const myRepoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const myIsUserPagesRepo = myRepoName.endsWith(".github.io");
const myBasePath =
  process.env.VITE_BASE_PATH ??
  (process.env.GITHUB_ACTIONS ? (myIsUserPagesRepo ? "/" : `/${myRepoName}/`) : "/");

export default defineConfig({
  base: myBasePath,
  plugins: [react()],
  server: {
    host: true,
    port: 5174,
  },
});
