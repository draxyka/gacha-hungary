import News from '@/features/news/News';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hírek',
  description: 'A legfrissebb gacha játék hírek, frissítések és közlemények magyarul.',
};

export default async function NewsPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  return <News slug={slug} />;
}
