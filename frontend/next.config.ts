import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/Capstone",
  assetPrefix: "/Capstone/",
  trailingSlash: true,
};

export default nextConfig;
