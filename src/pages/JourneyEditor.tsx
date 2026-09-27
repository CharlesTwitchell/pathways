import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ImageUploadField } from '../components/ImageUploadField';
import { LocationPicker } from '../components/LocationPicker';
import { useAuth } from '../hooks/authContext';
import {
  createJourney,
  deleteJourney,
  updateJourney,
  useJourney,
  type NewStopInput,
} from '../hooks/useJourneys';
import { uploadJourneyCoverImage, uploadStopImage } from '../lib/storage';

interface StopDraft extends NewStopInput {
  key: string;
}

function blankStop(): StopDraft {
  return {
    key: Math.random().toString(36).slice(2),
    name: '',
    lat: 37.8,
    lng: -122.3,
    address: '',
    icon: '📍',
    teaser: '',
    story: '',
    radiusMeters: 75,
  };
}

export function JourneyEditor() {
  const { journeySlug } = useParams();
  const isEditing = Boolean(journeySlug);
  const navigate = useNavigate();
  const { session, loading: authLoading } = useAuth();
  const { journey, loading: journeyLoading } = useJourney(journeySlug ?? '');

  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [icon, setIcon] = useState('🗺️');
  const [accent, setAccent] = useState('#1f6f5c');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState<string | undefined>(undefined);
  const [stops, setStops] = useState<StopDraft[]>([blankStop()]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (isEditing && journey && !hydrated) {
      setTitle(journey.title);
      setTheme(journey.theme);
      setIcon(journey.icon);
      setAccent(journey.accent);
      setDescription(journey.description);
      setDuration(journey.duration);
      setDistance(journey.distance);
      setCoverImageUrl(journey.coverImageUrl);
      setStops(
        journey.stops.map((s) => ({
          key: s.id,
          name: s.name,
          lat: s.lat,
          lng: s.lng,
          address: s.address ?? '',
          icon: s.icon,
          teaser: s.teaser,
          story: s.story,
          radiusMeters: s.radiusMeters,
          imageUrl: s.imageUrl,
        })),
      );
      setHydrated(true);
    }
  }, [isEditing, journey, hydrated]);

  if (authLoading) return null;
  if (!session) return <Navigate to="/" replace />;
  if (isEditing && journeyLoading) {
    return (
      <main>
        <p className="hint">Loading journey…</p>
      </main>
    );
  }
  if (isEditing && journey && journey.createdBy !== session.user.id) {
    return <Navigate to={`/journey/${journeySlug}`} replace />;
  }

  function updateStop(key: string, patch: Partial<StopDraft>) {
    setStops((prev) => prev.map((s) => (s.key === key ? { ...s, ...patch } : s)));
  }

  function removeStop(key: string) {
    setStops((prev) => prev.filter((s) => s.key !== key));
  }

  function moveStop(key: string, dir: -1 | 1) {
    setStops((prev) => {
      const i = prev.findIndex((s) => s.key === key);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  const canSave =
    title.trim() &&
    theme.trim() &&
    icon.trim() &&
    description.trim() &&
    duration.trim() &&
    distance.trim() &&
    stops.length > 0 &&
    stops.every((s) => s.name.trim() && s.teaser.trim() && s.story.trim() && s.icon.trim());

  async function handleSave() {
    if (!canSave || !session) return;
    setSaving(true);
    setSaveError(null);
    const input = { title, theme, icon, accent, description, duration, distance, coverImageUrl, stops };
    try {
      if (isEditing && journey) {
        await updateJourney(journey.id, input);
        navigate(`/journey/${journey.slug}`);
      } else {
        const slug = await createJourney(input, session.user.id);
        navigate(`/journey/${slug}`);
      }
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Something went wrong saving this journey.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!journey || !confirm(`Delete "${journey.title}"? This can't be undone.`)) return;
    setSaving(true);
    try {
      await deleteJourney(journey.id);
      navigate('/');
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Could not delete this journey.');
      setSaving(false);
    }
  }

  return (
    <>
      <div className="top-bar">
        <button
          className="back-button"
          onClick={() => navigate(isEditing ? `/journey/${journeySlug}` : '/')}
          aria-label="Back"
        >
          ←
        </button>
        <div>
          <h1>{isEditing ? 'Edit journey' : 'Create a journey'}</h1>
        </div>
      </div>
      <main className="editor-form">
        <label className="field">
          <span>Title</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Golden Gate Park Icons" />
        </label>
        <label className="field">
          <span>Theme</span>
          <input value={theme} onChange={(e) => setTheme(e.target.value)} placeholder="e.g. Nature & Culture" />
        </label>
        <div className="field-row">
          <label className="field">
            <span>Icon (emoji)</span>
            <input value={icon} onChange={(e) => setIcon(e.target.value)} maxLength={4} />
          </label>
          <label className="field">
            <span>Accent color</span>
            <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} />
          </label>
        </div>
        <label className="field">
          <span>Description</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="One or two sentences shown on the journey card."
          />
        </label>
        <div className="field-row">
          <label className="field">
            <span>Duration</span>
            <input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="~2 hours" />
          </label>
          <label className="field">
            <span>Distance</span>
            <input value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="2.5 mi" />
          </label>
        </div>

        <ImageUploadField
          label="Cover photo (optional)"
          value={coverImageUrl}
          onChange={setCoverImageUrl}
          uploadFn={uploadJourneyCoverImage}
        />

        <h2 className="section-heading">Stops</h2>
        {stops.map((stop, i) => (
          <div key={stop.key} className="stop-editor-card">
            <div className="stop-editor-header">
              <span>Stop {i + 1}</span>
              <div className="stop-editor-controls">
                <button type="button" onClick={() => moveStop(stop.key, -1)} disabled={i === 0} aria-label="Move up">
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveStop(stop.key, 1)}
                  disabled={i === stops.length - 1}
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeStop(stop.key)}
                  disabled={stops.length === 1}
                  aria-label="Remove stop"
                >
                  ✕
                </button>
              </div>
            </div>
            <label className="field">
              <span>Name</span>
              <input value={stop.name} onChange={(e) => updateStop(stop.key, { name: e.target.value })} />
            </label>
            <ImageUploadField
              label="Photo (optional)"
              value={stop.imageUrl}
              onChange={(url) => updateStop(stop.key, { imageUrl: url })}
              uploadFn={uploadStopImage}
            />
            <LocationPicker
              lat={stop.lat}
              lng={stop.lng}
              onChange={(lat, lng) => updateStop(stop.key, { lat, lng })}
            />
            <label className="field">
              <span>Address (optional)</span>
              <input
                value={stop.address}
                onChange={(e) => updateStop(stop.key, { address: e.target.value })}
              />
            </label>
            <label className="field">
              <span>Icon (emoji)</span>
              <input
                value={stop.icon}
                onChange={(e) => updateStop(stop.key, { icon: e.target.value })}
                maxLength={4}
              />
            </label>
            <label className="field">
              <span>Teaser (shown before unlocked)</span>
              <textarea
                value={stop.teaser}
                onChange={(e) => updateStop(stop.key, { teaser: e.target.value })}
                rows={2}
              />
            </label>
            <label className="field">
              <span>Story (shown once unlocked)</span>
              <textarea
                value={stop.story}
                onChange={(e) => updateStop(stop.key, { story: e.target.value })}
                rows={4}
              />
            </label>
          </div>
        ))}

        <button type="button" className="secondary-button" onClick={() => setStops((prev) => [...prev, blankStop()])}>
          + Add a stop
        </button>

        {saveError && <div className="error-banner">{saveError}</div>}

        <button type="button" className="primary-button" disabled={!canSave || saving} onClick={handleSave}>
          {saving ? 'Saving…' : isEditing ? 'Save changes' : 'Publish journey'}
        </button>

        {isEditing && (
          <button type="button" className="secondary-button delete-button" onClick={handleDelete} disabled={saving}>
            Delete journey
          </button>
        )}
      </main>
    </>
  );
}
