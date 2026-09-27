import L from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { searchPlaces, type GeocodeResult } from '../utils/geocode';

const DEFAULT_CENTER: [number, number] = [37.8, -122.3];

function pinIcon(): L.DivIcon {
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 26px; height: 26px; border-radius: 50% 50% 50% 0;
      background: #1f6f5c; transform: rotate(-45deg);
      border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.35);
    "></div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
  });
}

function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function RecenterOnChange({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 16);
  }, [map, lat, lng]);
  return null;
}

interface LocationPickerProps {
  lat: number | null;
  lng: number | null;
  onChange: (lat: number, lng: number) => void;
  onAddressFound?: (address: string) => void;
}

export function LocationPicker({ lat, lng, onChange, onAddressFound }: LocationPickerProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [recenterTo, setRecenterTo] = useState<[number, number] | null>(null);

  const center: [number, number] = lat != null && lng != null ? [lat, lng] : DEFAULT_CENTER;

  async function runSearch() {
    if (!query.trim()) return;
    setSearching(true);
    setSearchError(null);
    setResults([]);
    try {
      const found = await searchPlaces(query);
      if (found.length === 0) setSearchError('No matches found. Try adding a city or a nearby street.');
      setResults(found);
    } catch (e) {
      setSearchError(e instanceof Error ? e.message : 'Search failed.');
    } finally {
      setSearching(false);
    }
  }

  function pickResult(result: GeocodeResult) {
    onChange(result.lat, result.lng);
    onAddressFound?.(result.displayName);
    setRecenterTo([result.lat, result.lng]);
    setResults([]);
    setQuery('');
  }

  return (
    <div className="location-picker">
      <div className="location-search">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              runSearch();
            }
          }}
          placeholder="Search by name or address, e.g. Jim's Restaurant, Oakland"
        />
        <button type="button" className="secondary-button location-search-button" onClick={runSearch} disabled={searching}>
          {searching ? 'Searching…' : 'Search'}
        </button>
      </div>
      {searchError && <p className="hint">{searchError}</p>}
      {results.length > 0 && (
        <ul className="location-results">
          {results.map((result, i) => (
            <li key={i}>
              <button type="button" onClick={() => pickResult(result)}>
                {result.displayName}
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="map-wrap location-picker-map">
        <MapContainer center={center} zoom={lat != null ? 15 : 10} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {lat != null && lng != null && <Marker position={[lat, lng]} icon={pinIcon()} />}
          <ClickHandler onPick={onChange} />
          {recenterTo && <RecenterOnChange lat={recenterTo[0]} lng={recenterTo[1]} />}
        </MapContainer>
      </div>
      <p className="hint">
        {lat != null && lng != null
          ? `${lat.toFixed(5)}, ${lng.toFixed(5)} — search above or tap the map to move the pin`
          : 'Search above or tap the map to drop a pin for this stop'}
      </p>
    </div>
  );
}
