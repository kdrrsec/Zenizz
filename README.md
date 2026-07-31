# ZENIZZ

Premium, moderne barbershop-website — gebouwd als herbruikbare basis voor AxaWeb.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lenis (smooth scroll)

## Starten

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pagina's

- `/` — Home (hero, about, services, team, gallery, reviews, booking CTA, contact)
- `/about`
- `/services`
- `/team`
- `/gallery`
- `/contact`

## Boeking (AxaBook-ready)

Gebruik `BookingWidget` in `src/components/booking/BookingWidget.tsx`.

```tsx
<BookingWidget
  provider="axabook"
  scriptSrc="https://example.com/axabook.js"
  widgetId="YOUR_WIDGET_ID"
/>
```

Of via iframe:

```tsx
<BookingWidget provider="custom" embedUrl="https://booking.example.com/embed" />
```

Zonder configuratie toont de widget een duidelijke placeholder met CTA’s.

## Structuur

```
src/
  app/                 # routes + SEO metadata
  components/
    booking/           # externe booking integratie
    layout/            # navbar, footer, scroll, transitions
    sections/          # homepage secties
    ui/                # herbruikbare UI primitives
  data/                # content (eenvoudig te whitelabelen)
  lib/                 # motion + utils
  types/
```

## Notities

- Alle teksten, styling en componenten zijn origineel.
- Beelden via Unsplash (remote images). Vervang door eigen fotografie voor productie.
- Geen shop, cart of productflows — bewust buiten scope.
