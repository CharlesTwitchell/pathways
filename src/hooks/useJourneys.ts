import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Journey, Stop } from '../types';

interface StopRow {
  id: string;
  position: number;
  name: string;
  lat: number;
  lng: number;
  address: string | null;
  icon: string;
  teaser: string;
  story: string;
  radius_meters: number;
}

interface JourneyRow {
  id: string;
  slug: string;
  title: string;
  theme: string;
  icon: string;
  accent: string;
  description: string;
  duration: string;
  distance: string;
  created_by: string | null;
  stops: StopRow[];
}

function mapStop(row: StopRow): Stop {
  return {
    id: row.id,
    position: row.position,
    name: row.name,
    lat: row.lat,
    lng: row.lng,
    address: row.address ?? undefined,
    icon: row.icon,
    teaser: row.teaser,
    story: row.story,
    radiusMeters: row.radius_meters,
  };
}

function mapJourney(row: JourneyRow): Journey {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    theme: row.theme,
    icon: row.icon,
    accent: row.accent,
    description: row.description,
    duration: row.duration,
    distance: row.distance,
    createdBy: row.created_by,
    stops: [...row.stops].sort((a, b) => a.position - b.position).map(mapStop),
  };
}

const JOURNEY_SELECT = '*, stops(*)';
const QUERY_TIMEOUT_MS = 15000;
const TIMEOUT_MESSAGE = 'Timed out reaching the database. Check your connection and try again.';

export function useJourneys() {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const { data, error: err } = await supabase
          .from('journeys')
          .select(JOURNEY_SELECT)
          .order('created_at', { ascending: true })
          .abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS));
        if (cancelled) return;
        if (err) {
          setError(err.message);
        } else {
          setJourneys((data as JourneyRow[]).map(mapJourney));
        }
      } catch {
        if (!cancelled) setError(TIMEOUT_MESSAGE);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { journeys, loading, error };
}

export function useJourney(slug: string) {
  const [journey, setJourney] = useState<Journey | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setJourney(null);
    (async () => {
      try {
        const { data, error: err } = await supabase
          .from('journeys')
          .select(JOURNEY_SELECT)
          .eq('slug', slug)
          .abortSignal(AbortSignal.timeout(QUERY_TIMEOUT_MS))
          .maybeSingle();
        if (cancelled) return;
        if (err) {
          setError(err.message);
        } else {
          setJourney(data ? mapJourney(data as JourneyRow) : null);
        }
      } catch {
        if (!cancelled) setError(TIMEOUT_MESSAGE);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { journey, loading, error };
}

export interface NewStopInput {
  name: string;
  lat: number;
  lng: number;
  address?: string;
  icon: string;
  teaser: string;
  story: string;
  radiusMeters?: number;
}

export interface NewJourneyInput {
  title: string;
  theme: string;
  icon: string;
  accent: string;
  description: string;
  duration: string;
  distance: string;
  stops: NewStopInput[];
}

function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${base}-${Math.random().toString(36).slice(2, 7)}`;
}

export async function createJourney(input: NewJourneyInput, userId: string): Promise<string> {
  const slug = slugify(input.title);
  const { data: journeyRow, error: journeyError } = await supabase
    .from('journeys')
    .insert({
      slug,
      title: input.title,
      theme: input.theme,
      icon: input.icon,
      accent: input.accent,
      description: input.description,
      duration: input.duration,
      distance: input.distance,
      created_by: userId,
    })
    .select('id')
    .single();

  if (journeyError) throw new Error(journeyError.message);

  const stopRows = input.stops.map((stop, i) => ({
    journey_id: journeyRow.id,
    position: i + 1,
    name: stop.name,
    lat: stop.lat,
    lng: stop.lng,
    address: stop.address || null,
    icon: stop.icon,
    teaser: stop.teaser,
    story: stop.story,
    radius_meters: stop.radiusMeters ?? 75,
  }));

  const { error: stopsError } = await supabase.from('stops').insert(stopRows);
  if (stopsError) throw new Error(stopsError.message);

  return slug;
}

export async function updateJourney(journeyId: string, input: NewJourneyInput): Promise<void> {
  const { error: journeyError } = await supabase
    .from('journeys')
    .update({
      title: input.title,
      theme: input.theme,
      icon: input.icon,
      accent: input.accent,
      description: input.description,
      duration: input.duration,
      distance: input.distance,
    })
    .eq('id', journeyId);
  if (journeyError) throw new Error(journeyError.message);

  const { error: deleteError } = await supabase.from('stops').delete().eq('journey_id', journeyId);
  if (deleteError) throw new Error(deleteError.message);

  const stopRows = input.stops.map((stop, i) => ({
    journey_id: journeyId,
    position: i + 1,
    name: stop.name,
    lat: stop.lat,
    lng: stop.lng,
    address: stop.address || null,
    icon: stop.icon,
    teaser: stop.teaser,
    story: stop.story,
    radius_meters: stop.radiusMeters ?? 75,
  }));

  const { error: stopsError } = await supabase.from('stops').insert(stopRows);
  if (stopsError) throw new Error(stopsError.message);
}

export async function deleteJourney(journeyId: string): Promise<void> {
  const { error } = await supabase.from('journeys').delete().eq('id', journeyId);
  if (error) throw new Error(error.message);
}
