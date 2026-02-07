import NewsDetail from '@/features/news/NewsDetail';
import { fetchNewsBySlug } from '@/features/news/news.service';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string; id: string }> }): Promise<Metadata> {
  const { slug, id } = await params;
  const article = await fetchNewsBySlug(slug, id);
  if (!article) return { title: 'Hír' };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      ...(article.image ? { images: [{ url: article.image }] } : {}),
    },
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;
  return <NewsDetail slug={slug} id={id} />;
}
