import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  // Редиректы со старых URL на новые (постоянные, 308) —
  // чтобы внешние ссылки и закладки не отдавали 404.
  async redirects() {
    return [
      {
        source: "/product",
        destination: "/ai-assistant",
        permanent: true,
      },
      {
        source: "/culture/primer",
        destination: "/culture/example",
        permanent: true,
      },
      {
        source: "/otchet/primer",
        destination: "/softskill-report/example",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
