'use client';
import { get } from '@/utils/req.service';
import { format } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import './news.css';

type News = {
  link: string;
  title: string;
  fullText: string;
  image: string | null;
  createdAt: string;
};

export default function News({ params }: { params: { slug: string } }) {
  const [translatedNews, setTranslatedNews] = useState<News[] | null>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const currentSlug = await params;
      try {
        const response = await get(`twitter/${currentSlug.slug}/tweets`);

        setTranslatedNews(response);
      } catch (error) {
        console.error('Hiba a News API lekérdezésnél:', error);
      }
    };

    fetchNews();
  }, [params]);

  return (
    <section className="news">
      <div className="wrapper">
        <h1>HÍREK</h1>
        <div className="news-card-wrapper">
          {translatedNews?.map((newsItem, index) => (
            <article key={index}>
              <time>{format(newsItem.createdAt, 'yyyy-MM-dd HH:mm')}</time>
              <figure>
                <Image src={newsItem.image ? newsItem.image : '/assets/images/fallback-image.png'} alt="" fill={true} />
              </figure>
              <div className="news-card-main">
                <pre>{newsItem.fullText}</pre>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
