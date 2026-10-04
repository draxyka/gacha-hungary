import { HomeItem } from './types/home.type';

// A háttérképek a public/assets/images/home mappában vannak — a játékok CDN-jei (főleg a Kuro) nagyon lassúak lehetnek.
export const HOME_ITEMS: HomeItem[] = [
  {
    slug: 'wuthering-waves',
    title: 'Wuthering Waves',
    image: '/assets/images/home/wuwa.webp',
    description: 'Magyarország',
  },
  {
    slug: 'genshin-impact',
    title: 'Genshin Impact',
    image: '/assets/images/home/genshin.webp',
    description: 'Magyarország',
  },
  {
    slug: 'honkai-star-rail',
    title: 'Honkai: Star Rail',
    image: '/assets/images/home/hsr.webp',
    description: 'Magyarország',
  },
  {
    slug: 'zenless-zone-zero',
    title: 'Zenless Zone Zero',
    image: '/assets/images/home/zzz.webp',
    description: 'Magyarország',
  },
];
