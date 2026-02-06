'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const GAME_NAMES: Record<string, string> = {
  'wuthering-waves': 'Wuthering Waves',
  'honkai-star-rail': 'Honkai: Star Rail',
  'zenless-zone-zero': 'Zenless Zone Zero',
  'genshin-impact': 'Genshin Impact',
};

const GAME_COLORS: Record<string, string> = {
  'wuthering-waves': 'text-gray-300',
  'honkai-star-rail': 'text-sky-300',
  'zenless-zone-zero': 'text-lime-400',
  'genshin-impact': 'text-amber-400',
};

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const segments = pathname.split('/').filter(Boolean);
  const gameSlug = segments[0];
  const gameName = GAME_NAMES[gameSlug];
  const gameColor = GAME_COLORS[gameSlug] ?? 'text-white';
  const backHref = segments.length > 1 ? `/${gameSlug}` : '/';

  return (
    <header className="bg-black/60 backdrop-blur-md border-b border-white/10">
      <div className="wrapper flex items-center h-14 gap-6">
        {!isHome && (
          <Link
            href={backHref}
            className="text-white/50 hover:text-white transition-colors text-sm uppercase tracking-[0.15em] no-underline flex items-center gap-2"
          >
            <span className="text-lg leading-none">&larr;</span>
            Vissza
          </Link>
        )}

        <span className={`text-base font-semibold uppercase tracking-[0.2em] ${isHome ? 'text-white' : gameColor}`}>
          {gameName ?? 'Gacha Hungary'}
        </span>
      </div>
    </header>
  );
}
