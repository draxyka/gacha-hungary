import Image from 'next/image';
import Link from 'next/link';
import { fetchNewsById } from './news.service';
import { notFound } from 'next/navigation';
import './news-content.css';

export default async function NewsDetail({ slug, id }: { slug: string; id: string }) {
  const article = await fetchNewsById(slug, id);

  if (!article) {
    notFound();
  }

  return (
    <section className="flex-1">
      {article.image && (
        <div className="relative w-full aspect-[16/9] md:aspect-[21/7] max-h-[440px] overflow-hidden">
          <Image src={article.image} alt={article.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/10" />
        </div>
      )}

      <div className={`wrapper ${article.image ? '-mt-24 relative z-10' : 'pt-16'}`}>
        <article className="max-w-3xl mx-auto">
          <Link
            href={`/${slug}`}
            className="group inline-flex items-center gap-2 mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/50 no-underline transition-colors hover:text-amber-300"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true">
              ←
            </span>
            Vissza a hírekhez
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            {article.category && (
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-300 bg-amber-400/10 ring-1 ring-inset ring-amber-400/30 px-2.5 py-1 rounded-full">
                {article.category}
              </span>
            )}
            <time className="text-xs uppercase tracking-[0.2em] text-white/50">
              {new Date(article.createdAt).toLocaleDateString('hu-HU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>

          <h1 className="mt-4 text-3xl md:text-5xl text-white font-bold tracking-wide leading-tight">{article.title}</h1>

          <span className="block mt-8 mb-10 w-20 h-[2px] rounded-full bg-linear-to-r from-amber-400 to-amber-400/0" />

          {!article.translated && (
            <p className="mb-8 rounded-xl bg-amber-400/5 ring-1 ring-inset ring-amber-400/20 px-4 py-3 text-sm text-amber-200/80">
              Ehhez a hírhez még nem készült magyar fordítás, ezért az eredeti angol szöveg látható.
            </p>
          )}

          <div className="news-content" dangerouslySetInnerHTML={{ __html: article.content }} />

          <div className="mt-14 pt-8 pb-20 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <Link
              href={`/${slug}`}
              className="text-sm text-white/50 no-underline transition-colors hover:text-amber-300"
            >
              ← Összes hír
            </Link>
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/40 no-underline transition-colors hover:text-white/70"
            >
              Eredeti forrás: {new URL(article.sourceUrl).hostname} ↗
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
