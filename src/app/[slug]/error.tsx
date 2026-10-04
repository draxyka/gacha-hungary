'use client';

export default function GameError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="flex-1 flex items-center justify-center py-24">
      <div className="wrapper max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400/80">Hiba</p>
        <h1 className="mt-3 text-2xl md:text-3xl font-bold text-white">A hírek jelenleg nem érhetők el</h1>
        <p className="mt-4 text-white/50">A játék hírszervere most lassan válaszol. Próbáld újra pár másodperc múlva.</p>
        <button
          onClick={reset}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-amber-300 ring-1 ring-inset ring-amber-400/30 cursor-pointer transition-colors hover:bg-amber-400/20"
        >
          Újrapróbálás
        </button>
      </div>
    </section>
  );
}
