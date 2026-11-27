import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Preview deployments share the production content on a second host. Without
  // this they compete with kimdongsan.vercel.app in the index.
  async headers() {
    if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
      return [
        {
          source: "/:path*",
          headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
