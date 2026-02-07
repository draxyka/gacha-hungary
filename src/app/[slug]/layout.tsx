import { GameProvider } from '@/context/GameContext';
import { GAME_NAMES } from '@/constants/games';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = GAME_NAMES[slug] ?? slug;
  return {
    title: name,
    description: `${name} hírek, karakter guide-ok, buildek és közösségi tartalmak magyarul.`,
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

  return <GameProvider slug={slug}>{children}</GameProvider>;
}
