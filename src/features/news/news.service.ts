import { NewsItem, WpPost } from './types/news.type';

// Per-game API config — add new games here
const NEWS_API: Record<string, string> = {
  'wuthering-waves': 'https://wutheringwaves.gg/wp-json/wp/v2/posts',
  // TODO: 'honkai-star-rail': '...',
  // TODO: 'zenless-zone-zero': '...',
  // TODO: 'genshin-impact': '...',
};

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&hellip;/g, '...').replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').replace(/&#038;/g, '&').replace(/&nbsp;/g, ' ').trim();
}

// ─── Translation cache ────────────────────────────────────────
type TranslationEntry = { title: string; excerpt: string; content: string };
type TranslationCache = Record<string, TranslationEntry>;

const translationCaches = new Map<string, TranslationCache>();

/**
 * Dynamically import the translation JSON for a game slug.
 * Returns {} if no translations exist yet.
 */
async function getTranslations(gameSlug: string): Promise<TranslationCache> {
  if (translationCaches.has(gameSlug)) {
    return translationCaches.get(gameSlug)!;
  }

  try {
    // Dynamic import works at build-time in Next.js server components
    const mod = await import(`./translations/${gameSlug}.json`);
    const data: TranslationCache = mod.default ?? mod;
    translationCaches.set(gameSlug, data);
    return data;
  } catch {
    translationCaches.set(gameSlug, {});
    return {};
  }
}

function mapPost(
  post: WpPost,
  translations: TranslationCache
): NewsItem {
  const image = post.yoast_head_json?.og_image?.[0]?.url ?? null;
  const tr = translations[post.slug];

  return {
    id: post.id,
    slug: post.slug,
    title: tr?.title ?? stripHtml(post.title.rendered),
    excerpt: tr?.excerpt ?? stripHtml(post.excerpt.rendered),
    content: tr?.content ?? post.content.rendered,
    image,
    createdAt: post.date,
    sourceUrl: post.link,
  };
}

/** Fetch news list — uses translated content when available, english fallback */
export async function fetchNewsList(
  gameSlug: string,
  perPage = 12
): Promise<NewsItem[]> {
  const apiUrl = NEWS_API[gameSlug];
  if (!apiUrl) return [];

  try {
    const [res, translations] = await Promise.all([
      fetch(`${apiUrl}?per_page=${perPage}`, {
        next: { revalidate: 3600 },
      }),
      getTranslations(gameSlug),
    ]);
    if (!res.ok) return [];
    const posts: WpPost[] = await res.json();
    return posts.map((p) => mapPost(p, translations));
  } catch {
    return [];
  }
}

/** Fetch a single news article by its slug */
export async function fetchNewsBySlug(
  gameSlug: string,
  articleSlug: string
): Promise<NewsItem | null> {
  const apiUrl = NEWS_API[gameSlug];
  if (!apiUrl) return null;

  try {
    const [res, translations] = await Promise.all([
      fetch(`${apiUrl}?slug=${encodeURIComponent(articleSlug)}`, {
        next: { revalidate: 3600 },
      }),
      getTranslations(gameSlug),
    ]);
    if (!res.ok) return null;
    const posts: WpPost[] = await res.json();
    if (posts.length === 0) return null;
    return mapPost(posts[0], translations);
  } catch {
    return null;
  }
}
