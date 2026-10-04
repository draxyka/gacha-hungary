import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // A Kuro képek egyedi, időbélyeges URL-eken vannak, és nem változnak, így sokáig cache-elhetők
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { hostname: 'yt3.ggpht.com' },
      { hostname: 'static-cdn.jtvnw.net' },
      { hostname: 'pbs.twimg.com' },
      { hostname: 'hw-media-cdn-mingchao.kurogame.com' },
    ],
  },
};

export default nextConfig;
