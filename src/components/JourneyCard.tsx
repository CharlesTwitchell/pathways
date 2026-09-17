import { Link } from 'react-router-dom';
import type { Journey } from '../types';

export function JourneyCard({ journey }: { journey: Journey }) {
  return (
    <Link to={`/journey/${journey.id}`} className="journey-card">
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
          <span>🚩 {journey.stops.length} stops</span>
        </div>
      </div>
    </Link>
  );
}
