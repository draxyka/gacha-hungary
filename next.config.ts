import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'yt3.ggpht.com' },
      { hostname: 'static-cdn.jtvnw.net' },
      { hostname: 'pbs.twimg.com' },
    ],
  },
};

export default nextConfig;
