export type NewsItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string | null;
  createdAt: string;
  sourceUrl: string;
};

// WordPress REST API response shape
export interface WpPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  link: string;
  yoast_head_json?: {
    og_image?: { url: string }[];
  };
}
