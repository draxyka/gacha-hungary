'use client';

import { createContext, useContext } from 'react';
import { GAME_NAMES, GAME_COLORS } from '@/constants/games';

type GameContextType = {
  slug: string;
  gameName: string;
  gameColor: string;
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ slug, children }: { slug: string; children: React.ReactNode }) {
  const gameName = GAME_NAMES[slug] ?? slug;
  const gameColor = GAME_COLORS[slug] ?? 'text-white';

  return (
    <GameContext.Provider value={{ slug, gameName, gameColor }}>
      {children}
    </GameContext.Provider>
  );
}

/** Returns game context or null when outside GameProvider (e.g. home page) */
export function useGame(): GameContextType | null {
  return useContext(GameContext);
}
