'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  return (
    <footer className="py-6 border-t border-white/10 bg-black/40" role="contentinfo">
      <div className="wrapper text-center">
        <p className="text-white/30 text-sm tracking-wider">
          &copy; {new Date().getFullYear()} Gacha Hungary. Minden jog fenntartva.
        </p>
      </div>
    </footer>
  );
}
