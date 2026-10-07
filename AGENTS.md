# کافه و دانه — working notes

Persian (RTL) marketing site for a speciality coffee house. React + Vite + Tailwind,
single-page app, no backend. All user-facing copy is Persian.

## Running it here

```bash
docker compose -f docker-compose.base44.yml up -d --build   # http://localhost:3000
docker compose -f docker-compose.base44.yml logs -f web
```

- One service (`web`) on a plain `node:22-bookworm-slim` image, repo bind-mounted at `/app`,
  started with `npm install && exec npm run dev`. Vite serves the cloned source with HMR.
- `node_modules` lives in the named volume `web_node_modules`. **After changing
  `package.json`, restart the service** so the startup `npm install` picks the change up.
- Vite must accept the proxied preview hostname: `server.allowedHosts: true` in
  `vite.config.js` plus `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` passed through by compose.
  Do not remove either.

## Things that are easy to get wrong

- **Editing `tailwind.config.js` requires a dev-server restart.** PostCSS keeps the Tailwind
  config cached for the life of the process, so new colour/font tokens make `@apply` fail with
  "class does not exist" until `docker compose -f docker-compose.base44.yml restart web`.
  Editing `src/index.css` alone is not enough.
- **Unsplash ids in `src/data/*` include the `photo-` prefix.** `src/lib/images.js` builds the
  URL, so it must not add a second prefix (`photo-photo-…` 404s silently and every image box
  renders empty). Check a new id with
  `curl -s -o /dev/null -w '%{http_code}' "https://images.unsplash.com/photo-xxx?w=80"`.
- **Never print bare Latin numbers in the UI.** Use `toPersianDigits` / `formatToman` /
  `priceLabel` from `src/lib/utils.js` — prices must read like `۱۸۵٬۰۰۰ تومان` (Persian digits,
  U+066C thousands separator).
- **RTL correctness:** use logical utilities (`ms-`/`me-`, `ps-`/`pe-`, `start-`/`end-`,
  `text-start`) and `gap-*` for spacing. Avoid `space-x-*`, which needs `space-x-reverse` in RTL.
  Arrows are named by meaning: `ArrowForward` / `ChevronForward` point **left**.
- `overflow-x: hidden` is set on `body`; a new oversized decorative element will be clipped
  rather than causing horizontal scroll.
- Tailwind opacity modifiers: stick to multiples of 5 (`/15` silently produces nothing — use
  `/10`, `/20` or an arbitrary value like `/[0.15]`).

## Scroll-driven hero video

The homepage hero is a pinned, scroll-scrubbed clip (`src/sections/Hero.jsx` +
`src/lib/useScrollVideoScrub.js`). The video is **never played** — it stays paused and the
scroll position moves `currentTime`, so there is no `play()`, no `loop`, no autoplay.

- The clip lives at `public/hero-scroll.mp4` and is served locally so Vite/sirv answers
  byte-range requests (seeking needs ranges). Confirm with
  `curl -s -D - -o /dev/null -H 'Range: bytes=0-1023' http://localhost:3000/hero-scroll.mp4`
  → expect `206` + `Content-Range`.
- **Seeking quality is an encode property, not a JS one.** Prefer MP4/H.264 with frequent
  keyframes (`-g 12 -keyint_min 12 -sc_threshold 0`), modest bitrate, ~720–1080p, and
  `-movflags +faststart`. A long-GOP 4K master stutters no matter how careful the loop is.
- `HERO_SCROLL_VH` in `Hero.jsx` (300) is the only pacing knob: the section is that tall, the
  inner viewport is `sticky top-0 h-[100svh]`, and progress `0→1` maps to `0→duration`.
- The tall scroll track is applied **only** once the clip is ready (`videoState === 'ready'`),
  so a failed load or `prefers-reduced-motion` collapses to the original static hero instead of
  leaving 300vh of dead scroll. The previous hero photograph is the poster and the fallback.
- Do not add `overflow-hidden` to the hero `<section>` — it would break the `position: sticky`
  child. The clip is on the sticky inner div.

## Where things are

| Concern | File |
| --- | --- |
| Brand, nav, contact details, menu taxonomy, customisation options | `src/data/site.js` |
| Section copy + per-route SEO metadata | `src/data/content.js` |
| Products (CMS shape: id, name, category, description, price, image, featured, available, sortOrder) | `src/data/products.js` |
| Gallery items (id, image, title, category, span, sortOrder) | `src/data/gallery.js` |
| Testimonials (id, name, city, text, rating, image, active) | `src/data/testimonials.js` |
| Colour / font / spacing tokens | `tailwind.config.js` + `src/index.css` |
| Menu tabs, cards, shared filter explorer, product modal | `src/components/menu/` |
| Gallery grid + lightbox | `src/components/gallery/` |
| Testimonial slider | `src/components/testimonials/` |
| Contact form + map placeholder | `src/components/contact/` |
| Homepage sections | `src/sections/` |
| Routes | `src/App.jsx` |

## Persistence

No server or database. Orders placed in the product modal and contact messages are written to
`localStorage` (`kafevdaneh:orders`, `kafevdaneh:messages`) by `src/lib/storage.js`. That file is
the single seam to swap for API calls — the components around it already treat it as async-safe.

## Verifying changes

```bash
# every route is served by the SPA fallback
for p in / /menu /about /story /gallery /contact; do
  curl -s -o /dev/null -w "$p %{http_code}\n" "http://localhost:3000$p"
done

# full compile check (catches wrong import paths, which dev-server curls do not)
docker compose -f docker-compose.base44.yml exec -T web \
  sh -c 'npx vite build --outDir /tmp/build-check --logLevel warn'
```

In the browser preview, confirm `dir="rtl"`, that no `vite-error-overlay` is present, and that
every `<img>` has `naturalWidth > 0` (broken Unsplash ids fail silently).
