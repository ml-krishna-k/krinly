# Krinly

Portfolio and enquiry site for Krinly — a founder-led digital studio.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npx next start -p 3100
```

## Regenerating project screenshots

Every project image on the site is a real screenshot of the real live site —
no stock imagery, no device mockups. To re-capture after a project changes:

```bash
node scripts/capture.mjs      # writes public/work/<slug>/{desktop,mobile}.webp
```

## Checking your work

```bash
node scripts/inspect.mjs      # visual frames at scroll positions -> .inspect/
node scripts/qa.mjs           # overflow at 10 widths + accessibility checks
```

Both need a server running on port 3100.

## Where things live

```
src/data/business.ts       contact details, location, provenance-tagged facts
src/data/projects.ts       portfolio + attribution categories + case study copy
src/data/capabilities.ts   capability model and process
src/components/            Nav, Footer, WorkIndex, EnquiryForm, Reveal
src/app/page.tsx           homepage
src/app/work/[slug]/       case studies (statically generated)
src/app/globals.css        design system: type scale, colour, motion tokens
```

Business facts are never hardcoded into components. Change `business.ts` and it
changes everywhere.

## Before this goes live

Three things must change together, or the site will be live and unindexable:

1. `SITE_URL` in `src/app/layout.tsx`, `sitemap.ts` and `robots.ts`
2. `robots: { index: false }` in `layout.tsx` → remove
3. `disallow: "/"` in `robots.ts` → `allow: "/"`

Also set `FORM_ENDPOINT` in `src/components/EnquiryForm.tsx`. Until it is set,
the enquiry form composes the submission into a WhatsApp message rather than
posting anywhere — it does not silently discard leads, and it does not pretend
to submit.

## Attribution

`src/data/projects.ts` assigns every project a category — `commercial`,
`product`, or `concept` — and a plain-language `roleNote`. These are
load-bearing. A visitor who clicks through to a live site and finds a "concept
redesign" line in its footer, while this site called it client work, has caught
the studio overclaiming — and everything else here becomes suspect. Do not
soften these labels to make the portfolio look larger.

No metrics appear anywhere in the data layer. No conversion lifts, no user
counts, no ratings, no client counts.
