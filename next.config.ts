import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true, // ✅ Bỏ qua lỗi TypeScript khi build
  },
};

export default nextConfig;
