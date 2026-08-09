import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for the production Docker image (see Dockerfile)
  output: "standalone",
  images: {
    // All media is served from /public/images — no remote hosts
  },
};

export default nextConfig;
