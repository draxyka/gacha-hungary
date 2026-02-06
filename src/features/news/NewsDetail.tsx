import Image from 'next/image';
import { NEWS_DATA } from './news.mock';
import { notFound } from 'next/navigation';

export default function NewsDetail({ slug, id }: { slug: string; id: string }) {
  const news = NEWS_DATA[slug] ?? [];
  const article = news.find((item) => item.id === id);

  if (!article) {
    notFound();
  }

  return (
    <section className="flex-1 py-16">
      <div className="wrapper">
        <article className="max-w-3xl mx-auto">
          {article.image && (
            <figure className="relative aspect-video rounded-2xl overflow-hidden mb-10">
              <Image
                src={article.image}
                alt={article.title}
                fill={true}
                className="object-cover"
              />
            </figure>
          )}

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

          <div className="mt-2 mb-12 flex justify-center">
            <span className="block w-16 h-[2px] bg-white/20 rounded-full" />
          </div>

          <div className="text-white/80 text-lg leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
        </article>
      </div>
    </section>
  );
}
