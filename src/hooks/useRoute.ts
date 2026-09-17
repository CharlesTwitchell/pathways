import { useEffect, useState } from 'react';
import type { Stop } from '../types';

export interface RouteState {
  positions: [number, number][];
  loading: boolean;
  isFallback: boolean;
}

function straightLineFallback(stops: Stop[]): [number, number][] {
  return stops.map((s) => [s.lat, s.lng]);
}

export function useRoute(stops: Stop[]): RouteState {
  const [state, setState] = useState<RouteState>({
    positions: straightLineFallback(stops),
    loading: true,
    isFallback: true,
  });

  useEffect(() => {
    let cancelled = false;
    setState({ positions: straightLineFallback(stops), loading: true, isFallback: true });

    if (stops.length < 2) {
      setState({ positions: straightLineFallback(stops), loading: false, isFallback: true });
      return;
    }

    const coords = stops.map((s) => `${s.lng},${s.lat}`).join(';');
    const url = `https://router.project-osrm.org/route/v1/foot/${coords}?overview=full&geometries=geojson`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`OSRM responded ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        const coordinates: [number, number][] | undefined =
          data?.routes?.[0]?.geometry?.coordinates?.map(
            ([lng, lat]: [number, number]) => [lat, lng] as [number, number],
          );
        if (coordinates && coordinates.length > 0) {
          setState({ positions: coordinates, loading: false, isFallback: false });
        } else {
          setState({ positions: straightLineFallback(stops), loading: false, isFallback: true });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setState({ positions: straightLineFallback(stops), loading: false, isFallback: true });
        }
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stops.map((s) => s.id).join(',')]);

  return state;
}
