import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: process.env.SITES_BUILD === "1" ? "export" : undefined,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: process.env.SITES_BUILD === "1",
  },
};

export default nextConfig;
