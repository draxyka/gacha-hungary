import { NewsItem } from './types/news.type';
import { fetchWuwaNewsList, fetchWuwaNewsById } from './wuwa.news.service';

export async function fetchNewsList(gameSlug: string, perPage = 4): Promise<NewsItem[]> {
  switch (gameSlug) {
    case 'wuthering-waves':
      return fetchWuwaNewsList(perPage);
    default:
      return [];
  }
}

export async function fetchNewsById(gameSlug: string, id: string): Promise<NewsItem | null> {
  switch (gameSlug) {
    case 'wuthering-waves':
      return fetchWuwaNewsById(id);
    default:
      return null;
  }
}
