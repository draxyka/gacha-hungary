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
  };
}

export async function fetchWuwaNewsList(perPage = 4): Promise<NewsItem[]> {
  try {
    const [res, translations] = await Promise.all([
      fetch(MENU_URL, { next: { revalidate: 3600 } }),
      getTranslations(),
    ]);
    if (!res.ok) return [];
    const data: KuroMenuResponse = await res.json();
    return deduplicateArticles((data.article ?? []).slice(0, perPage * 2))
      .slice(0, perPage)
      .map((a) => mapArticle(a, translations));
  } catch {
    return [];
  }
}

export async function fetchWuwaNewsById(id: string): Promise<NewsItem | null> {
  const articleId = parseInt(id, 10);
  if (isNaN(articleId)) return null;
  try {
    const [res, translations] = await Promise.all([
      fetch(ARTICLE_URL(articleId), { next: { revalidate: 3600 } }),
      getTranslations(),
    ]);
    if (!res.ok) return null;
    const article: KuroArticle = await res.json();
    const item = mapArticle(article, translations);
    // For detail view use full articleContent if no translation exists
    if (!item.content) item.content = article.articleContent ?? '';
    return item;
  } catch {
    return null;
  }
}
