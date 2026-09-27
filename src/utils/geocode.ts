export interface GeocodeResult {
  displayName: string;
  lat: number;
  lng: number;
}

// Nominatim (OpenStreetMap's free geocoding service) - same no-API-key
// philosophy as the map tiles and OSRM routing already used elsewhere.
// Their usage policy caps this at ~1 request/second, which an explicit
// search button (rather than search-as-you-type) comfortably respects.
export async function searchPlaces(query: string): Promise<GeocodeResult[]> {
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error('Search failed. Try again in a moment.');
  const data = await res.json();
  return (data as Array<{ display_name: string; lat: string; lon: string }>).map((row) => ({
    displayName: row.display_name,
    lat: Number(row.lat),
    lng: Number(row.lon),
  }));
}
