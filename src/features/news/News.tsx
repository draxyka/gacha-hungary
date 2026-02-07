import Image from 'next/image';
import Link from 'next/link';
import { fetchNewsList } from './news.service';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function News({ slug }: { slug: string }) {
  const news = await fetchNewsList(slug, 12);
  const [featured, ...rest] = news;

  return (
    <section className="flex-1 py-16">
      <div className="wrapper">
        <h1 className="text-3xl md:text-4xl text-white uppercase font-extralight mb-12 tracking-[0.25em] text-center">
          HÍREK
        </h1>
        {news.length === 0 && <p className="text-white/60 text-center text-lg">Nincsenek hírek.</p>}

        {/* Featured hero article */}
        {featured && (
          <Link href={`/${slug}/hirek/${featured.slug}`} className="group no-underline block mb-10">
            <article className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 transition-all duration-300 group-hover:border-white/25 group-hover:shadow-xl group-hover:shadow-white/5">
              {featured.image && (
                <figure className="relative aspect-[21/9] overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill={true}
                    unoptimized
                    priority
                    sizes="100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </figure>
              )}
              <div className={`${featured.image ? 'absolute bottom-0 inset-x-0' : ''} p-8 md:p-10`}>
                <time className="text-xs uppercase tracking-[0.2em] text-white/50">
                  {formatDate(featured.createdAt)}
                </time>
                <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white tracking-wide leading-tight max-w-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm md:text-base text-white/60 leading-relaxed max-w-2xl line-clamp-2">
                  {featured.excerpt}
                </p>
              </div>
            </article>
          </Link>
        )}

        {/* Rest of the news grid */}
        {rest.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((newsItem) => (
              <Link key={newsItem.id} href={`/${slug}/hirek/${newsItem.slug}`} className="group no-underline">
                <article className="h-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-white/5">
                  {newsItem.image && (
                    <figure className="relative aspect-video overflow-hidden">
                      <Image
                        src={newsItem.image}
                        alt={newsItem.title}
                        fill={true}
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </figure>
                  )}
                  <div className="p-6">
                    <time className="text-xs uppercase tracking-[0.2em] text-gray-400">
                      {formatDate(newsItem.createdAt)}
                    </time>
                    <h2 className="mt-2 text-lg font-semibold text-white tracking-wide">{newsItem.title}</h2>
                    <p className="mt-2 text-sm text-white/60 leading-relaxed line-clamp-2">{newsItem.excerpt}</p>
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
