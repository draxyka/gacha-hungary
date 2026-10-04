import Image from 'next/image';
import Link from 'next/link';
import { fetchNewsList } from './news.service';
import { GAME_GLOW, GAME_NAMES } from '@/constants/games';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function CategoryChip({ category }: { category: string }) {
  if (!category) return null;
  return (
    <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300 bg-amber-400/10 ring-1 ring-inset ring-amber-400/30 px-2.5 py-1 rounded-full">
      {category}
    </span>
  );
}

export default async function News({ slug }: { slug: string }) {
  const news = await fetchNewsList(slug);
  const [featured, ...rest] = news;
  const glow = GAME_GLOW[slug] ?? 'rgba(255,255,255,0.05)';

  return (
    <section className="relative flex-1 pb-20">
      {/* Háttér glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px]"
        style={{ background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${glow}, transparent)` }}
        aria-hidden="true"
      />

      <div className="wrapper relative">
        <header className="pt-14 pb-10 md:pt-20 md:pb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-400/80">{GAME_NAMES[slug]}</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold uppercase tracking-[0.08em] text-white">Hírek</h1>
          <p className="mt-4 max-w-xl text-white/50 text-base md:text-lg">
            A legfrissebb hírek, események és frissítések — magyarul.
          </p>
        </header>

        {news.length === 0 && (
          <p className="rounded-2xl bg-white/[0.03] ring-1 ring-inset ring-white/10 py-16 text-center text-white/50 text-lg">
            Jelenleg nincsenek hírek.
          </p>
        )}

        {featured && (
          <Link href={`/${slug}/hirek/${featured.slug}`} className="group block no-underline mb-8">
            <article className="relative overflow-hidden rounded-3xl bg-white/[0.03] ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:ring-amber-400/40 group-hover:shadow-[0_0_60px_-15px_rgba(245,158,11,0.35)]">
              {featured.image && (
                <figure className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
                </figure>
              )}
              <div className={`${featured.image ? 'absolute bottom-0 inset-x-0' : ''} p-6 sm:p-8 md:p-12`}>
                <div className="flex flex-wrap items-center gap-3">
                  <CategoryChip category={featured.category} />
                  <time className="text-xs uppercase tracking-[0.2em] text-white/60">
                    {formatDate(featured.createdAt)}
                  </time>
                </div>
                <h2 className="mt-4 max-w-3xl text-2xl md:text-4xl font-bold leading-tight tracking-wide text-white transition-colors group-hover:text-amber-200">
                  {featured.title}
                </h2>
                {featured.excerpt && (
                  <p className="mt-3 max-w-2xl text-white/60 line-clamp-2 hidden sm:block">{featured.excerpt}</p>
                )}
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                  Tovább olvasom
                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </span>
              </div>
            </article>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((item) => (
              <Link key={item.id} href={`/${slug}/hirek/${item.slug}`} className="group no-underline">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white/[0.03] ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-white/[0.05] group-hover:ring-amber-400/40 group-hover:shadow-[0_0_40px_-15px_rgba(245,158,11,0.35)]">
                  {item.image && (
                    <figure className="relative aspect-video overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </figure>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <CategoryChip category={item.category} />
                      <time className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                        {formatDate(item.createdAt)}
                      </time>
                    </div>
                    <h2 className="mt-3 text-lg font-semibold leading-snug tracking-wide text-white transition-colors group-hover:text-amber-200">
                      {item.title}
                    </h2>
                    {item.excerpt && <p className="mt-2 text-sm text-white/50 line-clamp-2">{item.excerpt}</p>}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
