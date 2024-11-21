import withNextInt from "next-intl/plugin";

import type { NextConfig } from "next";

const withNextIntl = withNextInt();

const nextConfig: NextConfig = withNextIntl({
  /* config options here */
  redirects: async () => [
    {
      source: "/",
      permanent: true,
      destination: "/en/Home",
    },
    {
      source: "/Home",
      permanent: true,
      destination: "/en/Home",
    },
  ],
});

export default nextConfig;
