import type { NextConfig } from "next";

const isExport = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isExport ? "/FlowForgeAI" : "",
  assetPrefix: isExport ? "/FlowForgeAI/" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  devIndicators: false,
};

export default nextConfig;
