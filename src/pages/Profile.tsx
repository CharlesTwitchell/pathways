import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/authContext';
import { useJourneys } from '../hooks/useJourneys';
import { supabase } from '../lib/supabase';
import { computeBadges } from '../utils/badges';
import { pluralize } from '../utils/format';

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

  const userId = session?.user.id;
  const myJourneys = journeys.filter((j) => j.createdBy === userId);

  const badges = useMemo(() => {
    const completedJourneyIds = new Set(
      progressRows
        .filter((row) => {
          const journey = journeys.find((j) => j.id === row.journey_id);
          if (!journey || journey.stops.length === 0) return false;
          return Object.keys(row.unlocked_stops ?? {}).length >= journey.stops.length;
        })
        .map((row) => row.journey_id),
    );
    return computeBadges({
      totalUnlockedStops: progressRows.reduce(
        (sum, row) => sum + Object.keys(row.unlocked_stops ?? {}).length,
        0,
      ),
      completedJourneyCount: completedJourneyIds.size,
      createdJourneyCount: myJourneys.length,
      allJourneysComplete: journeys.length > 0 && journeys.every((j) => completedJourneyIds.has(j.id)),
    });
  }, [progressRows, journeys, myJourneys.length]);

  if (authLoading) return null;
  if (!session) return <Navigate to="/" replace />;

  const loading = journeysLoading || progressLoading;

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

        {!loading && (
          <>
            <h2 className="section-heading">Badges</h2>
            <div className="badge-grid">
              {badges.map((badge) => (
                <div key={badge.id} className={`badge${badge.earned ? ' earned' : ''}`}>
                  <div className="badge-icon">{badge.earned ? badge.icon : '🔒'}</div>
                  <div className="badge-name">{badge.name}</div>
                  <div className="badge-description">{badge.description}</div>
                </div>
              ))}
            </div>
          </>
        )}

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
                <p>{pluralize(journey.stops.length, 'stop')}</p>
              </div>
              <div className="stop-status locked">Edit</div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
