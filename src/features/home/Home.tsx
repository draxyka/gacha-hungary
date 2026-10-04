import { existsSync } from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { HOME_ITEMS } from './home.data';
import { HomeItem } from './types/home.type';
import { GAME_COLORS, LIVE_GAMES } from '@/constants/games';

function Tile({ item, isLive }: { item: HomeItem; isLive: boolean }) {
  const titleColor = GAME_COLORS[item.slug] ?? 'text-white';

  return (
    <>
      {item.image && existsSync(path.join(process.cwd(), 'public', item.image)) && (
        <Image
          src={item.image}
          alt=""
          fill
          priority={isLive}
          sizes="(max-width: 1024px) 100vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      )}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${isLive ? 'opacity-60 group-hover:opacity-40' : 'opacity-80'}`}
      />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className={`text-3xl font-bold uppercase tracking-[0.08em] lg:text-5xl ${titleColor}`}>{item.title}</h1>
        {!isLive && (
          <span className="rounded-full bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-white/40 ring-1 ring-inset ring-white/10 backdrop-blur-sm">
            Hamarosan
          </span>
        )}
      </div>
    </>
  );
}

export default function Home() {
  return (
    <div className="relative flex flex-col overflow-hidden w-full h-screen lg:flex-row">
      {/* Oldal azonosító */}
      <div className="absolute top-0 inset-x-0 z-20 text-center py-6 pointer-events-none">
        <h2
          className="text-lg lg:text-xl font-bold uppercase tracking-[0.35em] text-white"
          style={{ textShadow: '0 2px 16px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,0.9)' }}
        >
          Gacha Hungary
        </h2>
        <p className="text-xs uppercase tracking-[0.25em] text-white/60 mt-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,1)' }}>
          Magyar gacha közösség
        </p>
      </div>
      {HOME_ITEMS.map((item) => {
        const isLive = LIVE_GAMES.includes(item.slug);
        const cls = 'group relative flex-1 overflow-hidden';
        return isLive ? (
          <Link key={item.slug} href={`/${item.slug}`} className={cls}>
            <Tile item={item} isLive />
          </Link>
        ) : (
          <div key={item.slug} className={`${cls} cursor-default`} aria-disabled="true">
            <Tile item={item} isLive={false} />
          </div>
        );
      })}
    </div>
  );
}
