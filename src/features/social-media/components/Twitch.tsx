'use client';

// TODO: Twitch API key lejárt - jelenleg Twitch embed iframe-mel működik
// TODO: Production-ben a parent paramétert a valós domain-re cserélni

export default function Twitch({ channel }: { channel: string }) {
  const parent = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

  return (
    <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 transition-all duration-300 hover:border-purple-500/30 hover:bg-white/10">
      <div className="aspect-video">
        <iframe
          src={`https://player.twitch.tv/?channel=${channel}&parent=${parent}`}
          allowFullScreen
          loading="lazy"
          className="w-full h-full"
          title={`${channel} Twitch stream`}
        />
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
