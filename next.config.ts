import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // 🟡 Abaikan error TypeScript saat build
  },
  eslint: {
    ignoreDuringBuilds: true, // 🟡 Abaikan error ESLint saat build
  },
  images: {
    domains: ['res.cloudinary.com'], // tambahkan domain cloudinary di sini
  },
};

export default nextConfig;
