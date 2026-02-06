import { GameProps } from './types/game.type';

// TODO: Ezek az adatok korábban BE-ből jöttek (localhost:4000/{slug} endpoint)
export const GAME_DATA: Record<string, GameProps> = {
  'wuthering-waves': {
    name: 'Wuthering Waves',
    slug: 'wuthering-waves',
    newsImgUrl: 'card_phoebe',
    cards: [
      {
        name: 'SOCIAL MEDIA',
        slug: 'social-media',
        imgUrl: 'card_carlotta.webp',
        description: 'Közösségi tartalmak és élő közvetítések egy helyen.',
      },
      {
        name: 'INTERAKTÍV TÉRKÉP',
        outerLink: 'https://wuthering.gg/map',
        imgUrl: 'card_camellya.webp',
        description: 'Fedezd fel Solaris-3 minden szegletét interaktívan.',
      },
      {
        name: 'KARAKTEREK',
        outerLink: 'https://wuthering.gg/characters',
        imgUrl: 'card_changli.webp',
        description: 'Ismerd meg az összes karaktert és képességeiket.',
      },
    ],
  },
  // TODO: Honkai Star Rail adatok
  // TODO: Zenless Zone Zero adatok
  // TODO: Genshin Impact adatok
};
