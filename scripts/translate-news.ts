/**
 * Translation script — fetches news & character data, translates
 * new/changed content via DeepL, saves to per-game JSON caches.
 *
 * Usage:
 *   npm run translate                         # translate all games (news + characters)
 *   npm run translate -- wuthering-waves      # translate one game only
 *   npm run translate -- wuthering-waves news # translate only news for one game
 *   npm run translate -- wuthering-waves chars # translate only characters for one game
 *   npm run translate -- wuthering-waves news news-force # re-translate all fetched news (ignore hash cache)
 *
 * Environment variables (per game):
 *   DEEPL_KEY_WUTHERING_WAVES=xxx
 *   DEEPL_KEY_HONKAI_STAR_RAIL=xxx  (future)
 * Optional (Pro vs Free): DEEPL_API_URL=https://api.deepl.com/v2/translate
 *   Defaults to https://api-free.deepl.com/v2/translate
 */

import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// ─── Game config ─────────────────────────────────────────────
type GameConfig = {
  slug: string;
  name: string;
  envKey: string;
  newsApiUrl: string | null;
  charListUrl: string | null;
  charDetailUrl: ((slug: string) => string) | null;
};

const GAME_CONFIGS: GameConfig[] = [
  {
    slug: 'wuthering-waves',
    name: 'Wuthering Waves',
    envKey: 'DEEPL_KEY_WUTHERING_WAVES',
    newsApiUrl: 'https://wutheringwaves.gg/wp-json/wp/v2/posts',
    charListUrl: 'https://www.prydwen.gg/page-data/sq/d/3446734364.json',
    charDetailUrl: (s) => `https://www.prydwen.gg/page-data/wuthering-waves/characters/${s}/page-data.json`,
  },
  // TODO: add more games
];

// ─── Paths ───────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, '..');
const NEWS_TRANSLATIONS_DIR = path.join(ROOT, 'src/features/news/translations');
const CHAR_TRANSLATIONS_DIR = path.join(ROOT, 'src/features/characters/translations');
const HASHES_PATH = path.join(ROOT, 'scripts/.translation-hashes.json');

// ─── DeepL ───────────────────────────────────────────────────
const DEEPL_API_URL =
  process.env.DEEPL_API_URL?.trim() || 'https://api-free.deepl.com/v2/translate';

async function deeplTranslate(
  text: string,
  apiKey: string,
  tagHandling?: 'html'
): Promise<string> {
  if (!text.trim()) return text;

  const body: Record<string, unknown> = {
    text: [text],
    source_lang: 'EN',
    target_lang: 'HU',
  };
  if (tagHandling) body.tag_handling = tagHandling;

  const res = await fetch(DEEPL_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const respBody = await res.text();
    throw new Error(`DeepL error ${res.status}: ${respBody}`);
  }

  const data = await res.json();
  return data.translations?.[0]?.text ?? text;
}

async function deeplTranslateBatch(
  texts: string[],
  apiKey: string,
  tagHandling?: 'html'
): Promise<string[]> {
  // Filter out empty texts but keep track of positions
  const nonEmpty = texts.map((t, i) => ({ text: t, idx: i })).filter((t) => t.text.trim());
  if (nonEmpty.length === 0) return texts.map(() => '');

  const body: Record<string, unknown> = {
    text: nonEmpty.map((t) => t.text),
    source_lang: 'EN',
    target_lang: 'HU',
  };
  if (tagHandling) body.tag_handling = tagHandling;

  const res = await fetch(DEEPL_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const respBody = await res.text();
    throw new Error(`DeepL error ${res.status}: ${respBody}`);
  }

  const data = await res.json();
  const translated = (data.translations ?? []).map((t: { text: string }) => t.text);

  // Map results back to original positions
  const result = [...texts];
  nonEmpty.forEach((item, i) => {
    result[item.idx] = translated[i] ?? texts[item.idx];
  });
  return result;
}

