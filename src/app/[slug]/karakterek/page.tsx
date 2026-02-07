import Characters from '@/features/characters/Characters';
import { fetchCharacterList } from '@/features/characters/characters.service';
import { GAME_NAMES } from '@/constants/games';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const name = GAME_NAMES[slug] ?? slug;
  return {
    title: 'Karakterek',
    description: `${name} karakter lista — elemek, fegyverek, ritkaság szerinti szűrés és részletes guide-ok.`,
  };
}

export default async function CharactersPage() {
  const { characters, imageMap } = await fetchCharacterList();

  return <Characters characters={characters} imageMap={imageMap} />;
}
