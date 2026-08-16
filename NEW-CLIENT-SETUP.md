# New Client Setup Checklist

This project started as the Zenizz barbershop site and was built so it can be forked as the
starting point for other barbershop clients. This is a **single-tenant-per-deployment**
template: one fork = one client, one Vercel project, one domain. There is no multi-tenant
runtime or admin CMS — everything below is edited in code once per fork.

Work through the sections in order. Section 12 is a final sanity check to run before handing
the site to a new client.

## 0. Before you start

- Fork or copy this repo, rename it, connect a new git remote.
- Create a new Vercel project (or equivalent host) pointing at the new repo.
- Set up a new domain and update DNS once ready.

## 1. Core config — `src/data/site.ts`

Everything in `siteConfig` and the sibling `images` export drives the whole site. Edit every
field:

- `name`, `url`, `email`, `phone`, `phoneHref`
- `address.*`
- `social.instagram` / `social.facebook`
- `openingHours` — array of `{ day, hours }`. `hours` must be a string in the exact format
  `"HH:MM–HH:MM"` using an **en dash** (`–`, not a regular hyphen `-`), or `null` for a closed
  day. `src/lib/booking.ts` splits on that exact character to build booking time slots — a
  plain hyphen will silently break the booking flow's time picker.
- `googleMapsCid` — the numeric Google Maps Place CID for the new client's business listing.
  Get it from the business's Google Maps share/embed link.
- `images.logo` / `hero` / `about` / `aboutSecondary` / `services` / `cta` — paths into
  `/public`. Upload the new client's own photography and logo, then update these paths. Do
  **not** reuse Zenizz's photos.
- `navigation` (in the same file) only needs changing if the new client's page structure
  differs from About/Services/Team/Gallery/Contact.

## 2. Booking integration — `src/lib/booking.ts`

- `CHAIR_COUNT` — number of barber chairs, used to cap how many bookings can land in the same
  time slot. Set to the new client's actual chair count.
- `BOOKING_MOUNT_ID` — only needs changing if it collides with something else on the page;
  otherwise leave the default.
- If using AxaBook (or swapping in another booking provider) via `BookingWidget`'s
  `provider="axabook"` path, confirm the new client's widget script URL and widget id.
- The Postgres-backed booking-capacity API (`src/app/api/bookings/route.ts`,
  `src/lib/db.ts`) is generic and does not need changes — see §11 for its environment
  variable.

## 3. Services — `src/data/services.ts` + `messages/*.json`

- Each entry: `id`, `price` (a hand-formatted string, e.g. `"€27.50"` — the currency symbol is
  baked into the string, so a non-Euro client edits every price string directly), and
  `durationMinutes`.
- The display name and description for each service id live in `messages/en.json` and
  `messages/tr.json` under `services.<id>.name` / `services.<id>.description`. Every id in
  `services.ts` needs a matching entry in **both** locale files.

## 4. Team — `src/data/team.ts` + `messages/*.json`

- Replace the existing team entry (or entries) entirely: `id`, `name`, `image` (photo path in
  `/public`).
- Add matching `team.<id>.role` / `team.<id>.bio` / `team.<id>.specialties` in both locale
  files — this is real biography content, not boilerplate.

## 5. Reviews — `src/data/reviews.ts` + `messages/*.json`

- Replace every entry with the new client's **real** reviews (id, name, rating in
  `reviews.ts`; review text + relative date in `messages.reviewItems.<id>`). Do not carry over
  Zenizz's reviews or invent placeholder ones.
- `reviews.googleReviewsCount` (in `messages/*.json`) is a hand-set string like
  `"147 Google reviews"` — it is not derived automatically from anything, so update it to the
  new client's real review count.

## 6. Gallery — `src/data/gallery.ts`

- Starts as an empty array. Populate once the new client supplies their own photography.
- Do not reuse any of Zenizz's `/public/gallery-*.jpg` files — they're specific to the Zenizz
  shop and should not appear on another client's site.

## 7. Narrative copy — `messages/en.json` & `messages/tr.json`

A large share of these two files is bespoke prose that has to be rewritten by a person, not
mechanically swapped — a new client has a different city, founder story, and voice. Keys that
need a full rewrite (not just a find/replace):

- `pages.about.*` — the entire founder/atelier story
- `pages.*.metaDescription` — every page's SEO description
- `faq.items` — the questions are probably reusable, but the answers reference specific
  service names and policy numbers; check they still match `services.ts`
- `servicesPreview.eyebrow`, `contactPreview.mapTitle`, `pages.contact.studioName`

Separately, search both files (and `src/app/[locale]/layout.tsx`) case-insensitively for the
literal string `"Zenizz"` — every hit needs a deliberate decision on replacement copy, since
the surrounding sentence usually needs rewriting too, not just the brand name.

If the new client doesn't need a Turkish version, decide whether to keep `tr.json` as a real
translated site or strip next-intl down to a single locale — that's a structural decision
bigger than a content edit, flag it before starting.

## 8. Branding assets — `/public` and `src/app/globals.css`

- Replace `zenizz-logo.png`, the favicon, and every image referenced from `images` in
  `site.ts` (see §1).
- `globals.css` `:root` holds the color palette (`--ink`, `--paper`, `--faded`, `--accent`,
  etc.). Note there is currently **no distinct brand-color token** — `--accent` is just black,
  same as `--ink`. Introducing a real accent color for a client is a design decision to make
  deliberately, not a mechanical swap.
- Fonts are self-hosted, not via `next/font`. Changing fonts means editing **two** places
  together:
  1. The `@font-face` rules in `globals.css` (and swapping the actual `.woff2` files in
     `public/fonts/`, keeping latin + latin-ext pairs if Turkish support is still needed)
  2. The `fontVariablesStyle` object in `src/app/[locale]/layout.tsx`, which maps
     `--font-display` / `--font-sans` / `--font-mono` to the actual font-family names

## 9. Metadata / SEO — `src/app/[locale]/layout.tsx`

- `generateMetadata`'s title/description/keywords already pull from `siteConfig.name` — no
  manual edits needed here as long as §1 is done correctly.
- The JSON-LD block uses `"@type": "HairSalon"` — correct for any barbershop client; only
  change if the new client is a different type of business.

## 10. Environment / infra

- `DATABASE_URL` — Postgres/Neon connection string for the booking-capacity API
  (`src/app/api/bookings/route.ts`, `src/lib/db.ts`). Set in `.env.local` for local dev and in
  the hosting provider's environment variables for production. Never commit this value.
- Any credentials needed for AxaBook or another external booking provider, if used.

## 11. Deploy

- Set environment variables on the host (see §10).
- Point the domain from §0 at the deployment.
- Do a full click-through on both locales before going live: nav, all pages, booking flow
  (service → day → time → contact form), footer links, Google Maps embed.

## 12. Final check

Before handing off, run these searches from the repo root and confirm they return **no
results** outside this file and git history:

```
grep -ril "zenizz" src public messages 2>/dev/null
grep -ril "istanbulbarbershoop" src 2>/dev/null
```

If either turns up a hit, it's a leftover from this template that needs replacing.