// ─── Glossary — words that should NOT be translated ──────────
// These terms are wrapped in <span> tags before sending to DeepL
// so they stay untouched. Works with tag_handling: 'html'.
//
// Sorted longest-first at runtime so multi-word phrases match
// before their individual words (e.g. "Resonance Skill" before "Skill").
const DO_NOT_TRANSLATE: string[] = [
  // Game title & official event phrasing
  'Wuthering Waves',
  'Battle Rush',
  'Resolution to Illuminate the Shadows',
  'For You Who Walk in Snow',
  'Tides of Remembrance',
  'Depths of Illusive Realm',
  'Illusive Realm',
  'Simulation Training',
  'First Resonance',
  'Action',

  // ── Resources & items ────────────────────────────────────────
  'Astrite',
  'Shell Credit',
  'Resonance Potion',
  'Energy Core',
  'Revival Inhaler',
  'Energy Bag',
  'Lustrous Tide',
  'Radiant Tide',
  'Forging Tide',
  'Waveband',
  'Waveworn Resident',           // exploration collectible
  'Sealed Tube',
  'Premium Resonance Potion',
  'Crystal Solvent',

  // ── Elements ─────────────────────────────────────────────────
  'Glacio',
  'Fusion',
  'Electro',
  'Aero',
  'Spectro',
  'Havoc',

  // ── Weapon types ─────────────────────────────────────────────
  'Broadblade',
  'Sword',
  'Pistols',
  'Gauntlets',
  'Rectifier',

  // ── Core game mechanics ──────────────────────────────────────
  'Resonator',
  'Resonance Skill',
  'Resonance Liberation',
  'Resonance Chain',
  'Resonance Bonus',
  'Resonance Energy',
  'Concerto Energy',
  'Forte Circuit',
  'Forte Gauge',
  'Forte',
  'Intro Skill',
  'Outro Skill',
  'Inherent Skill',
  'Echo',
  'Sonata',
  'Sonata Effect',
  'Tacet Discord',
  'Tacet Field',
  'Tacet Core',
  'Data Bank',
  'Union Level',
  'Convene',
  'Overdash',
  'Parry',
  'Perfect Dodge',
  'Counterattack',
  'Mid-air Attack',
  'Plunging Attack',
  'Heavy Attack',
  'Basic Attack',
  'Dodge Counter',
  'Rover',
  'DMG',
  'ATK',
  'DEF',
  'HP',
  'CRIT',
  'Crit Rate',
  'Crit DMG',
  'DPS',
  'DoT',
  'Stamina',

  // ── Echo sets ────────────────────────────────────────────────
  'Moonlit Clouds',
  'Empyrean Anthem',
  'Rejuvenating Glow',
  'Eternal Radiance',
  'Frosty Resolve',
  'Lingering Tunes',
  'Void Thunder',
  'Sierra Gale',
  'Sun-sinking Eclipse',
  'Celestial Light',
  'Molten Rift',
  'Freezing Frost',
  'Midnight Veil',
  'Tidebreaking Courage',
  'Gusts of Welkin',
  'Dream of the Shoreless Sea',
  'Zeal of the Logeth River',

  // ── Echo-specific mechanics ──────────────────────────────────
  'Spectro Frazzle',
  'Heliacal Ember',
  'Phantasmic Imprint',
  'Afflatus',
  'Inklit Spirit',
  'Vibration Strength',
  'Energy Regen',

  // ── Banner types ─────────────────────────────────────────────
  'Featured Resonator Convene',
  'Featured Weapon Convene',
  'Beginner Convene',
  'Standard Resonator Convene',
  'Standard Weapon Convene',

  // ── Locations ────────────────────────────────────────────────
  'Solaris-3',
  'Jinzhou',
  'Huanglong',
  'Mt. Firmament',
  'Whining Aix\'s Mire',
  'Dim Forest',
  'Hollow Mirage',
  'Ragunna',
  'Rinascita',
  'Tethys Deep',
  'Black Shores',
  'Geode Cove',
  'Mt. Lanhua',

  // ── Factions / Organizations ─────────────────────────────────
  'Huaxu Research',
  'Hollow Special Operations Section 6',
  'Midnight Rangers',
  'Obol Squad',
  'Covenant',
  'Union',
  'Sentinel',
  'Abstainer',

  // ── Story / Lore terms ───────────────────────────────────────
  'Lament',
  'Calamity',
  'Overture',
  'Loong',

  // ── Boss / World boss names ──────────────────────────────────
  'Bell-Borne Geochelone',
  'Impermanence Heron',
  'Tempest Mephis',
  'Thundering Mephis',
  'Lampylumen Myriad',
  'Fallacy of No Return',
  'Scar',
  'Crownless',
  'Dreamless',
  'Jue',
  'Mourning Aix',
  'Feilian Beringal',
  'Inferno Rider',
  'Mech Abomination',
  'Carapace',
  'Hecate',

  // ── Weapon names (5★) ────────────────────────────────────────
  'Emerald of Genesis',
  'Lumingloss',
  'Blazing Brilliance',
  'Ages of Harvest',
  'Verdant Summit',
  'Stringmaster',
  'Cosmic Ripples',
  'Static Mist',
  'Abyss Surges',
  'Jiyan\'s Broadblade',         // limited collab/event weapons may appear in news
  'Jinhsi\'s Sword',

  // ── General / exploration / MMO ──────────────────────────────
  'mount-like',
  'Mounts',
  'Mount',

  // ── Character names ──────────────────────────────────────────
  // 1.x roster
  'Rover',
  'Aalto',
  'Baizhi',
  'Calcharo',
  'Chixia',
  'Danjin',
  'Encore',
  'Jiyan',
  'Jianxin',
  'Lingyang',
  'Mortefi',
  'Sanhua',
  'Taoqi',
  'Verina',
  'Yangyang',
  'Yinlin',
  'Yuanwu',
  // 1.1+
  'Jinhsi',
  'Changli',
  // 1.2+
  'Zhezhi',
  'Xiangli Yao',
  // 1.3+
  'Shorekeeper',
  'Youhu',
  // 1.4+
  'Camellya',
  'Lumi',
  // 2.0+
  'Carlotta',
  'Roccia',
  'Zani',
  // 2.1+
  'Phoebe',
  'Brant',
  // 2.2+
  'Cantarella',
  'Ciaccona',
  // 2.3+
  'Cartethyia',
  'Lupa',
  // 2.4+
  'Aemeath',
  'Mornye',
  'Chisa',
  // Upcoming / leaked (jobb ha benne van, minthogy hiányzik)
  'Phrolova',
];

