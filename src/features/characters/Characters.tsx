'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CharacterListItem } from './types/character.type';
import { useGame } from '@/context/GameContext';

const ELEMENTS = ['Aero', 'Electro', 'Fusion', 'Glacio', 'Havoc', 'Spectro'];
const WEAPONS = ['Broadblade', 'Gauntlets', 'Pistols', 'Rectifier', 'Sword'];

const ELEMENT_COLORS: Record<string, string> = {
  Aero: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  Electro: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  Fusion: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  Glacio: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  Havoc: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  Spectro: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
};

const ELEMENT_TEXT: Record<string, string> = {
  Aero: 'text-emerald-300',
  Electro: 'text-violet-300',
  Fusion: 'text-orange-300',
  Glacio: 'text-cyan-300',
  Havoc: 'text-rose-300',
  Spectro: 'text-yellow-300',
};

const ELEMENT_GRADIENT: Record<string, string> = {
  Aero: 'from-emerald-900/40 to-emerald-950/10',
  Electro: 'from-violet-900/40 to-violet-950/10',
  Fusion: 'from-orange-900/40 to-orange-950/10',
  Glacio: 'from-cyan-900/40 to-cyan-950/10',
  Havoc: 'from-rose-900/40 to-rose-950/10',
  Spectro: 'from-yellow-900/40 to-yellow-950/10',
};

const RARITY_BORDER: Record<string, string> = {
  '5': 'border-amber-400/40 hover:border-amber-400/70',
  '4': 'border-purple-400/40 hover:border-purple-400/70',
};

export default function Characters({ characters, imageMap }: { characters: CharacterListItem[]; imageMap: Record<string, string | null> }) {
  const game = useGame();
  const slug = game?.slug ?? '';
  const [elementFilter, setElementFilter] = useState<string | null>(null);
  const [weaponFilter, setWeaponFilter] = useState<string | null>(null);
  const [rarityFilter, setRarityFilter] = useState<string | null>(null);

  const filtered = characters
    .filter((c) => {
      if (elementFilter && c.element !== elementFilter) return false;
      if (weaponFilter && c.weapon !== weaponFilter) return false;
      if (rarityFilter && c.rarity !== rarityFilter) return false;
      return true;
    })
    .sort((a, b) => {
      // New characters first
      if (a.isNew && !b.isNew) return -1;
      if (!a.isNew && b.isNew) return 1;
      return 0;
    });

  const clearFilters = () => {
    setElementFilter(null);
    setWeaponFilter(null);
    setRarityFilter(null);
  };

  const hasFilters = elementFilter || weaponFilter || rarityFilter;

  return (
    <section className="flex-1 py-16">
      <div className="wrapper">
        <h1 className="text-3xl md:text-4xl text-white uppercase font-extralight mb-8 tracking-[0.25em] text-center">
          Karakterek
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <div className="flex gap-2">
            {['5', '4'].map((r) => (
              <button
                key={r}
                onClick={() => setRarityFilter(rarityFilter === r ? null : r)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  rarityFilter === r
                    ? 'bg-white/20 border-white/40 text-white'
                    : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                }`}
              >
                {r}&#9733;
              </button>
            ))}
          </div>

          <span className="w-px h-8 bg-white/10 self-center" />

          <div className="flex flex-wrap gap-2">
            {ELEMENTS.map((el) => (
              <button
                key={el}
                onClick={() => setElementFilter(elementFilter === el ? null : el)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  elementFilter === el
                    ? ELEMENT_COLORS[el]
                    : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                }`}
              >
                {el}
              </button>
            ))}
          </div>

          <span className="w-px h-8 bg-white/10 self-center hidden sm:block" />

          <div className="flex flex-wrap gap-2">
            {WEAPONS.map((w) => (
              <button
                key={w}
                onClick={() => setWeaponFilter(weaponFilter === w ? null : w)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  weaponFilter === w
                    ? 'bg-white/20 border-white/40 text-white'
                    : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                }`}
              >
                {w}
              </button>
            ))}
          </div>

          {hasFilters && (
            <>
              <span className="w-px h-8 bg-white/10 self-center" />
              <button
                onClick={clearFilters}
                className="px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 text-xs font-semibold tracking-wider transition-all cursor-pointer hover:bg-red-500/20"
              >
                Összes ✕
              </button>
            </>
          )}
        </div>

        <p className="text-center text-white/40 text-sm mb-8">{filtered.length} karakter</p>

        {/* Grid */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filtered.map((char) => (
            <Link
              key={char.id}
              href={`/${slug}/karakterek/${char.slug}`}
              className="group no-underline"
            >
              <article
                className={`relative rounded-xl overflow-hidden border-2 ${RARITY_BORDER[char.rarity] ?? 'border-white/10'} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/10`}
              >
                {/* Image area — image fills card, name overlaid at bottom */}
                <div className={`relative aspect-[3/4] bg-gradient-to-b ${ELEMENT_GRADIENT[char.element] ?? 'from-white/5 to-transparent'} overflow-hidden`}>
                  {imageMap[char.slug] ? (
                    <div className="absolute inset-0 transition-transform duration-300 ease-in-out group-hover:scale-110">
                      <Image
                        src={imageMap[char.slug]!}
                        alt={`${char.name} — ${char.rarity}★ ${char.element} ${char.weapon}`}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                        className="object-cover object-center"
                      />
                    </div>
                  ) : null}

                  {/* Top overlay for rarity stars */}
                  <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/70 to-transparent pt-2 pb-6 px-2 text-right">
                    <span className={`text-sm drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] ${char.rarity === '5' ? 'text-amber-400' : 'text-purple-400'}`}>
                      {'★'.repeat(Number(char.rarity))}
                    </span>
                  </div>

                  {/* Bottom overlay with name + info */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-10 pb-3 px-3 text-center">
                    <h2 className="text-base sm:text-lg font-bold text-white tracking-wide leading-tight mb-1.5 drop-shadow-lg">
                      {char.name}
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${ELEMENT_COLORS[char.element] ?? 'text-white/50 border-white/10'}`}
                      >
                        {char.element}
                      </span>
                      <span className="text-xs text-white/60 font-medium">{char.weapon}</span>
                    </div>
                  </div>
                </div>

                {char.isNew && (
                  <span className="absolute top-2 left-2 text-[10px] bg-green-500/80 text-white px-2 py-0.5 rounded-full font-bold uppercase">
                    New
                  </span>
                )}
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
