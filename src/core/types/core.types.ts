export type CoreProps = { name: string; cards: CoreCards[]; newsImgUrl: string; slug: string };
export type CoreCards = {
  name: string;
  slug?: string;
  outerLink?: string;
  imgUrl: string;
};
export type GameType = 'wuthering-waves' | 'genshin-impact' | 'zenless-zone-zero' | 'honkai-star-rail';
