import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface UnlockedMap {
  [stopId: string]: string; // ISO timestamp unlocked
}

function storageKey(journeyId: string): string {
  return `pathways:progress:${journeyId}`;
}

function loadLocalProgress(journeyId: string): UnlockedMap {
  try {
    const raw = localStorage.getItem(storageKey(journeyId));
    return raw ? (JSON.parse(raw) as UnlockedMap) : {};
  } catch {
    return {};
  }
}

function saveLocalProgress(journeyId: string, unlocked: UnlockedMap) {
  try {
    localStorage.setItem(storageKey(journeyId), JSON.stringify(unlocked));
  } catch {
    // localStorage unavailable (private browsing, quota) - progress just won't persist
  }
}

// Signed-out visitors keep progress in localStorage, same as before. Signed-in
// users get it synced to the journey_progress table instead — DB-backed
// progress starts fresh rather than importing any local progress made before
// signing in.
export function useProgress(journeyId: string, userId: string | null) {
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState<UnlockedMap>({});

  const key = `${userId ?? 'anon'}:${journeyId}`;

  if (!userId && key !== loadedKey) {
    setLoadedKey(key);
    setUnlocked(loadLocalProgress(journeyId));
  }

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    supabase
      .from('journey_progress')
      .select('unlocked_stops')
      .eq('user_id', userId)
      .eq('journey_id', journeyId)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        setUnlocked((data?.unlocked_stops as UnlockedMap) ?? {});
        setLoadedKey(key);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, journeyId]);

  const unlock = useCallback(
    (stopId: string) => {
      setUnlocked((prev) => {
        if (prev[stopId]) return prev;
        const next = { ...prev, [stopId]: new Date().toISOString() };

        if (userId) {
          supabase
            .from('journey_progress')
            .upsert(
              { user_id: userId, journey_id: journeyId, unlocked_stops: next, updated_at: new Date().toISOString() },
              { onConflict: 'user_id,journey_id' },
            )
            .then(({ error }) => {
              if (error) console.error('Failed to sync progress:', error.message);
            });
        } else {
          saveLocalProgress(journeyId, next);
        }
        return next;
      });
    },
    [journeyId, userId],
  );

  const isUnlocked = useCallback((stopId: string) => Boolean(unlocked[stopId]), [unlocked]);
  const unlockedCount = Object.keys(unlocked).length;
  const ready = userId ? loadedKey === key : true;

  return { isUnlocked, unlock, unlockedCount, ready };
}
