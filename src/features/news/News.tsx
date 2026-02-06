import Image from 'next/image';
import Link from 'next/link';
import { NEWS_DATA } from './news.mock';

export default function News({ slug }: { slug: string }) {
  const news = NEWS_DATA[slug] ?? [];

  return (
    <section className="flex-1 py-16">
      <div className="wrapper">
        <h1 className="text-3xl md:text-4xl text-white uppercase font-extralight mb-12 tracking-[0.25em] text-center">
          HÍREK
        </h1>
        {/* TODO: Hírek betöltése BE-ből (twitter/{slug}/tweets) */}
        {news.length === 0 && <p className="text-white/60 text-center text-lg">Nincsenek hírek.</p>}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((newsItem) => (
            <Link key={newsItem.id} href={`/${slug}/hirek/${newsItem.id}`} className="group no-underline">
              <article className="h-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:-translate-y-1">
                <figure className="relative aspect-video overflow-hidden">
                  <Image
                    src={newsItem.image ?? '/assets/images/fallback-image.png'}
                    alt={newsItem.title}
                    fill={true}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </figure>
                <div className="p-6">
                  <time className="text-xs uppercase tracking-[0.2em] text-gray-400">
                    {new Date(newsItem.createdAt).toLocaleDateString('hu-HU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <h2 className="mt-2 text-lg font-semibold text-white tracking-wide">{newsItem.title}</h2>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed line-clamp-2">{newsItem.fullText}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
