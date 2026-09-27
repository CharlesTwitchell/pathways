import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { uploadCheckinPhoto } from '../lib/storage';

interface CheckinPhoto {
  id: string;
  photo_url: string;
  created_at: string;
}

export function useCheckinPhotos(userId: string | null, journeyId: string, stopId: string) {
  const [photos, setPhotos] = useState<CheckinPhoto[]>([]);
  const [loading, setLoading] = useState(Boolean(userId));
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const { data } = await supabase
          .from('checkin_photos')
          .select('id, photo_url, created_at')
          .eq('user_id', userId)
          .eq('stop_id', stopId)
          .order('created_at', { ascending: true })
          .abortSignal(AbortSignal.timeout(15000));
        if (!cancelled) setPhotos((data as CheckinPhoto[]) ?? []);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId, stopId]);

  async function addPhoto(file: File) {
    if (!userId) return;
    setError(null);
    setUploading(true);
    try {
      const photoUrl = await uploadCheckinPhoto(userId, stopId, file);
      const { data, error: insertError } = await supabase
        .from('checkin_photos')
        .insert({ user_id: userId, journey_id: journeyId, stop_id: stopId, photo_url: photoUrl })
        .select('id, photo_url, created_at')
        .single();
      if (insertError) throw new Error(insertError.message);
      setPhotos((prev) => [...prev, data as CheckinPhoto]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not add that photo.');
    } finally {
      setUploading(false);
    }
  }

  return { photos, loading, uploading, error, addPhoto };
}
