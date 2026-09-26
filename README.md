# Pathways

Pathways turns a set of locations that share a theme into a guided walking
journey. Pick a journey, follow the map from stop to stop, and unlock each
location's story either by physically arriving there or by checking in
manually. Sign in to create your own journeys and keep track of the ones
you've taken.

## Features

- **Themed journeys** — each journey is an ordered list of stops with a
  shared theme (e.g. a historic walking trail, a park highlights loop).
- **Map + walking directions** — Leaflet map with OpenStreetMap tiles,
  numbered stop markers, and a walking route (via the public OSRM routing
  API) connecting every stop in order.
- **Turn-by-turn directions between stops** — every stop links out to
  Google Maps and Apple Maps for real directions (walking, driving, or
  transit — your choice inside the maps app).
- **Location-based unlocking** — GPS watches your position and unlocks a
  stop's full story automatically once you're within range. A manual
  "check in" button is always available as a fallback (denied permission,
  indoor location, or just testing).
- **Rich per-stop content** — every stop has a short teaser (visible up
  front, to help you plan) and a longer story unlocked on arrival.
- **Accounts and profiles** — sign in with Google to keep your progress
  synced across devices, see every journey you've started or completed on
  your profile, and create your own journeys for other people to take.
- **Installable PWA** — add it to your home screen on iOS/Android for an
  app-like experience, offline app-shell caching included.

## Tech stack

- React + TypeScript, built with Vite
- React Router (hash-based, so it works on static hosting like GitHub Pages)
- Leaflet / react-leaflet for maps (no API key required)
- OSRM public API for walking directions (falls back to a straight line
  between stops if the routing request fails)
- Supabase (Postgres + Auth) for accounts, journeys, and progress
- `vite-plugin-pwa` for the installable app manifest + service worker

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build
npm run preview   # preview the production build locally
```

## Backend setup (Supabase)

The app's data — journeys, stops, profiles, and progress — lives in a
Supabase project. `src/lib/supabase.ts` holds the project URL and public
`anon` key (safe to commit — Supabase's security model is enforced by
Postgres row-level security policies, not by keeping this key secret).

To set up your own copy of the backend:

1. Create a project at [supabase.com](https://supabase.com).
2. Paste [`supabase/schema.sql`](supabase/schema.sql) into the SQL Editor
   and run it once — creates the `profiles`, `journeys`, `stops`, and
   `journey_progress` tables with their row-level security policies, plus
   a trigger that creates a profile row on first sign-in.
3. Paste [`supabase/seed.sql`](supabase/seed.sql) and run it — seeds the
   four built-in journeys as official (non-editable) content.
4. Under **Authentication → Providers**, enable Google and fill in the
   OAuth client ID/secret from a Google Cloud OAuth client (see Google's
   docs for creating one; the callback URL Supabase shows you is what
   goes in Google Cloud's "Authorized redirect URIs").
5. Under **Authentication → URL Configuration**, set the Site URL and add
   the app's deployed URL (and `http://localhost:5173/` for local dev) to
   the allowed redirect URLs.
6. Update the URL and `anon` key in `src/lib/supabase.ts`.

## Adding a journey

Once signed in, use the **+ Create a journey** button in the app — no code
required. Journeys created this way belong to your account; you can edit
or delete them from your profile.

The four built-in journeys are seeded via [`supabase/seed.sql`](supabase/seed.sql)
as official content with no owner, so they aren't editable through the UI.
