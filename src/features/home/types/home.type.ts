export type HomeItem = {
  slug: string;
  title: string;
  description: string;
  /** Háttérkép a public/assets/images/home mappából — ha nincs, üres (fekete) háttér */
  image?: string;
};
