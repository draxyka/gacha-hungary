import '../styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata, Viewport } from 'next';
import { Roboto_Condensed } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin', 'latin-ext'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-roboto-condensed',
});

export const metadata: Metadata = {
  title: {
    default: 'Gacha Hungary — Magyar gacha játék közösség',
    template: '%s | Gacha Hungary',
  },
  description:
    'Magyar nyelvű gacha játék közösségi oldal. Wuthering Waves, Genshin Impact, Honkai Star Rail, Zenless Zone Zero hírek, karakter guide-ok és közösségi tartalmak.',
  keywords: ['gacha', 'wuthering waves', 'genshin impact', 'honkai star rail', 'zenless zone zero', 'magyar', 'hungary', 'guide', 'karakter', 'hírek'],
  metadataBase: new URL('https://gacha-hungary.hu'),
  openGraph: {
    type: 'website',
    locale: 'hu_HU',
    siteName: 'Gacha Hungary',
    title: 'Gacha Hungary — Magyar gacha játék közösség',
    description: 'Magyar nyelvű gacha játék közösségi oldal. Hírek, karakter guide-ok és közösségi tartalmak.',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" className={robotoCondensed.variable}>
      <body className="flex flex-col min-h-screen bg-black">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
