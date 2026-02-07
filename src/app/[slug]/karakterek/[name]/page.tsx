import CharacterDetailPage from '@/features/characters/CharacterDetail';
import { fetchCharacterBySlug, getCharacterTranslation } from '@/features/characters/characters.service';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string; name: string }> }): Promise<Metadata> {
  const { name } = await params;
  const character = await fetchCharacterBySlug(name);
  if (!character) return { title: 'Karakter' };
  return {
    title: `${character.name} — ${character.element} ${character.weapon}`,
    description: `${character.name} karakter guide: képességek, buildek, sequences és értékelés. ${character.rarity}★ ${character.element} ${character.weapon}.`,
  };
}

export default async function CharacterPage({ params }: { params: Promise<{ slug: string; name: string }> }) {
  const { slug, name } = await params;
  const character = await fetchCharacterBySlug(name);

  if (!character) {
    notFound();
  }

  const translation = await getCharacterTranslation(slug, name);

  return <CharacterDetailPage character={character} translation={translation} />;
}
