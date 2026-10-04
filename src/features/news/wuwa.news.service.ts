import { NewsItem } from './types/news.type';

const MENU_URL =
  'https://hw-media-cdn-mingchao.kurogame.com/akiwebsite/website2.0/json/G152/en/MainMenu.json';
const ARTICLE_URL = (id: number) =>
  `https://hw-media-cdn-mingchao.kurogame.com/akiwebsite/website2.0/json/G152/en/article/${id}.json`;
const SOURCE_URL = (id: number) =>
  `https://wutheringwaves.kurogames.com/en/main/news/detail/${id}`;

export interface KuroArticle {
  articleId: number;
  articleTitle: string;
  articleType: number;
  articleTypeName?: string;
  createTime: string;
  startTime: string;
  sortingMark: number;
  articleContent: string;
  articleDesc: string;
  suggestCover: string;
  top: number;
}

const ARTICLE_TYPE_NAMES: Record<number, string> = {
  57: 'News',
  58: 'Notice',
  59: 'Event',
};

interface KuroMenuResponse {
  article: KuroArticle[];
}

type TranslationEntry = { title: string; excerpt: string; content: string };
type TranslationCache = Record<string, TranslationEntry>;

let translationCache: TranslationCache | null = null;

async function getTranslations(): Promise<TranslationCache> {
  if (translationCache) return translationCache;
  try {
    const mod = await import('./translations/wuthering-waves.json');
    translationCache = mod.default ?? mod;
    return translationCache!;
  } catch {
    translationCache = {};
    return {};
  }
}

function deduplicateArticles(articles: KuroArticle[]): KuroArticle[] {
  const seen = new Set<number>();
  return articles.filter((a) => {
    if (seen.has(a.articleId)) return false;
    seen.add(a.articleId);
    return true;
  });
}

function mapArticle(article: KuroArticle, translations: TranslationCache): NewsItem {
  const key = article.articleId.toString();
  const tr = translations[key];

  return {
    id: article.articleId,
    slug: key,
    title: tr?.title ?? article.articleTitle,
    excerpt: tr?.excerpt ?? '',
    content: tr?.content ?? '',
    image: article.suggestCover || null,
    createdAt: article.startTime,
    category: article.articleTypeName ?? ARTICLE_TYPE_NAMES[article.articleType] ?? '',
    sourceUrl: SOURCE_URL(article.articleId),
    translated: !!tr,
  };
}

/**
 * A Kuro CDN néha 20-30 mp-ig nem válaszol. Időkorlát után hibát dobunk (nem üres listát adunk),
 * így ISR revalidáláskor a Next.js tovább szolgálja ki az utolsó jó oldalt, ahelyett hogy
 * "nincsenek hírek" állapotot cache-elne. Első betöltéskor a [slug]/error.tsx jelenik meg.
 */
const FETCH_TIMEOUT_MS = 8000;

async function kuroFetch(url: string): Promise<Response> {
  return fetch(url, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
}

export async function fetchWuwaNewsList(perPage = 4): Promise<NewsItem[]> {
  const [res, translations] = await Promise.all([kuroFetch(MENU_URL), getTranslations()]);
  if (!res.ok) throw new Error(`Kuro news list returned ${res.status}`);
  const data: KuroMenuResponse = await res.json();
  return deduplicateArticles((data.article ?? []).slice(0, perPage * 2))
    .slice(0, perPage)
    .map((a) => mapArticle(a, translations));
}

export async function fetchWuwaNewsById(id: string): Promise<NewsItem | null> {
  const articleId = parseInt(id, 10);
  if (isNaN(articleId)) return null;
  const [res, translations] = await Promise.all([kuroFetch(ARTICLE_URL(articleId)), getTranslations()]);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Kuro article ${articleId} returned ${res.status}`);
  const article: KuroArticle = await res.json();
  const item = mapArticle(article, translations);
  // For detail view use full articleContent if no translation exists
  if (!item.content) item.content = article.articleContent ?? '';
  return item;
}
