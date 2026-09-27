import { useMemo } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { DirectionsIconButton } from '../components/DirectionsLinks';
import { JourneyMap } from '../components/JourneyMap';
import { ShareButton } from '../components/ShareButton';
import { useAuth } from '../hooks/authContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { useJourney } from '../hooks/useJourneys';
import { useProgress } from '../hooks/useProgress';
import { distanceMeters, formatDistance } from '../utils/geo';
import { pluralize } from '../utils/format';

export function JourneyDetail() {
  const { journeySlug = '' } = useParams();
  const navigate = useNavigate();
  const { session } = useAuth();
  const { journey, loading, error } = useJourney(journeySlug);
  const { isUnlocked, unlockedCount } = useProgress(journey?.id ?? '', session?.user.id ?? null);
  const { position } = useGeolocation(true);

  const nextStop = useMemo(
    () => journey?.stops.find((s) => !isUnlocked(s.id)),
    [journey, isUnlocked],
  );

  if (loading) {
    return (
      <main>
        <p className="hint">Loading journey…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="error-banner">Couldn't load this journey: {error}</div>
      </main>
    );
  }

  if (!journey) return <Navigate to="/" replace />;

  const journeyUrl = `${window.location.origin}${import.meta.env.BASE_URL}#/journey/${journey.slug}`;
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
        <div className="top-bar-actions">
          <ShareButton
            title={journey.title}
            text={`Check out "${journey.title}" on Pathways`}
            url={journeyUrl}
            className="share-icon-button"
          >
            <span aria-hidden="true">↗</span>
          </ShareButton>
          {session?.user.id === journey.createdBy && (
            <Link to={`/journey/${journey.slug}/edit`} className="edit-journey-link">
              Edit
            </Link>
          )}
        </div>
      </div>
      <main>
        <JourneyMap stops={journey.stops} visitedIds={visitedIds} userPosition={position} />

        <div className="progress-banner">
          <div>
            <div>
              <span className="count">{unlockedCount}</span> /{' '}
              {pluralize(journey.stops.length, 'stop')} unlocked
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
            <ShareButton
              title={journey.title}
              text={`I just completed "${journey.title}" on Pathways! 🎉`}
              url={journeyUrl}
              className="secondary-button"
            >
              Share your completion
            </ShareButton>
          </div>
        )}

        <div className="stop-list">
          {journey.stops.map((stop) => {
            const visited = isUnlocked(stop.id);
            return (
              <Link
                key={stop.id}
                to={`/journey/${journey.slug}/stop/${stop.position}`}
                className={`stop-row${visited ? ' visited' : ''}`}
              >
                <div className="stop-index">{stop.position}</div>
                <div className="stop-icon">{stop.icon}</div>
                <div className="stop-row-text">
                  <h3>{stop.name}</h3>
                  <p>{visited ? 'Story unlocked' : stop.teaser}</p>
                </div>
                <div className={`stop-status ${visited ? 'visited' : 'locked'}`}>
                  {visited ? 'Visited' : 'Locked'}
                </div>
                <DirectionsIconButton stop={stop} />
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
