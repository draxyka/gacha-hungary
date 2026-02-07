import Lore from '@/features/lore/Lore';
import { GAME_NAMES } from '@/constants/games';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = GAME_NAMES[slug] ?? slug;
  return {
    title: 'Lore — A Világ',
    description: `${name} világ és történet összefoglaló magyarul — minden, amit tudni érdemes a játék lore-járól.`,
  };
}

export default function LorePage() {
  return <Lore />;
}
