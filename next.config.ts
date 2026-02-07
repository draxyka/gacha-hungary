import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'yt3.ggpht.com' },
      { hostname: 'static-cdn.jtvnw.net' },
      { hostname: 'pbs.twimg.com' },
      { hostname: 'wutheringwaves.gg' },
      { hostname: 'hw-media-cdn-mingchao.kurogame.com' },
      { hostname: 'www.prydwen.gg' },
    ],
  },
};

export default nextConfig;
