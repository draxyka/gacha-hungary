import Link from 'next/link';
import { HOME_ITEMS } from './home.mock';

const ENABLED_SLUGS = ['wuthering-waves'];

const TITLE_COLORS: Record<string, string> = {
  'wuthering-waves': 'text-gray-400',
  'honkai-star-rail': 'text-sky-300',
  'zenless-zone-zero': 'text-lime-400',
  'genshin-impact': 'text-amber-400',
};

const VIDEO_OFFSETS: Record<string, string> = {
  'wuthering-waves': 'lg:left-[-120px]',
  'honkai-star-rail': 'lg:left-[-131px]',
  'zenless-zone-zero': 'lg:left-[-265px]',
  'genshin-impact': 'lg:left-[184px]',
};

export default function Home() {
  return (
    <div className="flex flex-col overflow-hidden w-full flex-1 lg:flex-row">
      {HOME_ITEMS.map((item) => {
        const isEnabled = ENABLED_SLUGS.includes(item.slug);
        const titleColor = TITLE_COLORS[item.slug] ?? 'text-white';
        const videoOffset = VIDEO_OFFSETS[item.slug] ?? '';

        return (
          <Link
            key={item.slug}
            href={isEnabled ? `/${item.slug}` : '/'}
            className={`group relative flex items-center justify-center flex-1 overflow-hidden after:content-[''] after:absolute after:w-full after:h-full after:bg-black after:left-0 after:top-0 after:z-[1] ${isEnabled ? 'after:opacity-70' : 'pointer-events-none after:opacity-90'}`}
          >
            <video
              src={item.videoUrl}
              poster={item.videoPoster || undefined}
              autoPlay
              muted
              loop
              className={`h-full w-[100vw] relative transition-transform duration-300 ease-in-out object-cover scale-100 group-hover:scale-[1.2] ${videoOffset}`}
            />
            <h1
              className={`absolute z-[2] text-center top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-2xl font-bold uppercase lg:text-4xl ${titleColor}`}
            >
              {item.title} <span className="text-white block text-2xl">{item.description}</span>
            </h1>
            {!isEnabled && (
              <h2 className="text-red-400 font-bold absolute z-10 w-full sm:bottom-5 bottom-3 text-center">
                Fejlesztés alatt!
              </h2>
            )}
          </Link>
        );
      })}
    </div>
  );
}
