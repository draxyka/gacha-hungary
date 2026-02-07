import Home from '@/features/home/Home';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Gacha Hungary',
  url: 'https://gacha-hungary.hu',
  description: 'Magyar nyelvű gacha játék közösségi oldal.',
  inLanguage: 'hu',
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Home />
    </>
  );
}
