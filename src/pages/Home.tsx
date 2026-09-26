import { Link } from 'react-router-dom';
import { AuthWidget } from '../components/AuthWidget';
import { JourneyCard } from '../components/JourneyCard';
import { useAuth } from '../hooks/authContext';
import { useJourneys } from '../hooks/useJourneys';

export function Home() {
  const { journeys, loading, error } = useJourneys();
  const { session } = useAuth();

  return (
    <main>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1>Pathways</h1>
            <p>Themed walking journeys. Pick one, follow the trail, unlock the story at every stop.</p>
          </div>
          <AuthWidget />
        </div>
        {session && (
          <Link to="/create" className="create-journey-button">
            + Create a journey
          </Link>
        )}
      </div>

      {loading && <p className="hint">Loading journeys…</p>}
      {error && <div className="error-banner">Couldn't load journeys: {error}</div>}

      <div className="journey-list">
        {journeys.map((journey) => (
          <JourneyCard key={journey.id} journey={journey} />
        ))}
      </div>

      {!loading && !error && journeys.length === 0 && (
        <div className="empty-state">No journeys yet. Be the first to create one!</div>
      )}
    </main>
  );
}
