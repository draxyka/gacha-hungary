// TODO: YouTube adatok korábban /api/youtube route-ból jöttek (YouTube API v3 proxy)

export default function Youtube({ channelId, name }: { channelId: string; name: string }) {
  return (
    <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-red-500/30">
      <div className="w-20 h-20 rounded-full border-2 border-red-500/50 bg-red-500/10 flex items-center justify-center mb-4">
        <span className="text-2xl text-red-400">&#9654;</span>
      </div>
      <h3 className="font-semibold text-white uppercase tracking-[0.1em]">{name}</h3>
      <a
        href={`https://www.youtube.com/channel/${channelId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 bg-red-500/80 text-white px-5 py-2.5 rounded-xl text-sm font-medium no-underline transition-all hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/20"
      >
        Csatorna megnyitása
      </a>
    </div>
  );
}
