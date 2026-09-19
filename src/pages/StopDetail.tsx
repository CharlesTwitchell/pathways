import { useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { DirectionsButtons, DirectionsIconButton } from '../components/DirectionsLinks';
import { getJourney } from '../data/journeys';
import { useGeolocation } from '../hooks/useGeolocation';
import { useProgress } from '../hooks/useProgress';
import { DEFAULT_UNLOCK_RADIUS_M, distanceMeters, formatDistance } from '../utils/geo';

export function StopDetail() {
  const { journeyId = '', stopId = '' } = useParams();
  const navigate = useNavigate();
  const journey = getJourney(journeyId);
  const stopIndex = journey?.stops.findIndex((s) => s.id === stopId) ?? -1;
  const stop = stopIndex != null && stopIndex >= 0 ? journey?.stops[stopIndex] : undefined;
  const { isUnlocked, unlock } = useProgress(journeyId);

  const unlocked = stop ? isUnlocked(stop.id) : false;
  const { position, error, permissionDenied, loading } = useGeolocation(!unlocked);

  const radius = stop?.radiusMeters ?? DEFAULT_UNLOCK_RADIUS_M;
  const distance =
    position && stop ? distanceMeters(position.lat, position.lng, stop.lat, stop.lng) : null;

  useEffect(() => {
    if (!unlocked && stop && distance != null && distance <= radius) {
      unlock(stop.id);
    }
  }, [unlocked, stop, distance, radius, unlock]);

  if (!journey || !stop) return <Navigate to="/" replace />;

  const nextStop = journey.stops[stopIndex + 1];

  return (
    <>
      <div className="top-bar">
        <button
          className="back-button"
          onClick={() => navigate(`/journey/${journey.id}`)}
          aria-label="Back"
        >
          ←
        </button>
        <div>
          <h1>{journey.title}</h1>
          <div className="subtitle">
            Stop {stopIndex + 1} of {journey.stops.length}
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
            {loading && <p className="hint">Finding your location…</p>}
            {error && !permissionDenied && <div className="error-banner">{error}</div>}
            {permissionDenied && (
              <div className="error-banner">
                Location access is off. Enable it in your browser settings, or check in manually
                below.
              </div>
            )}
            {!loading && !error && distance == null && (
              <p className="hint">Waiting for a location signal…</p>
            )}
            <button className="secondary-button" onClick={() => unlock(stop.id)}>
              I'm here — check in manually
            </button>
          </div>
        )}

        {nextStop ? (
          <Link to={`/journey/${journey.id}/stop/${nextStop.id}`} className="next-stop-nav">
            <div>
              <div className="label">Next stop</div>
              <div className="name">
                {nextStop.icon} {nextStop.name}
              </div>
            </div>
            <DirectionsIconButton stop={nextStop} />
          </Link>
        ) : (
          <Link to={`/journey/${journey.id}`} className="next-stop-nav">
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
