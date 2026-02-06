import Game from '@/features/game/Game';

export default async function GamePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  return <Game slug={slug} />;
}
