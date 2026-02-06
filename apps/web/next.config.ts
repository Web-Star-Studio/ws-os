import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@ws/shared", "@ws/backend"],
};

export default nextConfig;
