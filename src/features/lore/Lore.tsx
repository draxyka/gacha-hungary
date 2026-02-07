'use client';

import { LORE_DATA } from './lore.data';
import { useGame } from '@/context/GameContext';

export default function Lore() {
  const game = useGame();
  const slug = game?.slug ?? '';
  const lore = LORE_DATA[slug];

  if (!lore) {
    return (
      <section className="flex-1 py-16">
        <div className="wrapper text-center">
          <p className="text-white/60 text-lg">Ehhez a játékhoz még nincs lore összefoglaló.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex-1 py-16">
      <div className="wrapper max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl text-white uppercase font-extralight mb-4 tracking-[0.25em] text-center">
          A Világ
        </h1>
        <p className="text-center text-white/40 text-sm mb-12 max-w-lg mx-auto">
          Rövid összefoglaló a játék világáról és történetéről
        </p>

        {/* Intro */}
        <div className="mb-12 rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8">
          <p className="text-white/70 text-base md:text-lg leading-relaxed">{lore.intro}</p>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {lore.sections.map((section, i) => (
            <article key={i} className="group">
              <h2 className="text-xl md:text-2xl font-semibold text-white tracking-wide mb-3 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-amber-500/40 block shrink-0" />
                {section.title}
              </h2>
              <p className="text-white/60 text-sm md:text-base leading-relaxed pl-11">
                {section.content}
              </p>
            </article>
          ))}
        </div>

        {/* Source note */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/30 uppercase tracking-wider">
            Forrás: Wuthering Waves Fandom Wiki — szabadon fordítva
          </p>
        </div>
      </div>
    </section>
  );
}
