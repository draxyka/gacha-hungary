# Gacha Hungary

A Hungarian-language resource hub for gacha game collectors. Automatically aggregates characters, game data, and news, translated into Hungarian using the DeepL API.

## Motivation

A large part of the Hungarian gacha community plays without understanding English which means they often miss out on new content, character releases, or build guides that are only available in those languages. Gacha Hungary was built to bridge that gap: by automatically pulling and translating the latest game content, Hungarian-speaking players can follow what is happening without needing to rely on anyone else.

The build and character data comes from APIs discovered through browser network inspection, as no official public APIs exist for most of these games. It is not a perfect solution, but it is currently the only practical one.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Framework with SSR and static generation |
| DeepL API | Automated Hungarian translation |
| External Game APIs | Character and game data aggregation |
| Web Scraping | Automated news collection |

## Key Features

### Automatic Character & Data Aggregation
After selecting a game, the app fetches all relevant characters and metadata from the corresponding API automatically, no manual data entry required.

### AI-Powered News Translation
News articles are scraped automatically and translated into Hungarian via the DeepL API. The system checks diffs before re-translating, so only new or changed content triggers an API call, keeping costs low and content up to date.

### Diff-Based Update Logic
Before processing any content, the app compares it against the previously stored version. Only actual changes are forwarded to the translation pipeline, avoiding redundant API usage.

## Why Next.js?

Next.js was chosen for its flexibility between server-side rendering and static generation, which is well-suited for content that updates frequently (news) alongside content that stays relatively stable (character data). It also improves SEO and initial load performance significantly compared to a pure client-side React setup.

## Why DeepL over other translation APIs?

DeepL consistently produces more natural Hungarian output compared to alternatives, particularly for gaming-specific vocabulary and sentence structure. For a community-facing product, translation quality directly affects trust and usability.

## Getting Started

```bash
git clone https://github.com/laszbader/gacha-hungary
cd gacha-hungary
npm install (node: v22.16.0)
npm run dev
```

### Environment Variables

```env
DEEPL_API_KEY=your_deepl_api_key
GAME_API_KEY=your_game_api_key
```
