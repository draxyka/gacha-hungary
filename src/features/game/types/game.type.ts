export type GameProps = {
  name: string;
  cards: GameCard[];
  newsImgUrl: string;
  slug: string;
};

export type GameCard = {
  name: string;
  slug?: string;
  outerLink?: string;
  imgUrl: string;
  description: string;
};

export type GameType = 'wuthering-waves' | 'genshin-impact' | 'zenless-zone-zero' | 'honkai-star-rail';
