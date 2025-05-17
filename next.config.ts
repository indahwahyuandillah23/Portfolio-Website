import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // 🟡 Abaikan error TypeScript saat build
  },
  eslint: {
    ignoreDuringBuilds: true, // 🟡 Abaikan error ESLint saat build
  },
};

export default nextConfig;