/**
 * Wrap glossary terms so DeepL HTML mode will not translate them.
 *
 * FIX vs original: \b word-boundary fails for names ending/starting with
 * non-ASCII word chars (e.g. accented letters) and for terms containing
 * hyphens like "mount-like". We use a lookahead/lookbehind on \w instead,
 * which is safer across all the WW-specific terms.
 */
const GLOSSARY_SPAN_OPEN = '<span class="gh-glossary notranslate" translate="no">';
const GLOSSARY_SPAN_CLOSE = '</span>';

function protectGlossary(text: string): string {
  // Deduplicate and sort longest-first so multi-word phrases match before
  // their constituent words ("Resonance Skill" before "Skill").
  const sorted = [...new Set(DO_NOT_TRANSLATE)].sort((a, b) => b.length - a.length);

  let result = text;
  for (const term of sorted) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Use (?<!\w) / (?!\w) instead of \b so that:
    //  - hyphenated terms like "mount-like" work correctly
    //  - names adjacent to HTML punctuation (quotes, tags) are still caught
    const regex = new RegExp(`(?<!\\w)(${escaped})(?!\\w)`, 'gi');

    result = result.replace(
      regex,
      // Use $1 to preserve the original casing from the source text
      `${GLOSSARY_SPAN_OPEN}$1${GLOSSARY_SPAN_CLOSE}`
    );
  }
  return result;
}

/**
 * Remove glossary wrapper spans (and legacy <var> from older runs).
 */
