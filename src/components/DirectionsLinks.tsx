import type { Stop } from '../types';
import { appleMapsDirectionsUrl, googleMapsDirectionsUrl } from '../utils/directions';

// Full-size pair of buttons, used on the stop detail page.
export function DirectionsButtons({ stop }: { stop: Stop }) {
  return (
    <div className="directions-card">
      <div className="directions-label">🧭 Get directions</div>
      {stop.address && <div className="directions-address">{stop.address}</div>}
      <div className="directions-buttons">
        <a
          className="directions-button"
          href={googleMapsDirectionsUrl(stop)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Maps
        </a>
        <a
          className="directions-button"
          href={appleMapsDirectionsUrl(stop)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Apple Maps
        </a>
      </div>
    </div>
  );
}

// Icon-only button for use inside a stop row that's already a <Link> —
// stops propagation so it doesn't trigger the row's own navigation.
export function DirectionsIconButton({ stop }: { stop: Stop }) {
  return (
    <button
      type="button"
      className="directions-icon-button"
      aria-label={`Get directions to ${stop.name}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        window.open(googleMapsDirectionsUrl(stop), '_blank', 'noopener,noreferrer');
      }}
    >
      🧭
    </button>
  );
}
