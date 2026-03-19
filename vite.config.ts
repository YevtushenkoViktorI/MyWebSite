import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const myEnv = loadEnv(mode, process.cwd(), "");
  const myRepoName = (process.env.GITHUB_REPOSITORY ?? "").split("/")[1] ?? "";
  const myIsUserPagesRepo = myRepoName.endsWith(".github.io");
  const myBasePath =
    myEnv.VITE_BASE_PATH ??
    (process.env.GITHUB_ACTIONS ? (myIsUserPagesRepo ? "/" : `/${myRepoName}/`) : "/");

  return {
    base: myBasePath,
    plugins: [react()],
    server: {
      host: true,
      port: 5174,
    },
  };
});
