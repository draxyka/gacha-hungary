'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GAME_NAMES, GAME_COLORS, GAME_NAV_LINKS, NavLink } from '@/constants/games';

function NavItem({
  link,
  slug,
  pathname,
  onClick,
  size = 'sm',
}: {
  link: NavLink;
  slug: string;
  pathname: string;
  onClick?: () => void;
  size?: 'sm' | 'md';
}) {
  const isExternal = link.external;
  const fullHref = isExternal ? link.href : `/${slug}${link.href}`;
  const isActive = !isExternal && (pathname === fullHref || pathname.startsWith(fullHref + '/'));

  const cls =
    size === 'sm'
      ? `px-3 py-1.5 rounded-lg text-xs uppercase tracking-[0.1em] no-underline transition-all ${
          isActive
            ? 'bg-white/10 text-white font-semibold'
            : 'text-white/40 hover:text-white/70 hover:bg-white/5'
        }`
      : `px-4 py-2.5 rounded-lg text-sm uppercase tracking-[0.1em] no-underline transition-all ${
          isActive
            ? 'bg-white/10 text-white font-semibold'
            : 'text-white/50 hover:text-white hover:bg-white/5'
        }`;

  if (isExternal) {
    return (
      <a
        href={fullHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={`${cls} inline-flex items-center gap-1`}
      >
        {link.label}
        <span className="text-[9px] opacity-50">↗</span>
      </a>
    );
  }

  return (
    <Link key={link.href} href={fullHref} onClick={onClick} className={cls}>
      {link.label}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === '/';
  const segments = pathname.split('/').filter(Boolean);
  const slug = segments[0] ?? '';

  const gameName = GAME_NAMES[slug] ?? '';
  const gameColor = GAME_COLORS[slug] ?? 'text-white';
  const navLinks = GAME_NAV_LINKS[slug] ?? [];

  const isGamePage = !isHome && !!gameName;

  if (isHome) return null;

  return (
    <header className="bg-black/60 backdrop-blur-md border-b border-white/10 relative z-50" role="banner">
      <nav className="wrapper flex items-center h-14 gap-4 sm:gap-6" aria-label="Fő navigáció">
        {/* Logo / Home link */}
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.2em] no-underline shrink-0 transition-opacity hover:opacity-80 text-white"
        >
          Gacha Hungary
        </Link>

        {/* Game name - links to game overview */}
        {isGamePage && (
          <>
            <span className="text-white/20" aria-hidden="true">/</span>
            <Link
              href={`/${slug}`}
              className={`text-sm font-semibold uppercase tracking-[0.15em] no-underline hover:opacity-80 transition-opacity shrink-0 ${gameColor}`}
            >
              {gameName}
            </Link>
          </>
        )}

        {/* Desktop nav links */}
        {isGamePage && navLinks.length > 0 && (
          <>
            <span className="text-white/20 hidden lg:block" aria-hidden="true">/</span>
            <div className="hidden lg:flex items-center gap-1 flex-wrap">
              {navLinks.map((link) => (
                <NavItem key={link.href} link={link} slug={slug} pathname={pathname} size="sm" />
              ))}
            </div>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden ml-auto w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 cursor-pointer transition-colors hover:bg-white/10"
              aria-label="Menü megnyitása"
              aria-expanded={menuOpen}
            >
              <div className="flex flex-col items-center justify-center gap-[5px]">
                <span className={`block h-[2px] w-4 bg-white/70 transition-all duration-200 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block h-[2px] w-4 bg-white/70 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-[2px] w-4 bg-white/70 transition-all duration-200 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </div>
            </button>
          </>
        )}
      </nav>

      {/* Mobile dropdown menu */}
      {isGamePage && menuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md border-b border-white/10">
          <div className="wrapper py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavItem
                key={link.href}
                link={link}
                slug={slug}
                pathname={pathname}
                onClick={() => setMenuOpen(false)}
                size="md"
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
