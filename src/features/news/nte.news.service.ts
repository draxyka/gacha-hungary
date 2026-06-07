import { NewsItem } from './types/news.type';

// TODO: NTE news API integration — different structure from WuWa
export async function fetchNteNewsList(_perPage = 4): Promise<NewsItem[]> {
  return [];
}

export async function fetchNteNewsById(_id: string): Promise<NewsItem | null> {  return null;
}
