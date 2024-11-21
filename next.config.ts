import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => [
    {
      source: "/",
      permanent: true,
      destination: "/Home",
    },
  ],
};

export default nextConfig;
