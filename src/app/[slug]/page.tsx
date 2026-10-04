import News from '@/features/news/News';
import { GAME_NAMES } from '@/constants/games';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = GAME_NAMES[slug] ?? slug;
  return {
    title: `${name} hírek`,
    description: `A legfrissebb ${name} hírek, események és frissítések magyarul.`,
  };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <News slug={slug} />;
}
