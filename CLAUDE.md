# LearnJap — Instructions for Claude

@AGENTS.md

## Project Overview

Japanese learning PWA built with Next.js 16, in French (UI + meanings).
**Live:** https://learn-jap-lyart.vercel.app
**Repo:** https://github.com/ClementLyss/LearnJap

## Stack & Versions (DO NOT upgrade without asking)

- **Next.js 16.2.1** (App Router) — uses webpack for build (NOT Turbopack) due to next-pwa
- **React 19** / TypeScript 5
- **Prisma 6** (NOT 7 — incompatible with Node 20) — `@prisma/client`
- **Auth.js v5** (next-auth@5.0.0-beta.30) + `@auth/prisma-adapter`
- **TailwindCSS 4** (postcss plugin, no tailwind.config)
- **PostgreSQL** — Docker locally, **Neon** in production (serverless)
- **next-pwa 5** — requires `next build --webpack`
- **wanakana 5** — romaji ↔ hiragana conversion
- **Node 20** via fnm

## Architecture

```
src/
├── app/
│   ├── (auth)/login/        # Public routes
│   ├── (app)/               # Protected routes (kanji, games, dashboard, alphabets, vocabulary)
│   │   ├── kanji/           # List + [id] detail
│   │   └── games/           # Quiz games + daily-kanji flow
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   └── kanji/[id]/(status|progress)/
│   ├── layout.tsx           # Root layout (SessionWrapper, viewport, PWA)
│   └── page.tsx             # Landing
├── components/
│   ├── kanji/               # KanjiCard, KanjiGrid, KanjiStatusButton
│   ├── games/               # DailyKanjiFlow, KanjiStudyCard, KanjiRedrawStep, KanjiWriteStep, KanjiComplete
│   ├── layout/              # Navbar, SessionWrapper
│   └── ui/                  # Shared UI (empty for now)
├── services/                # Business logic layer (kanji.service, progress.service, daily-kanji.service)
├── lib/                     # auth.ts, db.ts (Prisma singleton), sm2.ts
├── data/                    # Static JSON (hiragana.ts, katakana.ts)
└── types/                   # TypeScript interfaces (kanji, game, vocabulary)
prisma/
├── schema.prisma            # All models
├── seed.ts                  # N5 kanji (88)
├── seed-n4.ts               # N4 kanji (~171)
├── seed-n3.ts               # N3 kanji (in progress)
├── seed-n2.ts               # N2 kanji (in progress)
├── seed-radicals.ts         # Radicals + kanji-radical associations
```

## Key Patterns

- **3-layer architecture:** Pages (server components) → Services → Prisma
- **Route groups:** `(auth)` = public, `(app)` = protected (with Navbar)
- **Optimistic UI** with error rollback (KanjiGrid status changes)
- **Server components** for data fetching, **client components** for interactivity
- **`unstable_cache`** on static kanji queries (1h revalidation)
- **`Promise.all`** to parallelize independent DB queries + auth
- **SM-2 algorithm** for spaced repetition (`lib/sm2.ts`)
- **Upsert pattern** in all seed files for idempotency

## Data Model Summary

- **Kanji**: character, jlptLevel, strokeCount, meaningFr/En → has readings, examples, radicals
- **UserProgress**: status (unseen|want_to_learn|learning|known) + SM-2 fields (repetitions, easeFactor, interval, nextReview)
- **KanjiRadical**: join table Kanji ↔ Radical (with indexes on both FKs)
- **Auth models**: User, Account, Session, VerificationToken (Auth.js standard)

## Commands

```bash
npm run dev              # Dev server (Turbopack, no PWA)
npm run build            # Production build (webpack, with PWA)
npx tsx prisma/seed.ts   # Seed N5 kanji
npx tsx prisma/seed-n4.ts # Seed N4 kanji
npx tsx prisma/seed-radicals.ts # Seed radicals
npx prisma db push       # Sync schema to Neon (use this, NOT migrate dev — there's a drift issue)
npx prisma studio        # DB GUI
```

## Important Gotchas

1. **Prisma migrations are drifted** — always use `prisma db push` to sync schema, never `prisma migrate dev` (will ask to reset)
2. **Build requires `--webpack` flag** — Turbopack breaks next-pwa. Already set in package.json
3. **PowerShell on Windows** — use `powershell -Command "..."` for commands with special characters. Bash shell has fnm issues on this machine
4. **Neon connection** — remove `channel_binding=require` from DATABASE_URL if Vercel has issues
5. **Auth.js** — session callback adds `user.id` to session. Pages config redirects to `/login`
6. **unstable_cache** — deprecated in Next.js 16 but still works. New `use cache` directive exists but requires `cacheComponents: true` in config
7. **Kanji status flow:** unseen (grey, 50% opacity) → want_to_learn (blue) → learning (amber) → known (green)
8. **Long-press** (500ms) on KanjiCard toggles want_to_learn/unseen

## Code Style

- All UI text in **French**
- Use existing TailwindCSS utility patterns (see KanjiCard for status color mapping)
- Dark mode support on all components (`dark:` variants)
- Loading skeletons via `loading.tsx` files with `animate-pulse`
- Imports use `@/` path alias
