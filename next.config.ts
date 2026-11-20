import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    /* The Phosphor entry points re-export every icon. Without this, each
       page the dev server compiles walks thousands of icon modules, which
       is what makes the first visit to a route slow. */
    optimizePackageImports: ["@phosphor-icons/react"],
  },
};

export default nextConfig;
