import { useMemo } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { JourneyMap } from '../components/JourneyMap';
import { getJourney } from '../data/journeys';
import { useGeolocation } from '../hooks/useGeolocation';
import { useProgress } from '../hooks/useProgress';
import { distanceMeters, formatDistance } from '../utils/geo';

export function JourneyDetail() {
  const { journeyId = '' } = useParams();
  const navigate = useNavigate();
  const journey = getJourney(journeyId);
  const { isUnlocked, unlockedCount } = useProgress(journeyId);
  const { position } = useGeolocation(true);

  const nextStop = useMemo(
    () => journey?.stops.find((s) => !isUnlocked(s.id)),
    [journey, isUnlocked],
  );

  if (!journey) return <Navigate to="/" replace />;

  const visitedIds = new Set(journey.stops.filter((s) => isUnlocked(s.id)).map((s) => s.id));
  const percent = Math.round((unlockedCount / journey.stops.length) * 100);
  const distanceToNext =
    position && nextStop
      ? distanceMeters(position.lat, position.lng, nextStop.lat, nextStop.lng)
      : null;

  return (
    <>
      <div className="top-bar">
        <button className="back-button" onClick={() => navigate('/')} aria-label="Back">
          ←
        </button>
        <div>
          <h1>{journey.title}</h1>
          <div className="subtitle">{journey.theme}</div>
        </div>
      </div>
      <main>
        <JourneyMap stops={journey.stops} visitedIds={visitedIds} userPosition={position} />

        <div className="progress-banner">
          <div>
            <div>
              <span className="count">{unlockedCount}</span> / {journey.stops.length} stops
              unlocked
            </div>
            {nextStop && (
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                {distanceToNext != null
                  ? `${formatDistance(distanceToNext)} to ${nextStop.name}`
                  : `Next: ${nextStop.name}`}
              </div>
            )}
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${percent}%` }} />
            </div>
          </div>
        </div>

        {unlockedCount === journey.stops.length && (
          <div className="completion-banner">
            <div className="big-icon">🎉</div>
            <h2>Journey complete</h2>
            <p>You've unlocked every stop on {journey.title}.</p>
          </div>
        )}

        <div className="stop-list">
          {journey.stops.map((stop, i) => {
            const visited = isUnlocked(stop.id);
            return (
              <Link
                key={stop.id}
                to={`/journey/${journey.id}/stop/${stop.id}`}
                className={`stop-row${visited ? ' visited' : ''}`}
              >
                <div className="stop-index">{i + 1}</div>
                <div className="stop-icon">{stop.icon}</div>
                <div className="stop-row-text">
                  <h3>{stop.name}</h3>
                  <p>{visited ? 'Story unlocked' : stop.teaser}</p>
                </div>
                <div className={`stop-status ${visited ? 'visited' : 'locked'}`}>
                  {visited ? 'Visited' : 'Locked'}
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
