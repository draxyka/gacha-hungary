import { NewsItem } from './types/news.type';
import { fetchWuwaNewsList, fetchWuwaNewsById } from './wuwa.news.service';
import { fetchNteNewsList, fetchNteNewsById } from './nte.news.service';

export async function fetchNewsList(gameSlug: string, perPage = 4): Promise<NewsItem[]> {
  switch (gameSlug) {
    case 'wuthering-waves':
      return fetchWuwaNewsList(perPage);
    case 'neverness-to-everness':
      return fetchNteNewsList(perPage);
    default:
      return [];
  }
}

export async function fetchNewsById(gameSlug: string, id: string): Promise<NewsItem | null> {
  switch (gameSlug) {
    case 'wuthering-waves':
      return fetchWuwaNewsById(id);
    case 'neverness-to-everness':
      return fetchNteNewsById(id);
    default:
      return null;
  }
}
