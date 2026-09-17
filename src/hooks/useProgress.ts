import { useCallback, useState } from 'react';

interface JourneyProgress {
  unlocked: Record<string, string>; // stopId -> ISO timestamp unlocked
}

function storageKey(journeyId: string): string {
  return `pathways:progress:${journeyId}`;
}

function loadProgress(journeyId: string): JourneyProgress {
  try {
    const raw = localStorage.getItem(storageKey(journeyId));
    if (!raw) return { unlocked: {} };
    return JSON.parse(raw) as JourneyProgress;
  } catch {
    return { unlocked: {} };
  }
}

export function useProgress(journeyId: string) {
  const [loadedForId, setLoadedForId] = useState(journeyId);
  const [progress, setProgress] = useState<JourneyProgress>(() => loadProgress(journeyId));

  if (journeyId !== loadedForId) {
    setLoadedForId(journeyId);
    setProgress(loadProgress(journeyId));
  }

  const unlock = useCallback(
    (stopId: string) => {
      setProgress((prev) => {
        if (prev.unlocked[stopId]) return prev;
        const next: JourneyProgress = {
          unlocked: { ...prev.unlocked, [stopId]: new Date().toISOString() },
        };
        try {
          localStorage.setItem(storageKey(journeyId), JSON.stringify(next));
        } catch {
          // localStorage unavailable (private browsing, quota) - progress just won't persist
        }
        return next;
      });
    },
    [journeyId],
  );

  const isUnlocked = useCallback(
    (stopId: string) => Boolean(progress.unlocked[stopId]),
    [progress],
  );

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(storageKey(journeyId));
    } catch {
      // ignore
    }
    setProgress({ unlocked: {} });
  }, [journeyId]);

  const unlockedCount = Object.keys(progress.unlocked).length;

  return { isUnlocked, unlock, reset, unlockedCount };
}
