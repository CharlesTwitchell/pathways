import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthWidget } from '../components/AuthWidget';
import { JourneyCard } from '../components/JourneyCard';
import { ThemeToggle } from '../components/ThemeToggle';
import { useAuth } from '../hooks/authContext';
import { useJourneys } from '../hooks/useJourneys';

export function Home() {
  const { journeys, loading, error } = useJourneys();
  const { session } = useAuth();
  const [query, setQuery] = useState('');
  const [activeTheme, setActiveTheme] = useState<string | null>(null);

  const themes = useMemo(
    () => [...new Set(journeys.map((j) => j.theme))].sort(),
    [journeys],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return journeys.filter((j) => {
      if (activeTheme && j.theme !== activeTheme) return false;
      if (!q) return true;
      return (
        j.title.toLowerCase().includes(q) ||
        j.theme.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q)
      );
    });
  }, [journeys, query, activeTheme]);

  return (
    <main>
      <div className="page-header">
        <div className="page-header-top">
          <div>
            <h1>Pathways</h1>
            <p>Themed walking journeys. Pick one, follow the trail, unlock the story at every stop.</p>
          </div>
          <div className="header-actions">
            <ThemeToggle />
            <AuthWidget />
          </div>
        </div>
        {session && (
          <Link to="/create" className="create-journey-button">
            + Create a journey
          </Link>
        )}
      </div>

      {loading && <p className="hint">Loading journeys…</p>}
      {error && <div className="error-banner">Couldn't load journeys: {error}</div>}

      {!loading && !error && journeys.length > 0 && (
        <div className="search-bar">
          <input
            type="search"
            className="search-input"
            placeholder="Search journeys…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search journeys"
          />
          {themes.length > 1 && (
            <div className="theme-chips">
              <button
                type="button"
                className={`theme-chip${activeTheme === null ? ' active' : ''}`}
                onClick={() => setActiveTheme(null)}
              >
                All
              </button>
              {themes.map((theme) => (
                <button
                  key={theme}
                  type="button"
                  className={`theme-chip${activeTheme === theme ? ' active' : ''}`}
                  onClick={() => setActiveTheme(activeTheme === theme ? null : theme)}
                >
                  {theme}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="journey-list">
        {filtered.map((journey) => (
          <JourneyCard key={journey.id} journey={journey} />
        ))}
      </div>

      {!loading && !error && journeys.length === 0 && (
        <div className="empty-state">No journeys yet. Be the first to create one!</div>
      )}
      {!loading && !error && journeys.length > 0 && filtered.length === 0 && (
        <div className="empty-state">No journeys match your search.</div>
      )}
    </main>
  );
}
