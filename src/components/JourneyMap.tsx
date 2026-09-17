import L from 'leaflet';
import { useEffect, useMemo } from 'react';
import { MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap } from 'react-leaflet';
import { useRoute } from '../hooks/useRoute';
import type { Stop } from '../types';

function stopDivIcon(label: string, visited: boolean): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 30px; height: 30px; border-radius: 50%;
      background: ${visited ? '#2f8f52' : '#1f6f5c'};
      color: white; display: flex; align-items: center; justify-content: center;
      font-size: 14px; font-weight: 700; box-shadow: 0 2px 6px rgba(0,0,0,0.35);
      border: 2px solid white;
    ">${visited ? '✓' : label}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

function meDivIcon(): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 18px; height: 18px; border-radius: 50%;
      background: #2b7fff; border: 3px solid white;
      box-shadow: 0 0 0 4px rgba(43,127,255,0.35);
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length === 0) return;
    const bounds = L.latLngBounds(positions);
    map.fitBounds(bounds, { padding: [32, 32] });
  }, [map, positions]);
  return null;
}

interface JourneyMapProps {
  stops: Stop[];
  visitedIds: Set<string>;
  userPosition?: { lat: number; lng: number } | null;
}

export function JourneyMap({ stops, visitedIds, userPosition }: JourneyMapProps) {
  const { positions: routePositions } = useRoute(stops);
  const boundsPositions = useMemo<[number, number][]>(
    () => stops.map((s) => [s.lat, s.lng]),
    [stops],
  );
  const center = boundsPositions[0] ?? [0, 0];

  return (
    <div className="map-wrap">
      <MapContainer center={center} zoom={14} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline
          positions={routePositions}
          pathOptions={{ color: '#1f6f5c', weight: 4, opacity: 0.75 }}
        />
        {stops.map((stop, i) => (
          <Marker
            key={stop.id}
            position={[stop.lat, stop.lng]}
            icon={stopDivIcon(String(i + 1), visitedIds.has(stop.id))}
          >
            <Tooltip direction="top" offset={[0, -15]}>
              {stop.name}
            </Tooltip>
          </Marker>
        ))}
        {userPosition && (
          <Marker position={[userPosition.lat, userPosition.lng]} icon={meDivIcon()} />
        )}
        <FitBounds positions={boundsPositions} />
      </MapContainer>
    </div>
  );
}
