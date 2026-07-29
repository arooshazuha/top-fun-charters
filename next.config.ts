import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow-list of quality values used across the app (Next 16 requires this).
    qualities: [70, 75, 82, 90],
    minimumCacheTTL: 2678400, // 31 days
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920, 2560],
  },
};

export default nextConfig;
