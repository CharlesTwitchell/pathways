import type { Stop } from '../types';

// Always route by coordinates rather than the human-readable address: it's the
// same source of truth already used for the map marker and the GPS unlock
// radius, so directions land exactly where the app thinks the stop is.
export function googleMapsDirectionsUrl(stop: Stop): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${stop.lat},${stop.lng}`;
}

export function appleMapsDirectionsUrl(stop: Stop): string {
  return `https://maps.apple.com/?daddr=${stop.lat},${stop.lng}`;
}
