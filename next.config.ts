import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the whole site builds to /out and can be hosted anywhere
  // (Vercel, Netlify, Hostinger, GitHub Pages, cPanel).
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
