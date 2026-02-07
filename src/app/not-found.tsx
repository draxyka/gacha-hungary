import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Az oldal nem található',
};

export default function NotFound() {
  return (
    <section className="flex-1 flex items-center justify-center py-16">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white/20 tracking-widest mb-4">404</h1>
        <p className="text-lg text-white/60 mb-8">Az oldal nem található.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-white/10 border border-white/20 text-white text-sm uppercase tracking-wider rounded-xl no-underline hover:bg-white/20 transition-colors"
        >
          Vissza a főoldalra
        </Link>
      </div>
    </section>
  );
}
