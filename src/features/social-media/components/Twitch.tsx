'use client';

import { useEffect, useState } from 'react';

/**
 * Iframe `parent` must match the real page host. On SSR, `window` is missing — we set `src`
 * after mount so production domain / localhost are both correct (no bogus `parent=localhost` on the server HTML).
 */
export default function Twitch({ channel }: { channel: string }) {
  const [embedSrc, setEmbedSrc] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams({
      channel,
      parent: window.location.hostname,
    });
    setEmbedSrc(`https://player.twitch.tv/?${params.toString()}`);
  }, [channel]);

  return (
    <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 transition-all duration-300 hover:border-purple-500/30 hover:bg-white/10">
      <div className="aspect-video">
        {embedSrc ? (
          <iframe
            src={embedSrc}
            allowFullScreen
            loading="lazy"
            className="h-full w-full border-0"
            title={`${channel} Twitch stream`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-black/50 text-sm text-white/50">
            Stream betöltése…
          </div>
        )}
      </div>
      <div className="p-4 flex items-center justify-between">
        <a
          href={`https://twitch.tv/${channel}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-bold uppercase tracking-[0.1em] text-purple-400 no-underline hover:text-purple-300 transition-colors"
        >
          {channel}
        </a>
        <span className="text-xs text-white/30 uppercase tracking-[0.15em]">Twitch</span>
      </div>
    </div>
  );
}
