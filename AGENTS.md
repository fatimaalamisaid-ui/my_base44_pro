# Horizon Properties — working notes

Premium real-estate marketing site. Single-page React app, no backend.

## Running it here

```bash
docker compose -f docker-compose.base44.yml up -d --build   # http://localhost:3000
docker compose -f docker-compose.base44.yml logs -f web
```

- One service (`web`) on a plain `node:22-bookworm-slim` image, repo bind-mounted at `/app`,
  started with `npm install && npm run dev`. No prebuilt image, no build step — the Vite dev
  server serves the cloned source with HMR, so edits appear without restarting anything.
- `node_modules` lives in the named volume `web_node_modules`. **After changing
  `package.json`, restart the service** (`docker compose ... restart web`) so the startup
  `npm install` picks the new dependency up.
- Vite must accept the proxied preview hostname. `server.allowedHosts: true` is set in
  `vite.config.js`, and compose passes `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` through
  (Vite >= 6.1 reads it). Do not remove either.

## Things that are easy to get wrong

- **Tailwind opacity utilities**: only the default scale (/0–/100 in steps of 5) is generated.
  `/92`, `/96`, `/98` silently produce no class — use `/95` or an arbitrary value (`/[0.98]`).
- **`server.allowedHosts`** exists in Vite 6; a bare `'*'` does not match, and `true` is what
  we want here.
- Remote photography is loaded from the Unsplash CDN (`images.unsplash.com`), which the
  sandbox and browser can both reach. Every photo id in `src/data/*` was checked to return
  200; a bad id fails silently as an empty image box, so re-check with `curl -o /dev/null -w
  '%{http_code}'` when adding one.

## Where things are

| Concern | File |
| --- | --- |
| Listings (the only source of listings data) | `src/data/properties.js` |
| Advisors | `src/data/agents.js` |
| Company, nav, services, stats, testimonials | `src/data/site.js` |
| Colour/type/spacing tokens | `tailwind.config.js` + `src/index.css` |
| Reusable card / carousel / gallery / filters / inquiry modal | `src/components/property/` |
| Homepage sections | `src/sections/` |
| Routes | `src/App.jsx` |

## Persistence

There is no server or database. Saved properties and enquiry submissions are written to
`localStorage` (`horizon:favourites`, `horizon:inquiries`) in `src/lib/storage.js`. That file
is the single seam to replace with API calls — the components around it only need a Promise.

## Verifying changes

`curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/properties` should be 200 for
every route (`/`, `/properties`, `/properties/:slug`, `/about`, `/services`, `/team`,
`/contact`) — Vite's SPA fallback handles deep links.
