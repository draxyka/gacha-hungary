export const GAME_NAMES: Record<string, string> = {
  'wuthering-waves': 'Wuthering Waves',
  'honkai-star-rail': 'Honkai: Star Rail',
  'zenless-zone-zero': 'Zenless Zone Zero',
  'genshin-impact': 'Genshin Impact',
};

/** Szín a header-ben és egyéb UI elemeken (játéknév, vissza gomb, stb.) */
export const GAME_COLORS: Record<string, string> = {
  'wuthering-waves': 'text-amber-400',
  'honkai-star-rail': 'text-indigo-300',
  'zenless-zone-zero': 'text-orange-400',
  'genshin-impact': 'text-sky-300',
};

/** Erősebb accent szín kiemelésekhez (kártya címek, featured elemek) */
export const GAME_ACCENT_COLORS: Record<string, string> = {
  'wuthering-waves': 'text-amber-300',
  'honkai-star-rail': 'text-indigo-200',
  'zenless-zone-zero': 'text-orange-300',
  'genshin-impact': 'text-sky-200',
};

/** Radial glow szín a game overview háttérhez */
export const GAME_GLOW: Record<string, string> = {
  'wuthering-waves': 'rgba(245,158,11,0.08)',
  'honkai-star-rail': 'rgba(129,140,248,0.08)',
  'zenless-zone-zero': 'rgba(251,146,60,0.08)',
  'genshin-impact': 'rgba(56,189,248,0.08)',
};

/** Kártya border/gradient szín a game overview kártyákhoz */
export const GAME_CARD_BORDER: Record<string, string> = {
  'wuthering-waves': 'border-amber-500/20 hover:border-amber-500/40',
  'honkai-star-rail': 'border-indigo-500/20 hover:border-indigo-500/40',
  'zenless-zone-zero': 'border-orange-500/20 hover:border-orange-500/40',
  'genshin-impact': 'border-sky-500/20 hover:border-sky-500/40',
};

/** Header navigációs linkek játékonként */
export type NavLink = { label: string; href: string; external?: boolean };

export const GAME_NAV_LINKS: Record<string, NavLink[]> = {
  'wuthering-waves': [
    { label: 'Hírek', href: '/hirek' },
    { label: 'Karakterek', href: '/karakterek' },
    { label: 'Kódok', href: '/kodok' },
    { label: 'Lore', href: '/lore' },
    { label: 'Social Media', href: '/social-media' },
    { label: 'Események', href: 'https://wuwatracker.com/hu/timeline', external: true },
    { label: 'Tier List', href: 'https://www.prydwen.gg/wuthering-waves/tier-list/', external: true },
    { label: 'Térkép', href: 'https://wuthering.gg/map', external: true },
  ],
  // TODO: Honkai Star Rail nav linkek
  // TODO: Zenless Zone Zero nav linkek
  // TODO: Genshin Impact nav linkek
};
