import withNextInt from "next-intl/plugin";

import type { NextConfig } from "next";

const withNextIntl = withNextInt();

const nextConfig: NextConfig = withNextIntl({
  /* config options here */
  redirects: async () => [
    {
      source: "/",
      permanent: true,
      destination: "/Home",
    },
  ],
});

export default nextConfig;
