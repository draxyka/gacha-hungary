'use client';

import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/') return null;

  return (
    <footer className="border-t border-white/5 py-5" role="contentinfo">
      <div className="wrapper text-center">
        <p className="text-white/30 text-xs uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Gacha Hungary. Minden jog fenntartva.
        </p>
      </div>
    </footer>
  );
}
