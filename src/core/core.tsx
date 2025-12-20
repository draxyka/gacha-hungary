import Link from 'next/link';

import Image from 'next/image';
import './core.css';
import { CoreCards, CoreProps, GameType } from './types/core.types';

export default function Core({
  gameType,
  initialGameData,
}: Readonly<{ gameType: GameType; initialGameData: CoreProps }>) {
  console.log(initialGameData);
  return (
    <section className={`core ${gameType}`}>
      <div className="wrapper">
        <h1>{initialGameData.name}</h1>
        <div className="core-wrapper">
          <Link className="card core-news" href={`${gameType}/hirek`}>
            <div className="card-infos">
              <h2>HÍREK</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <figure className="card-image">
              <Image
                src={`/assets/images/${gameType}/${initialGameData.newsImgUrl}.png`}
                alt="HÍREK"
                width={300}
                height={300}
              />
            </figure>
          </Link>
          {initialGameData.cards.map((card: CoreCards) => {
            return (
              <Link
                className="card"
                href={card.outerLink ?? `${gameType}/${card.slug}`}
                target={card.outerLink ? '_blank' : '_self'}
                key={card.name}
              >
                <div className="card-infos">
                  <h2>{card.name}</h2>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <figure className="card-image">
                  <Image src={`/assets/images/${gameType}/${card.imgUrl}`} alt={card.name} width={300} height={300} />
                </figure>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
