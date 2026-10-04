/** Játékok, amelyek élesben elérhetők (a többi "Hamarosan" a főoldalon, és 404 az útvonalon) */
export const LIVE_GAMES = ['wuthering-waves'];

export const GAME_NAMES: Record<string, string> = {
  'wuthering-waves': 'Wuthering Waves',
  'genshin-impact': 'Genshin Impact',
  'honkai-star-rail': 'Honkai: Star Rail',
  'zenless-zone-zero': 'Zenless Zone Zero',
};

/** Szín a header-ben és egyéb UI elemeken (játéknév, vissza gomb, stb.) */
export const GAME_COLORS: Record<string, string> = {
  'wuthering-waves': 'text-amber-400',
  'genshin-impact': 'text-sky-300',
  'honkai-star-rail': 'text-indigo-300',
  'zenless-zone-zero': 'text-orange-400',
};

/** Erősebb accent szín kiemelésekhez (kártya címek, featured elemek) */
export const GAME_ACCENT_COLORS: Record<string, string> = {
  'wuthering-waves': 'text-amber-300',
  'genshin-impact': 'text-sky-200',
  'honkai-star-rail': 'text-indigo-200',
  'zenless-zone-zero': 'text-orange-300',
};

/** Radial glow szín a háttérhez */
export const GAME_GLOW: Record<string, string> = {
  'wuthering-waves': 'rgba(245,158,11,0.16)',
  'genshin-impact': 'rgba(56,189,248,0.16)',
  'honkai-star-rail': 'rgba(129,140,248,0.16)',
  'zenless-zone-zero': 'rgba(251,146,60,0.16)',
};

/** Header navigációs linkek játékonként (href '' = a játék főoldala, a hírlista) */
export type NavLink = { label: string; href: string; external?: boolean };

export const GAME_NAV_LINKS: Record<string, NavLink[]> = {
  'wuthering-waves': [
    { label: 'Hírek', href: '' },
    { label: 'Social Media', href: '/social-media' },
    { label: 'Események', href: 'https://wuwatracker.com/hu/timeline', external: true },
    { label: 'Tier List', href: 'https://www.prydwen.gg/wuthering-waves/tier-list/', external: true },
    { label: 'Térkép', href: 'https://wuthering.gg/map', external: true },
  ],
};
