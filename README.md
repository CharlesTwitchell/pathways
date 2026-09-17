# Pathways

Pathways turns a set of locations that share a theme into a guided walking
journey. Pick a journey, follow the map from stop to stop, and unlock each
location's story either by physically arriving there or by checking in
manually.

## Features

- **Themed journeys** — each journey is an ordered list of stops with a
  shared theme (e.g. a historic walking trail, a park highlights loop).
- **Map + walking directions** — Leaflet map with OpenStreetMap tiles,
  numbered stop markers, and a walking route (via the public OSRM routing
  API) connecting every stop in order.
- **Location-based unlocking** — GPS watches your position and unlocks a
  stop's full story automatically once you're within range. A manual
  "check in" button is always available as a fallback (denied permission,
  indoor location, or just testing).
- **Rich per-stop content** — every stop has a short teaser (visible up
  front, to help you plan) and a longer story unlocked on arrival.
- **Progress that persists** — visited stops are saved to `localStorage`
  per journey, so progress survives a reload or returning later.
- **Installable PWA** — add it to your home screen on iOS/Android for an
  app-like experience, offline app-shell caching included.

## Tech stack

- React + TypeScript, built with Vite
- React Router for navigation
- Leaflet / react-leaflet for maps (no API key required)
- OSRM public API for walking directions (falls back to a straight line
  between stops if the routing request fails)
- `vite-plugin-pwa` for the installable app manifest + service worker

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build
npm run preview   # preview the production build locally
```

## Adding a journey

Journeys are plain data in [`src/data/journeys.ts`](src/data/journeys.ts).
Add a new entry to the `journeys` array:

```ts
{
  id: 'unique-slug',
  title: 'Journey Title',
  theme: 'Short theme label',
  icon: '🗺️',           // shown on the journey card
  accent: '#1f6f5c',     // cover gradient color
  description: 'One or two sentences shown on the journey card.',
  duration: '~2 hours',
  distance: '2 mi',
  stops: [
    {
      id: 'stop-slug',
      name: 'Stop Name',
      lat: 0,
      lng: 0,
      icon: '📍',
      teaser: 'Shown before the visitor arrives.',
      story: 'Unlocked once the visitor checks in at this stop.',
      radiusMeters: 75, // optional, defaults to 75m
    },
    // ...more stops, in visiting order
  ],
}
```

No backend or build step is required — the app picks up new journeys
automatically.
