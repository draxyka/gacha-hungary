import Image from 'next/image';
import Link from 'next/link';
import { fetchNewsBySlug } from './news.service';
import { notFound } from 'next/navigation';
import './news-content.css';

export default async function NewsDetail({ slug, id }: { slug: string; id: string }) {
  const article = await fetchNewsBySlug(slug, id);

  if (!article) {
    notFound();
  }

  return (
    <section className="flex-1">
      {/* Hero image */}
      {article.image && (
        <div className="relative w-full aspect-[21/7] max-h-[400px] overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />
        </div>
      )}

      <div className={`wrapper ${article.image ? '-mt-20 relative z-10' : 'pt-16'}`}>
        <article className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl text-white font-bold text-center tracking-wide leading-tight">
            {article.title}
          </h1>

          <time className="block mt-4 text-center text-sm uppercase tracking-[0.2em] text-gray-400">
            {new Date(article.createdAt).toLocaleDateString('hu-HU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>

          <div className="mt-3 mb-12 flex justify-center">
            <span className="block w-16 h-[2px] bg-white/20 rounded-full" />
          </div>

          <div
            className="news-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="mt-12 pt-8 border-t border-white/10 text-center pb-16">
            <Link
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              Eredeti forrás: wutheringwaves.gg
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
