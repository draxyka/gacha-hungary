import Core from '@/core/core';
import { CoreProps } from '@/core/types/core.types';
import { get } from '@/utils/req.service';

export default async function GamePage({
  params,
}: Readonly<{
  params: { slug: 'wuthering-waves' | 'honkai-star-rail' | 'zenless-zone-zero' | 'genshin-impact' };
}>) {
  const { slug } = await params;
  const gameData: CoreProps = await get(slug);

  return <Core gameType={slug} initialGameData={gameData} />;
}
