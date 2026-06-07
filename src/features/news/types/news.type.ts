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
};
