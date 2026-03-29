'use client';

import { useState } from 'react';
import { CODES_DATA, RedeemCode } from './codes.data';
import { useGame } from '@/context/GameContext';

function CodeCard({ code }: { code: RedeemCode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <code className="text-lg font-bold text-white tracking-wider">{code.code}</code>
      </div>
      <p className="text-sm text-white/50 leading-relaxed">{code.rewards}</p>
      <button
        onClick={handleCopy}
        className={`mt-auto self-start px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
          copied
            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
            : 'bg-white/10 text-white/70 border border-white/10 hover:bg-white/20 hover:text-white'
        }`}
      >
        {copied ? '✓ Másolva!' : 'Kód másolása'}
      </button>
    </div>
  );
}

export default function Codes() {
  const game = useGame();
  const slug = game?.slug ?? '';
  const codes = CODES_DATA[slug] ?? [];

  return (
    <section className="flex-1 py-16">
      <div className="wrapper">
        <h1 className="text-3xl md:text-4xl text-white uppercase font-extralight mb-4 tracking-[0.25em] text-center">
          Kódok
        </h1>
        <p className="text-center text-white/40 text-sm mb-12 max-w-lg mx-auto">
          Másold ki a kódot és használd fel a játékban: Settings → Other → Redemption Code
        </p>

        {codes.length === 0 && (
          <p className="text-white/60 text-center text-lg">Jelenleg nincsenek elérhető kódok.</p>
        )}

        {codes.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {codes.map((code) => (
              <CodeCard key={code.code} code={code} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
