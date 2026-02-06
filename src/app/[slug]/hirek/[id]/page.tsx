import NewsDetail from '@/features/news/NewsDetail';

export default async function NewsDetailPage({ params }: { params: { slug: string; id: string } }) {
  const { slug, id } = await params;
  return <NewsDetail slug={slug} id={id} />;
}
