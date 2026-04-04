# Agent Instructions

## Next.js 16 Warning

This version has breaking changes from your training data. Before writing Next.js code:
- `params` and `searchParams` are **Promises** — always `await params` / `await searchParams`
- `unstable_cache` from `next/cache` still works but is deprecated
- Default bundler is **Turbopack**, but this project uses **webpack** (for next-pwa compatibility)
- Check `node_modules/next/dist/docs/` if unsure about an API

## Seed File Format

When creating kanji seed files (`prisma/seed-nX.ts`), follow this exact pattern:

```typescript
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Interfaces: KanjiSeedReading, KanjiSeedExample, KanjiSeedData
// Data array: const kanjiData: KanjiSeedData[] = [...]
// Main function: upsert loop with character as unique key
// End: main().catch(console.error).finally(() => prisma.$disconnect());
```

Rules for seed data:
- `jlptLevel` must match the file's JLPT level
- `meaningFr` in French, `meaningEn` in English
- Readings: ON in katakana, KUN in hiragana, with accurate romaji
- At least 1 example word per kanji with French meaning
- No duplicates within or across JLPT levels
- Use upsert (idempotent)

## Service Layer

All DB access goes through `src/services/*.service.ts`. Never call Prisma directly from pages or API routes.

## Component Conventions

- Server components for pages (data fetching)
- Client components (`"use client"`) for interactive UI
- Props interface defined above component
- Status colors use the `statusStyles` / `statusDot` pattern from KanjiCard
- Dark mode required on all components
