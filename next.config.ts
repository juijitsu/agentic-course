import type { NextConfig } from "next";

/**
 * GitHub Pages serves a project site from /<repo>, so every asset and link
 * needs that prefix. Set BASE_PATH in CI; local dev runs at the root.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