function unprotectGlossary(text: string): string {
  let out = text.replace(/<\/?var>/g, '');
  out = out.replace(/<span[^>]*\bgh-glossary\b[^>]*>([\s\S]*?)<\/span>/gi, '$1');
  return out;
}

// ─── HTML cleanup — remove dark inline colors ────────────────
/**
 * Remove inline color styles that are unreadable on dark backgrounds.
 * Keeps colors that are light enough (e.g. gold, red accents).
 */
function cleanDarkColors(html: string): string {
  return html.replace(
    /style="([^"]*)"/g,
    (match, styleContent: string) => {
      // Check if it contains a color property
      const colorMatch = styleContent.match(/color:\s*rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (colorMatch) {
        const [, r, g, b] = colorMatch.map(Number);
        // If the color is too dark (luminance < 100), remove the color property
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        if (luminance < 100) {
          // Remove just the color property, keep other styles
          const cleaned = styleContent
            .replace(/color:\s*rgb\([^)]+\);?\s*/g, '')
            .trim();
          if (!cleaned) return ''; // Remove entire style attr if empty
          return `style="${cleaned}"`;
        }
      }
      return match;
    }
  );
}

// ─── Utility ─────────────────────────────────────────────────
function md5(text: string): string {
  return crypto.createHash('md5').update(text).digest('hex');
}

function loadJson<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch { /* ignore */ }
  return fallback;
}

function saveJson(filePath: string, data: unknown): void {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&hellip;/g, '...')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── Rich text → HTML (same logic as characters.service.ts) ──
function richTextToHtml(raw: string | undefined): string {
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
    case 'document': return children;
    case 'paragraph': return `<p>${children}</p>`;
    case 'heading-6': return `<h3>${children}</h3>`;
    case 'heading-5': return `<h3>${children}</h3>`;
    case 'heading-4': return `<h2>${children}</h2>`;
    case 'unordered-list': return `<ul>${children}</ul>`;
    case 'ordered-list': return `<ol>${children}</ol>`;
    case 'list-item': return `<li>${children}</li>`;
    default: return children;
  }
}

// ═══════════════════════════════════════════════════════════════
// NEWS TRANSLATION
// ═══════════════════════════════════════════════════════════════

interface WpPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  link: string;
}

async function translateNews(
  config: GameConfig,
  apiKey: string,
  hashes: Record<string, string>,
  force: boolean
): Promise<void> {
  if (!config.newsApiUrl) {
    console.log('  News: no API configured, skipping');
    return;
  }

  console.log('\n  ── NEWS ──');
  if (force) console.log('  (news-force: ignoring hash cache)');
  console.log('  Fetching news...');

  const res = await fetch(`${config.newsApiUrl}?per_page=20`);
  if (!res.ok) {
    console.warn(`  Warning: News API returned ${res.status}`);
    return;
  }
  const posts: WpPost[] = await res.json();
  console.log(`  Found ${posts.length} articles`);

  const cachePath = path.join(NEWS_TRANSLATIONS_DIR, `${config.slug}.json`);
  const cache: Record<string, { title: string; excerpt: string; content: string }> =
    loadJson(cachePath, {});

  let translated = 0;
  let skipped = 0;

  for (const post of posts) {
    const title = stripHtml(post.title.rendered);
    const excerpt = stripHtml(post.excerpt.rendered);
    const content = post.content.rendered;

    const contentHash = md5(title + content);
    const cacheKey = `news:${config.slug}:${post.slug}`;

    if (!force && hashes[cacheKey] === contentHash && cache[post.slug]) {
      skipped++;
      continue;
    }

    console.log(`  Translating: "${title.substring(0, 55)}..."`);

    try {
      // Protect glossary terms, translate, then unprotect
      const [huTitleRaw, huExcerptRaw] = await deeplTranslateBatch(
        [protectGlossary(title), protectGlossary(excerpt)],
        apiKey,
        'html'
      );
      const huContentRaw = await deeplTranslate(protectGlossary(content), apiKey, 'html');

      // Unprotect glossary + clean dark inline colors
      const huTitle = unprotectGlossary(huTitleRaw);
      const huExcerpt = unprotectGlossary(huExcerptRaw);
      const huContent = cleanDarkColors(unprotectGlossary(huContentRaw));

      cache[post.slug] = { title: huTitle, excerpt: huExcerpt, content: huContent };
      hashes[cacheKey] = contentHash;
      translated++;
      await sleep(600);
    } catch (err) {
      console.error(`  Error: ${post.slug}:`, err);
    }
  }

  saveJson(cachePath, cache);
  console.log(`  News: ${translated} translated, ${skipped} cached.`);
}

