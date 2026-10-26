import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { Journey } from '../types';
import { pluralize } from '../utils/format';
import { seededOffsetPx, seededRotationDeg } from '../utils/scatter';
import { JourneyCoverFallback } from './JourneyCoverFallback';

export function JourneyCard({ journey }: { journey: Journey }) {
  const scatterStyle = {
    '--scatter-rotate': `${seededRotationDeg(journey.id)}deg`,
    '--scatter-offset': `${seededOffsetPx(journey.id)}px`,
  } as CSSProperties;

  return (
    <Link to={`/journey/${journey.slug}`} className="journey-card" style={scatterStyle}>
      <div
        className="journey-cover"
        style={journey.coverImageUrl ? { backgroundImage: `url(${journey.coverImageUrl})` } : undefined}
      >
        {!journey.coverImageUrl && <JourneyCoverFallback accent={journey.accent} icon={journey.icon} />}
        <div className="journey-cover-overlay">
          <span className="journey-theme">{journey.theme}</span>
          <h2>{journey.title}</h2>
        </div>
      </div>
      <div className="journey-card-body">
        <p>{journey.description}</p>
        <div className="journey-meta">
          <span>⏱ {journey.duration}</span>
          <span>📍 {journey.distance}</span>
          <span>🚩 {pluralize(journey.stops.length, 'stop')}</span>
        </div>
      </div>
    </Link>
  );
}
