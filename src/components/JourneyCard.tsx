import { Link } from 'react-router-dom';
import type { Journey } from '../types';
import { pluralize } from '../utils/format';

export function JourneyCard({ journey }: { journey: Journey }) {
  return (
    <Link to={`/journey/${journey.slug}`} className="journey-card">
      <div
        className="journey-cover"
        style={{
          background: `linear-gradient(135deg, ${journey.accent}, color-mix(in srgb, ${journey.accent} 60%, black))`,
        }}
      >
        {journey.icon}
      </div>
      <div className="journey-card-body">
        <span className="journey-theme">{journey.theme}</span>
        <h2>{journey.title}</h2>
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
