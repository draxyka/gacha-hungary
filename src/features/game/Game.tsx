import Link from 'next/link';
import Image from 'next/image';
import './game.css';
import { GAME_DATA } from './game.mock';
import { GameCard, GameType } from './types/game.type';

export default function Game({ slug }: { slug: string }) {
  const gameData = GAME_DATA[slug] ?? { name: slug, slug, newsImgUrl: '', cards: [] };
  const isWuwa = slug === 'wuthering-waves';

  return (
    <section className={`flex-1 py-16 ${isWuwa ? 'wuwa-bg bg-cover bg-center bg-no-repeat' : ''}`}>
      <div className="wrapper">
        <h1
          className={`text-3xl md:text-5xl uppercase font-extralight mb-12 tracking-[0.25em] text-center ${isWuwa ? 'text-white' : ''}`}
        >
          {gameData.name}
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Featured: HÍREK */}
          <Link
            className={`card text-gray-200 rounded-2xl relative no-underline flex items-center gap-4 px-8 py-8 transition-all duration-300 ease-in-out z-[2] hover:shadow-2xl lg:flex-[1.4] ${isWuwa ? 'wuwa-card' : ''}`}
            href={`/${slug}/hirek`}
          >
            <div className="relative z-[1] flex-1 min-w-0">
              <span className="text-xs uppercase tracking-[0.25em] text-white/80 mb-3 block font-light">
                Legfrissebb
              </span>
              <h2
                className={`w-full font-semibold tracking-[0.2em] uppercase text-3xl lg:text-4xl ${isWuwa ? 'text-amber-300' : ''}`}
              >
                HÍREK
              </h2>
              <p className="mt-4 text-gray-300 text-md leading-relaxed max-w-[280px]">
                A legfrissebb hírek, frissítések és közlemények a játékból.
              </p>
            </div>
            <figure className="card-image w-[40%] shrink-0 h-auto relative z-[1] flex justify-end transition-all duration-300 ease-in-out">
              <Image
                src={`/assets/images/${slug}/${gameData.newsImgUrl}.png`}
                alt="HÍREK"
                width={400}
                height={400}
                className="object-contain max-h-[350px] w-auto"
              />
            </figure>
          </Link>

          {/* Kisebb kártyák */}
          <div className="flex flex-col gap-6 lg:flex-1">
            {gameData.cards.map((card: GameCard) => (
              <Link
                className={`card text-gray-200 h-[180px] rounded-2xl relative no-underline flex items-center gap-4 px-8 py-6 transition-all duration-300 ease-in-out z-[2] hover:shadow-2xl ${isWuwa ? 'wuwa-card' : ''}`}
                href={card.outerLink ?? `/${slug}/${card.slug}`}
                target={card.outerLink ? '_blank' : '_self'}
                key={card.name}
              >
                <div className="relative z-[1] flex-1 min-w-0">
                  <h2 className="w-full font-semibold tracking-[0.15em] uppercase text-xl">{card.name}</h2>
                  <p className="mt-2 text-gray-300 text-sm">{card.description}</p>
                </div>
                <figure className="card-image w-[40%] shrink-0 h-auto relative z-[1] flex justify-end transition-all duration-300 ease-in-out">
                  <Image
                    src={`/assets/images/${slug}/${card.imgUrl}`}
                    alt={card.name}
                    width={200}
                    height={200}
                    className="object-contain max-h-[160px] w-auto"
                  />
                </figure>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
