import type { NextConfig } from "next";

const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const isProd = process.env.NODE_ENV === "production";

const isUserPagesRepo = repo.endsWith(".github.io");
const basePath = isProd && !isUserPagesRepo ? `/${repo}` : "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
};

export default nextConfig;
