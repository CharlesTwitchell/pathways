import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/authContext';
import { useJourneys } from '../hooks/useJourneys';
import { supabase } from '../lib/supabase';

interface ProgressRow {
  journey_id: string;
  unlocked_stops: Record<string, string>;
  started_at: string;
}

export function Profile() {
  const navigate = useNavigate();
  const { session, profile, loading: authLoading, signOut } = useAuth();
  const { journeys, loading: journeysLoading } = useJourneys();
  const [progressRows, setProgressRows] = useState<ProgressRow[]>([]);
  const [progressLoading, setProgressLoading] = useState(true);

  useEffect(() => {
    const userId = session?.user.id;
    if (!userId) {
      setProgressLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const { data } = await supabase
          .from('journey_progress')
          .select('journey_id, unlocked_stops, started_at')
          .eq('user_id', userId)
          .order('started_at', { ascending: false })
          .abortSignal(AbortSignal.timeout(15000));
        if (!cancelled) setProgressRows((data as ProgressRow[]) ?? []);
      } finally {
        if (!cancelled) setProgressLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session?.user.id]);

  if (authLoading) return null;
  if (!session) return <Navigate to="/" replace />;

  const loading = journeysLoading || progressLoading;
  const myJourneys = journeys.filter((j) => j.createdBy === session.user.id);

  return (
    <>
      <div className="top-bar">
        <button className="back-button" onClick={() => navigate('/')} aria-label="Back">
          ←
        </button>
        <div>
          <h1>Your profile</h1>
        </div>
      </div>
      <main>
        <div className="profile-card">
          {profile?.avatar_url ? (
            <img className="profile-avatar" src={profile.avatar_url} alt="" />
          ) : (
            <div className="profile-avatar-fallback">
              {(profile?.display_name || session.user.email || '?').charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <div className="profile-name">{profile?.display_name || session.user.email}</div>
            <div className="profile-email">{session.user.email}</div>
          </div>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={async () => {
            await signOut();
            navigate('/');
          }}
        >
          Sign out
        </button>

        <h2 className="section-heading">Your pathways</h2>
        {loading && <p className="hint">Loading…</p>}
        {!loading && progressRows.length === 0 && (
          <p className="hint">You haven't started a journey yet.</p>
        )}
        <div className="stop-list">
          {progressRows.map((row) => {
            const journey = journeys.find((j) => j.id === row.journey_id);
            if (!journey) return null;
            const unlockedCount = Object.keys(row.unlocked_stops ?? {}).length;
            const total = journey.stops.length;
            const complete = unlockedCount >= total && total > 0;
            return (
              <Link key={journey.id} to={`/journey/${journey.slug}`} className="stop-row">
                <div className="stop-icon">{journey.icon}</div>
                <div className="stop-row-text">
                  <h3>{journey.title}</h3>
                  <p>
                    {unlockedCount} / {total} stops unlocked
                  </p>
                </div>
                <div className={`stop-status ${complete ? 'visited' : 'locked'}`}>
                  {complete ? 'Complete' : 'In progress'}
                </div>
              </Link>
            );
          })}
        </div>

        <h2 className="section-heading">Journeys you've created</h2>
        <Link to="/create" className="create-journey-button">
          + Create a journey
        </Link>
        {!loading && myJourneys.length === 0 && (
          <p className="hint">You haven't created a journey yet.</p>
        )}
        <div className="stop-list">
          {myJourneys.map((journey) => (
            <Link key={journey.id} to={`/journey/${journey.slug}/edit`} className="stop-row">
              <div className="stop-icon">{journey.icon}</div>
              <div className="stop-row-text">
                <h3>{journey.title}</h3>
                <p>{journey.stops.length} stops</p>
              </div>
              <div className="stop-status locked">Edit</div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
