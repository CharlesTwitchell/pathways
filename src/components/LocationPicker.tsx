import L from 'leaflet';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

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

interface LocationPickerProps {
  lat: number | null;
  lng: number | null;
  onChange: (lat: number, lng: number) => void;
}

export function LocationPicker({ lat, lng, onChange }: LocationPickerProps) {
  const center: [number, number] = lat != null && lng != null ? [lat, lng] : DEFAULT_CENTER;

  return (
    <div className="location-picker">
      <div className="map-wrap location-picker-map">
        <MapContainer center={center} zoom={lat != null ? 15 : 10} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {lat != null && lng != null && <Marker position={[lat, lng]} icon={pinIcon()} />}
          <ClickHandler onPick={onChange} />
        </MapContainer>
      </div>
      <p className="hint">
        {lat != null && lng != null
          ? `${lat.toFixed(5)}, ${lng.toFixed(5)} — tap the map to move the pin`
          : 'Tap the map to drop a pin for this stop'}
      </p>
    </div>
  );
}
