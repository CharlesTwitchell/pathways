import { useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { DirectionsButtons, DirectionsIconButton } from '../components/DirectionsLinks';
import { useAuth } from '../hooks/authContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { useJourney } from '../hooks/useJourneys';
import { useProgress } from '../hooks/useProgress';
import { DEFAULT_UNLOCK_RADIUS_M, distanceMeters, formatDistance } from '../utils/geo';

export function StopDetail() {
  const { journeySlug = '', stopPosition = '' } = useParams();
  const navigate = useNavigate();
  const { session } = useAuth();
  const { journey, loading, error } = useJourney(journeySlug);
  const position = Number(stopPosition);
  const stopIndex = journey?.stops.findIndex((s) => s.position === position) ?? -1;
  const stop = stopIndex != null && stopIndex >= 0 ? journey?.stops[stopIndex] : undefined;
  const { isUnlocked, unlock } = useProgress(journey?.id ?? '', session?.user.id ?? null);

  const unlocked = stop ? isUnlocked(stop.id) : false;
  const { position: geoPosition, error: geoError, permissionDenied, loading: geoLoading } =
    useGeolocation(!unlocked);

  const radius = stop?.radiusMeters ?? DEFAULT_UNLOCK_RADIUS_M;
  const distance =
    geoPosition && stop ? distanceMeters(geoPosition.lat, geoPosition.lng, stop.lat, stop.lng) : null;

  useEffect(() => {
    if (!unlocked && stop && distance != null && distance <= radius) {
      unlock(stop.id);
    }
  }, [unlocked, stop, distance, radius, unlock]);

  if (loading) {
    return (
      <main>
        <p className="hint">Loading stop…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="error-banner">Couldn't load this stop: {error}</div>
      </main>
    );
  }

  if (!journey || !stop) return <Navigate to="/" replace />;

  const nextStop = journey.stops[stopIndex + 1];

  return (
    <>
      <div className="top-bar">
        <button
          className="back-button"
          onClick={() => navigate(`/journey/${journey.slug}`)}
          aria-label="Back"
        >
          ←
        </button>
        <div>
          <h1>{journey.title}</h1>
          <div className="subtitle">
            Stop {stop.position} of {journey.stops.length}
          </div>
        </div>
      </div>
      <main className="stop-detail">
        <div
          className="stop-hero"
          style={{
            background: `linear-gradient(135deg, ${journey.accent}, color-mix(in srgb, ${journey.accent} 55%, black))`,
          }}
        >
          {stop.icon}
        </div>
        <h1>{stop.name}</h1>
        <p className="teaser">{stop.teaser}</p>

        <DirectionsButtons stop={stop} />

        {unlocked ? (
          <div className="story-content">
            <div className="unlocked-tag">✓ Unlocked</div>
            {stop.story}
          </div>
        ) : (
          <div className="unlock-card">
            <div className="lock-icon">🔒</div>
            <div>Get within {formatDistance(radius)} to unlock this stop's story.</div>
            {distance != null && <div className="distance-readout">{formatDistance(distance)}</div>}
            {geoLoading && <p className="hint">Finding your location…</p>}
            {geoError && !permissionDenied && <div className="error-banner">{geoError}</div>}
            {permissionDenied && (
              <div className="error-banner">
                Location access is off. Enable it in your browser settings, or check in manually
                below.
              </div>
            )}
            {!geoLoading && !geoError && distance == null && (
              <p className="hint">Waiting for a location signal…</p>
            )}
            <button className="secondary-button" onClick={() => unlock(stop.id)}>
              I'm here — check in manually
            </button>
          </div>
        )}

        {nextStop ? (
          <Link to={`/journey/${journey.slug}/stop/${nextStop.position}`} className="next-stop-nav">
            <div>
              <div className="label">Next stop</div>
              <div className="name">
                {nextStop.icon} {nextStop.name}
              </div>
            </div>
            <DirectionsIconButton stop={nextStop} />
          </Link>
        ) : (
          <Link to={`/journey/${journey.slug}`} className="next-stop-nav">
            <div>
              <div className="label">Last stop</div>
              <div className="name">Back to journey overview</div>
            </div>
            <div>→</div>
          </Link>
        )}
      </main>
    </>
  );
}
