# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Gacha Hungary is a Hungarian-language gacha hub built with Next.js 16 (App Router), React 19 and Tailwind v4. The home page is a game selector. Selecting a live game opens its DeepL-translated news list. The only other internal page is Social Media, which is planned to move to a custom CMS. All other header menu items are external links. Only Wuthering Waves is live. Other games appear on the home page as disabled "Hamarosan" (coming soon) tiles. UI text and route segments are in Hungarian (`hirek` = news). Node v22.16.0.

## Commands

```bash
npm run dev        # dev server
npm run build      # production build (also the de facto type check)
npm run translate  # DeepL news translation script (spends DeepL quota, see below)
npx tsc --noEmit   # type check without building
```

- Linting is currently broken. `npm run lint` calls `next lint`, which Next 16 removed. `npx eslint` crashes because `eslint.config.mjs` uses `FlatCompat`, which is not compatible with `eslint-config-next` 16.
- There is no test suite.
- Prettier settings: single quotes, trailing commas, `printWidth` 120, and `prettier-plugin-organize-attributes`.

## Architecture

### Routing
- `/`: game selector (`features/home`). Tiles for slugs in `LIVE_GAMES` are links. The rest are disabled "Hamarosan" tiles. Each tile shows its `image` as a static background, or plain black if the file doesn't exist.
- `/[slug]`: the news list (`features/news/News.tsx`). This is the game's main page.
- `/[slug]/hirek/[id]`: the translated article. Plain `/[slug]/hirek` redirects to `/[slug]`.
- `/[slug]/social-media`: Social Media page.
- `[slug]/layout.tsx` only accepts slugs in `LIVE_GAMES` (`generateStaticParams`, `dynamicParams = false`, `notFound()`). It wraps pages in `GameProvider`, and client components read the current game with `useGame()`.

### Per-game configuration
- `src/constants/games.ts` holds `LIVE_GAMES` and per-slug maps: name, Tailwind color classes, glow color, header nav links.
- In `GAME_NAV_LINKS`, `href: ''` means the game root (news). Use `external: true` for outside links.
- `src/features/home/home.data.ts`: home page tiles.
- Home tile backgrounds are self-hosted WebP images in `public/assets/images/home/` (`wuwa.webp`, `genshin.webp`, `hsr.webp`, `zzz.webp`). No videos, and never the game CDN URLs: those CDNs (Kuro especially) can stall for 20–30 s.
- `next.config.ts` `images.remotePatterns`: add any new external image host here.

### Data flow: live fetch plus a committed translation cache
- `features/news/news.service.ts` picks a provider by slug. Currently only `wuwa.news.service.ts` exists.
- That provider fetches **untranslated English** articles from the Kuro CDN (`MainMenu.json`, `article/{id}.json`), using ISR with a 1h revalidate.
- It overlays Hungarian `{title, excerpt, content}` from `features/news/translations/wuthering-waves.json`, keyed by `articleId`. This JSON is **committed to the repo**.
- If an article has no entry, `NewsItem.translated` is `false` and the page shows the English content with a notice.
- Kuro requests have an 8 s timeout (`kuroFetch`). On failure the services **throw** rather than return empty data. During an ISR background refresh, Next.js then keeps serving the last good page. On a first load with no cache, `[slug]/error.tsx` shows a retry screen.
- News images go through the Next.js image optimizer (no `unoptimized`), so Kuro images are fetched once and cached for 30 days (`minimumCacheTTL`).
- Article HTML is rendered with `dangerouslySetInnerHTML`.

### Translation script (`scripts/translate-news.ts`)
The script is excluded from `tsconfig` and runs with `tsx`. It fetches the latest 4 Kuro articles, sends new or changed ones to DeepL (EN→HU, `tag_handling: html`), and writes the translation JSON above.

- **Change detection:** it stores an MD5 hash per article in `scripts/.translation-hashes.json`. That file is gitignored and local only.
- **Glossary:** the `DO_NOT_TRANSLATE` list holds game terms, character names and similar. Before sending text to DeepL, the script wraps these terms in `translate="no"` spans; text inside `[...]` and `(...)` is wrapped the same way. It strips the spans again afterwards. To keep a new term in English, add it to this list.
- **HTML clean-up:** `cleanKuroHtml` normalizes Kuro markup, and `cleanDarkColors` removes inline text colors that are unreadable on the dark theme.
- **Options:** `npm run translate -- <slug> [news news-force]`. `news-force` re-translates articles even when their hash is unchanged.
- **Duplicated code:** the script has its own copy of the game config and the Kuro endpoint URLs. If you change them in `src/`, update the script too.
- **Environment:** the DeepL key is per game (`DEEPL_KEY_WUTHERING_WAVES` in `.env`). `DEEPL_API_URL` is optional and defaults to the free API. The README's `DEEPL_API_KEY`/`GAME_API_KEY` names are out of date.

**DeepL quota is limited.** Fix small translation mistakes by editing the translation JSON by hand under the right `articleId`. Run `npm run translate` only for genuinely new articles, or after a large glossary change.