// ═══════════════════════════════════════════════════════════════
// CHARACTER TRANSLATION
// ═══════════════════════════════════════════════════════════════

/**
 * Translation shape for a single character.
 * Each field is the translated HTML string.
 */
type CharTranslation = {
  introduction?: string;
  review?: string;
  pros?: string;
  cons?: string;
  rotations?: string;
  endgameStats?: string;
  skills?: Record<string, string>;     // skill name → translated HTML
  dupes?: Record<string, string>;      // dupe1..6 → translated HTML
};

// Fields on a Prydwen character detail that contain rich text
const RICH_TEXT_FIELDS = ['introduction', 'review', 'pros', 'cons', 'rotations', 'endgameStats'] as const;

async function translateCharacters(config: GameConfig, apiKey: string, hashes: Record<string, string>): Promise<void> {
  if (!config.charListUrl || !config.charDetailUrl) {
    console.log('  Characters: no API configured, skipping');
    return;
  }

  console.log('\n  ── CHARACTERS ──');
  console.log('  Fetching character list...');

  const listRes = await fetch(config.charListUrl);
  if (!listRes.ok) {
    console.warn(`  Warning: Character list API returned ${listRes.status}`);
    return;
  }
  const listData = await listRes.json();
  const nodes: { slug: string; name: string; upcoming: boolean | null }[] =
    listData.data?.allContentfulWwCharacter?.nodes ?? [];

  const characters = nodes.filter((c) => !c.upcoming);
  console.log(`  Found ${characters.length} characters`);

  const cachePath = path.join(CHAR_TRANSLATIONS_DIR, `${config.slug}.json`);
  const cache: Record<string, CharTranslation> = loadJson(cachePath, {});

  let translated = 0;
  let skipped = 0;

  for (const char of characters) {
    // Fetch detail
    const detailRes = await fetch(config.charDetailUrl!(char.slug));
    if (!detailRes.ok) {
      console.warn(`  Warning: ${char.name} detail returned ${detailRes.status}`);
      continue;
    }
    const detailData = await detailRes.json();
    const detail = detailData.result?.data?.currentUnit?.nodes?.[0];
    if (!detail) {
      console.warn(`  Warning: ${char.name} — no detail data`);
      continue;
    }

    // Build a fingerprint of all translatable content
    const richTexts: string[] = [];
    for (const field of RICH_TEXT_FIELDS) {
      richTexts.push(detail[field]?.raw ?? '');
    }
    // Skills
    const skills: { name: string; raw: string }[] = (detail.skills ?? []).map(
      (s: { name: string; description: { raw: string } }) => ({
        name: s.name,
        raw: s.description?.raw ?? '',
      })
    );
    for (const s of skills) richTexts.push(s.raw);
    // Dupes
    const dupeKeys = Object.keys(detail.dupes ?? {}).filter((k) => k.startsWith('dupe')).sort();
    for (const dk of dupeKeys) richTexts.push(detail.dupes[dk]?.raw ?? '');

    const contentHash = md5(richTexts.join('|'));
    const cacheKey = `char:${config.slug}:${char.slug}`;

    if (hashes[cacheKey] === contentHash && cache[char.slug]) {
      skipped++;
      continue;
    }

    console.log(`  Translating: ${char.name}...`);

    try {
      const tr: CharTranslation = {};

      // ─ Translate rich text fields in batches ─
      // Convert all to HTML first, protect glossary terms
      const fieldHtmls = RICH_TEXT_FIELDS.map((f) => protectGlossary(richTextToHtml(detail[f]?.raw)));

      // Batch translate all 6 fields at once
      const translatedFields = await deeplTranslateBatch(fieldHtmls, apiKey, 'html');
      await sleep(500);

      for (let i = 0; i < RICH_TEXT_FIELDS.length; i++) {
        if (fieldHtmls[i].trim()) {
          tr[RICH_TEXT_FIELDS[i]] = unprotectGlossary(translatedFields[i]);
        }
      }

      // ─ Translate skills ─
      if (skills.length > 0) {
        const skillHtmls = skills.map((s) => protectGlossary(richTextToHtml(s.raw)));
        // Translate in batches of 10 to stay within limits
        tr.skills = {};
        for (let i = 0; i < skillHtmls.length; i += 10) {
          const batch = skillHtmls.slice(i, i + 10);
          const batchNames = skills.slice(i, i + 10);
          const translatedBatch = await deeplTranslateBatch(batch, apiKey, 'html');
          for (let j = 0; j < batchNames.length; j++) {
            if (batch[j].trim()) {
              tr.skills[batchNames[j].name] = unprotectGlossary(translatedBatch[j]);
            }
          }
          await sleep(500);
        }
      }

      // ─ Translate dupes ─
      if (dupeKeys.length > 0) {
        const dupeHtmls = dupeKeys.map((dk) => protectGlossary(richTextToHtml(detail.dupes[dk]?.raw)));
        const translatedDupes = await deeplTranslateBatch(dupeHtmls, apiKey, 'html');
        tr.dupes = {};
        for (let i = 0; i < dupeKeys.length; i++) {
          if (dupeHtmls[i].trim()) {
            tr.dupes[dupeKeys[i]] = unprotectGlossary(translatedDupes[i]);
          }
        }
        await sleep(500);
      }

      cache[char.slug] = tr;
      hashes[cacheKey] = contentHash;
      translated++;
    } catch (err) {
      console.error(`  Error: ${char.name}:`, err);
    }
  }

  saveJson(cachePath, cache);
  console.log(`  Characters: ${translated} translated, ${skipped} cached.`);
}

