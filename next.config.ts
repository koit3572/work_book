import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // ❗ Netlify에서 빌드 실패 방지
  },
  output: "export", // 정적 사이트로 배포 시 필요
};

export default nextConfig;
