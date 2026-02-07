'use client';

import Link from 'next/link';
import Image from 'next/image';
import './game.css';
import { GAME_DATA } from './game.data';
import { GameCard } from './types/game.type';
import { useGame } from '@/context/GameContext';
import { GAME_ACCENT_COLORS, GAME_GLOW, GAME_CARD_BORDER } from '@/constants/games';

function SmallCard({
  card,
  slug,
  cardBorder,
}: {
  card: GameCard;
  slug: string;
  cardBorder: string;
}) {
  return (
    <Link
      className={`card text-gray-200 h-[160px] rounded-2xl relative no-underline flex items-center gap-4 px-6 py-5 z-[2] bg-white/5 backdrop-blur-sm border ${cardBorder} transition-all duration-300 ease-in-out hover:shadow-2xl`}
      href={card.outerLink ?? `/${slug}/${card.slug}`}
      target={card.outerLink ? '_blank' : '_self'}
    >
      <div className="relative z-[1] flex-1 min-w-0" style={{ textShadow: '0 2px 12px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,1)' }}>
        <h2 className="w-full font-semibold tracking-[0.15em] uppercase text-lg">{card.name}</h2>
        <p className="mt-1.5 text-gray-300 text-xs leading-relaxed">{card.description}</p>
        {card.outerLink && (
          <span className="mt-2 inline-block text-[10px] uppercase tracking-wider text-white/30">
            ↗ Külső oldal
          </span>
        )}
      </div>
      <figure className="card-image w-[35%] sm:w-[40%] shrink-0 absolute right-2 bottom-0 h-full z-0 flex items-end justify-end transition-all duration-300 ease-in-out opacity-50 sm:opacity-80">
        <Image
          src={`/assets/images/${slug}/${card.imgUrl}`}
          alt={card.name}
          width={200}
          height={200}
          className="object-contain h-full w-auto"
        />
      </figure>
    </Link>
  );
}

export default function Game() {
  const game = useGame();
  const slug = game?.slug ?? '';
  const gameData = GAME_DATA[slug] ?? { name: slug, slug, newsImgUrl: '', cards: [] };
  const accentColor = GAME_ACCENT_COLORS[slug] ?? 'text-white';
  const glowColor = GAME_GLOW[slug] ?? 'rgba(255,255,255,0.03)';
  const cardBorder = GAME_CARD_BORDER[slug] ?? 'border-white/10 hover:border-white/20';

  const topCards = gameData.cards.slice(0, 3);
  const bottomCards = gameData.cards.slice(3);

  return (
    <section
      className="flex-1 py-16 relative overflow-hidden"
      style={{
        background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${glowColor}, transparent 70%)`,
      }}
    >
      <div className="wrapper relative z-[1]">
        <h1 className="text-3xl md:text-5xl uppercase font-extralight mb-12 tracking-[0.25em] text-center text-white">
          {gameData.name}
        </h1>

        {/* Felső sor: Hírek (bal) + 3 kártya (jobb) */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Featured: HÍREK */}
          <Link
            className={`card text-gray-200 rounded-2xl relative no-underline flex items-center gap-4 px-8 py-8 z-[2] lg:flex-[1.4] bg-white/5 backdrop-blur-sm border ${cardBorder} transition-all duration-300 ease-in-out hover:shadow-2xl`}
            href={`/${slug}/hirek`}
          >
            <div className="relative z-[1] flex-1 min-w-0" style={{ textShadow: '0 2px 12px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9), 0 0 4px rgba(0,0,0,1)' }}>
              <span className="text-xs uppercase tracking-[0.25em] text-white/80 mb-3 block font-light">
                Legfrissebb
              </span>
              <h2 className={`w-full font-semibold tracking-[0.2em] uppercase text-3xl lg:text-4xl ${accentColor}`}>
                HÍREK
              </h2>
              <p className="mt-4 text-gray-300 text-md leading-relaxed max-w-[280px]">
                A legfrissebb hírek, frissítések és közlemények a játékból.
              </p>
            </div>
            <figure className="card-image w-[35%] sm:w-[40%] shrink-0 absolute right-4 bottom-0 h-full z-0 flex items-end justify-end transition-all duration-300 ease-in-out opacity-60 sm:opacity-100">
              <Image
                src={`/assets/images/${slug}/${gameData.newsImgUrl}`}
                alt="HÍREK"
                width={400}
                height={400}
                className="object-contain h-full w-auto"
              />
            </figure>
          </Link>

          {/* Jobb oldali 3 kártya */}
          <div className="flex flex-col gap-6 lg:flex-1">
            {topCards.map((card: GameCard) => (
              <SmallCard key={card.name} card={card} slug={slug} cardBorder={cardBorder} />
            ))}
          </div>
        </div>

        {/* Alsó sor: maradék kártyák */}
        {bottomCards.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-6">
            {bottomCards.map((card: GameCard) => (
              <SmallCard key={card.name} card={card} slug={slug} cardBorder={cardBorder} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
