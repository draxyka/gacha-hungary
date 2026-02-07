import Link from 'next/link';
import { HOME_ITEMS } from './home.data';
import { GAME_COLORS } from '@/constants/games';

const ENABLED_SLUGS = ['wuthering-waves'];

const VIDEO_OFFSETS: Record<string, string> = {
  'wuthering-waves': 'lg:left-[-120px]',
  'honkai-star-rail': 'lg:left-[-131px]',
  'zenless-zone-zero': 'lg:left-[-265px]',
  'genshin-impact': 'lg:left-[184px]',
};

export default function Home() {
  return (
    <div className="relative flex flex-col overflow-hidden w-full h-screen lg:flex-row">
      {/* Oldal azonosító */}
      <div className="absolute top-0 left-0 right-0 z-20 text-center py-6 pointer-events-none">
        <h2 className="text-lg lg:text-xl font-bold uppercase tracking-[0.35em] text-white" style={{ textShadow: '0 2px 16px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.9)' }}>
          Gacha Hungary
        </h2>
        <p className="text-xs uppercase tracking-[0.25em] text-white/60 mt-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,1)' }}>
          Magyar gacha közösség
        </p>
      </div>
      {HOME_ITEMS.map((item) => {
        const isEnabled = ENABLED_SLUGS.includes(item.slug);
        const titleColor = GAME_COLORS[item.slug] ?? 'text-white';
        const videoOffset = VIDEO_OFFSETS[item.slug] ?? '';

        return (
          <Link
            key={item.slug}
            href={isEnabled ? `/${item.slug}` : '/'}
            className={`group relative flex items-center justify-center flex-1 overflow-hidden after:content-[''] after:absolute after:w-full after:h-full after:bg-black after:left-0 after:top-0 after:z-[1] ${isEnabled ? 'after:opacity-70' : 'pointer-events-none after:opacity-90'}`}
          >
            <video
              src={item.videoUrl}
              poster={item.videoPoster || undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className={`h-full w-[100vw] relative transition-transform duration-300 ease-in-out object-cover scale-100 group-hover:scale-[1.2] ${videoOffset}`}
            />
            <h1
              className={`absolute z-[2] text-center top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-2xl font-bold uppercase lg:text-4xl ${titleColor}`}
            >
              {item.title}
            </h1>
            {!isEnabled && (
              <span className="absolute z-10 bottom-4 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.2em] text-white/40 bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full">
                Hamarosan
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
