import Codes from '@/features/codes/Codes';
import { GAME_NAMES } from '@/constants/games';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = GAME_NAMES[slug] ?? slug;
  return {
    title: 'Kódok',
    description: `${name} beváltható kódok — ingyenes jutalmak, Astrite és egyéb ajándékok.`,
  };
}

export default function CodesPage() {
  return <Codes />;
}
