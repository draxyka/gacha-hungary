import News from '@/features/news/News';

export default async function NewsPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  return <News slug={slug} />;
}
