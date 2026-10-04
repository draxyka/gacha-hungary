import { notFound } from 'next/navigation';
import { GameProvider } from '@/context/GameContext';
import { GAME_NAMES, LIVE_GAMES } from '@/constants/games';
import type { Metadata } from 'next';

export const dynamicParams = false;

export function generateStaticParams() {
  return LIVE_GAMES.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = GAME_NAMES[slug] ?? slug;
  return {
    title: name,
    description: `${name} hírek és közösségi tartalmak magyarul.`,
  };
}

export default async function GameLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!LIVE_GAMES.includes(slug)) {
    notFound();
  }

  return <GameProvider slug={slug}>{children}</GameProvider>;
}
