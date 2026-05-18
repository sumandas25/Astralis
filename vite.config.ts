import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig as lovableDefineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";
import { defineConfig, type ConfigEnv, type UserConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const tanstackStartOptions = {
  importProtection: {
    behavior: "error",
    client: {
      files: ["**/server/**"],
      specifiers: ["server-only"],
    },
  },
  server: { entry: "server" },
} as const;

function vercelConfig(): UserConfig {
  return defineConfig({
    resolve: {
      alias: {
        "@": `${process.cwd()}/src`,
      },
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    plugins: [
      tailwindcss(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart(tanstackStartOptions),
      nitro(),
      viteReact(),
    ],
  });
}

const defaultConfig = lovableDefineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
});

export default async function config(env: ConfigEnv) {
  if (process.env.VERCEL === "1") {
    return vercelConfig();
  }

  return defaultConfig(env);
}
