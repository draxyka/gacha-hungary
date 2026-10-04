export type NewsItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string | null;
  createdAt: string;
  category: string;
  sourceUrl: string;
  /** false = nincs magyar fordítás, az eredeti angol szöveg jelenik meg */
  translated: boolean;
};