// ═══════════════════════════════════════════════════════════════
// ENTRY POINT
// ═══════════════════════════════════════════════════════════════

async function main(): Promise<void> {
  console.log('=== Translation script ===\n');

  const rawArgs = process.argv.slice(2);
  const newsForce = rawArgs.includes('news-force');
  const positional = rawArgs.filter((a) => a !== 'news-force');
  const targetSlug = positional[0];
  const targetType = positional[1]; // 'news' | 'chars' | undefined (both)

  const configs = targetSlug
    ? GAME_CONFIGS.filter((c) => c.slug === targetSlug)
    : GAME_CONFIGS;

  if (targetSlug && configs.length === 0) {
    console.error(`Unknown game slug: ${targetSlug}`);
    console.log(`Available: ${GAME_CONFIGS.map((c) => c.slug).join(', ')}`);
    process.exit(1);
  }

  const applyNewsForce = newsForce && targetType === 'news';

  const hashes: Record<string, string> = loadJson(HASHES_PATH, {});

  for (const config of configs) {
    const apiKey = process.env[config.envKey];
    if (!apiKey) {
      console.log(`Skipping ${config.name} — ${config.envKey} not set`);
      continue;
    }

    console.log(`\n╔══ ${config.name.toUpperCase()} ══╗`);
    console.log(`  DeepL key: ***set***`);

    if (!targetType || targetType === 'news') {
      await translateNews(config, apiKey, hashes, applyNewsForce);
    }
    if (!targetType || targetType === 'chars') {
      await translateCharacters(config, apiKey, hashes);
    }

    saveJson(HASHES_PATH, hashes);
  }

  console.log('\n✓ Done!');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});