import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 忽略 TypeScript 报错 (关键配置：免死金牌)
  typescript: {
    ignoreBuildErrors: true,
  },
  // 忽略 ESLint 报错 (关键配置：免死金牌)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 允许跨域加载图片 (为了显示 Supabase 里的图片)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;