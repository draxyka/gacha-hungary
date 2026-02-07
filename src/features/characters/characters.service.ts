import { CharacterListItem, CharacterDetail, PrydwenImage } from './types/character.type';

const PRYDWEN_BASE = 'https://www.prydwen.gg';
const PAGE_DATA = (path: string) => `${PRYDWEN_BASE}/page-data/${path}/page-data.json`;

/** Get the best image src from a Prydwen image object */
export function getPrydwenImageSrc(img: PrydwenImage | null): string | null {
  if (!img) return null;
  const src = img.localFile.childImageSharp.gatsbyImageData.images.fallback.src;
  return src.startsWith('/') ? `${PRYDWEN_BASE}${src}` : src;
}

/** Static query hash for the character list with images (Gatsby cache) */
const STATIC_QUERY_URL = `${PRYDWEN_BASE}/page-data/sq/d/3446734364.json`;

type CharacterWithImages = CharacterListItem & {
  smallImage: PrydwenImage | null;
};

// ─── Character translation cache ─────────────────────────────
type CharTranslation = {
  introduction?: string;
  review?: string;
  pros?: string;
  cons?: string;
  rotations?: string;
  endgameStats?: string;
  skills?: Record<string, string>;
  dupes?: Record<string, string>;
};

type CharTranslationCache = Record<string, CharTranslation>;

const charTranslationCaches = new Map<string, CharTranslationCache>();

async function getCharTranslations(gameSlug: string): Promise<CharTranslationCache> {
  if (charTranslationCaches.has(gameSlug)) {
    return charTranslationCaches.get(gameSlug)!;
  }
  try {
    const mod = await import(`./translations/${gameSlug}.json`);
    const data: CharTranslationCache = mod.default ?? mod;
    charTranslationCaches.set(gameSlug, data);
    return data;
  } catch {
    charTranslationCaches.set(gameSlug, {});
    return {};
  }
}

/** Get character translation data (or undefined) */
export async function getCharacterTranslation(
  gameSlug: string,
  charSlug: string
): Promise<CharTranslation | undefined> {
  const cache = await getCharTranslations(gameSlug);
  return cache[charSlug];
}

/** Fetch all WuWa characters (with icon images, single request) */
export async function fetchCharacterList(): Promise<{ characters: CharacterListItem[]; imageMap: Record<string, string | null> }> {
  try {
    const res = await fetch(STATIC_QUERY_URL, {
      next: { revalidate: 86400 }, // revalidate daily
    });
    if (!res.ok) return { characters: [], imageMap: {} };
    const data = await res.json();
    const nodes: CharacterWithImages[] = data.data?.allContentfulWwCharacter?.nodes ?? [];

    const filtered = nodes.filter((c) => !c.upcoming);
    const imageMap: Record<string, string | null> = {};
    for (const c of filtered) {
      imageMap[c.slug] = getPrydwenImageSrc(c.smallImage);
    }

    return { characters: filtered, imageMap };
  } catch {
    return { characters: [], imageMap: {} };
  }
}

/** Fetch a single character by slug */
export async function fetchCharacterBySlug(slug: string): Promise<CharacterDetail | null> {
  try {
    const res = await fetch(PAGE_DATA(`wuthering-waves/characters/${slug}`), {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const nodes = data.result?.data?.currentUnit?.nodes;
    if (!nodes || nodes.length === 0) return null;
    return nodes[0] as CharacterDetail;
  } catch {
    return null;
  }
}

/** Parse Contentful rich text JSON into plain text */
export function richTextToPlain(raw: string | undefined): string {
  if (!raw) return '';
  try {
    const doc = JSON.parse(raw);
    return extractText(doc);
  } catch {
    return '';
  }
}

function extractText(node: Record<string, unknown>): string {
  if (node.nodeType === 'text') return (node.value as string) ?? '';
  const children = node.content as Record<string, unknown>[] | undefined;
  if (!children) return '';
  return children.map(extractText).join('');
}

/** Parse Contentful rich text JSON into simple HTML */
export function richTextToHtml(raw: string | undefined): string {
  if (!raw) return '';
  try {
    const doc = JSON.parse(raw);
    return renderNode(doc);
  } catch {
    return '';
  }
}

function renderNode(node: Record<string, unknown>): string {
  if (node.nodeType === 'text') {
    let text = (node.value as string) ?? '';
    const marks = (node.marks as { type: string }[]) ?? [];
    for (const mark of marks) {
      if (mark.type === 'bold') text = `<strong>${text}</strong>`;
      if (mark.type === 'underline') text = `<u>${text}</u>`;
      if (mark.type === 'italic') text = `<em>${text}</em>`;
    }
    return text;
  }

  const children = (node.content as Record<string, unknown>[])?.map(renderNode).join('') ?? '';

  switch (node.nodeType) {
    case 'document':
      return children;
    case 'paragraph':
      return `<p>${children}</p>`;
    case 'heading-6':
      return `<h3>${children}</h3>`;
    case 'heading-5':
      return `<h3>${children}</h3>`;
    case 'heading-4':
      return `<h2>${children}</h2>`;
    case 'unordered-list':
      return `<ul>${children}</ul>`;
    case 'ordered-list':
      return `<ol>${children}</ol>`;
    case 'list-item':
      return `<li>${children}</li>`;
    default:
      return children;
  }
}
