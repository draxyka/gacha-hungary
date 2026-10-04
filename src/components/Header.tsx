'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GAME_NAMES, GAME_COLORS, GAME_NAV_LINKS, NavLink } from '@/constants/games';

function isLinkActive(link: NavLink, slug: string, pathname: string): boolean {
  if (link.external) return false;
  const root = `/${slug}`;
  // A "Hírek" a játék főoldala — a hír részletek is ide tartoznak
  if (link.href === '') return pathname === root || pathname.startsWith(`${root}/hirek`);
  const fullHref = `${root}${link.href}`;
  return pathname === fullHref || pathname.startsWith(fullHref + '/');
}

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
  const isActive = isLinkActive(link, slug, pathname);
  const fullHref = link.external ? link.href : `/${slug}${link.href}`;

  const cls = `inline-flex items-center gap-1.5 rounded-full uppercase tracking-[0.12em] no-underline transition-all duration-200 ${
    size === 'sm' ? 'px-3.5 py-1.5 text-xs' : 'px-4 py-3 text-sm'
  } ${
    isActive
      ? 'bg-amber-400/10 text-amber-300 font-semibold ring-1 ring-inset ring-amber-400/30'
      : 'text-white/50 hover:text-white hover:bg-white/5'
  }`;

  if (link.external) {
    return (
      <a href={fullHref} target="_blank" rel="noopener noreferrer" onClick={onClick} className={cls}>
        {link.label}
        <span className="text-[10px] opacity-50" aria-hidden="true">
          ↗
        </span>
      </a>
    );
  }

  return (
    <Link href={fullHref} onClick={onClick} className={cls} aria-current={isActive ? 'page' : undefined}>
      {link.label}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const slug = pathname.split('/').filter(Boolean)[0] ?? '';

  const gameName = GAME_NAMES[slug] ?? '';
  const gameColor = GAME_COLORS[slug] ?? 'text-white';
  const navLinks = GAME_NAV_LINKS[slug] ?? [];

  if (pathname === '/') return null;

  return (
    <header className="sticky top-0 z-50 bg-black/70 backdrop-blur-xl" role="banner">
      <nav className="wrapper flex items-center h-16 gap-4 sm:gap-6" aria-label="Fő navigáció">
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            className="text-sm font-semibold uppercase tracking-[0.2em] no-underline text-white/80 transition-colors hover:text-white"
          >
            Gacha Hungary
          </Link>
          {gameName && (
            <>
              <span className="text-white/20" aria-hidden="true">
                /
              </span>
              <Link
                href={`/${slug}`}
                className={`text-sm font-bold uppercase tracking-[0.15em] no-underline transition-opacity hover:opacity-80 ${gameColor}`}
              >
                {gameName}
              </Link>
            </>
          )}
        </div>

        {navLinks.length > 0 && (
          <>
            <div className="hidden lg:flex items-center gap-1 ml-auto">
              {navLinks.map((link) => (
                <NavItem key={link.label} link={link} slug={slug} pathname={pathname} />
              ))}
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden ml-auto w-10 h-10 flex items-center justify-center rounded-full bg-white/5 ring-1 ring-inset ring-white/10 cursor-pointer transition-colors hover:bg-white/10"
              aria-label={menuOpen ? 'Menü bezárása' : 'Menü megnyitása'}
              aria-expanded={menuOpen}
            >
              <div className="flex flex-col items-center justify-center gap-[5px]">
                <span
                  className={`block h-[2px] w-4 bg-white/70 transition-all duration-200 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
                />
                <span className={`block h-[2px] w-4 bg-white/70 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
                <span
                  className={`block h-[2px] w-4 bg-white/70 transition-all duration-200 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
                />
              </div>
            </button>
          </>
        )}
      </nav>

      {/* Vékony amber fénycsík az alján */}
      <div
        className="h-px bg-linear-to-r from-transparent via-amber-400/40 to-transparent"
        aria-hidden="true"
      />

      {menuOpen && (
        <div className="lg:hidden absolute top-full inset-x-0 bg-black/95 backdrop-blur-xl border-b border-white/10">
          <div className="wrapper py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavItem
                key={link.label}
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
