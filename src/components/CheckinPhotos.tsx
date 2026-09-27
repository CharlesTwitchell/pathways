import { useCheckinPhotos } from '../hooks/useCheckinPhotos';

interface CheckinPhotosProps {
  userId: string;
  journeyId: string;
  stopId: string;
}

export function CheckinPhotos({ userId, journeyId, stopId }: CheckinPhotosProps) {
  const { photos, loading, uploading, error, addPhoto } = useCheckinPhotos(userId, journeyId, stopId);

  if (loading) return null;

  return (
    <div className="checkin-photos">
      <div className="directions-label">📸 Your check-in photos</div>
      <p className="hint">A private photo journal - only you can see these.</p>
      <div className="checkin-photo-strip">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="checkin-photo-thumb"
            style={{ backgroundImage: `url(${photo.photo_url})` }}
          />
        ))}
        <label className="checkin-photo-add">
          {uploading ? '…' : '+'}
          <input
            type="file"
            accept="image/*"
            capture="environment"
            hidden
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) addPhoto(file);
              e.target.value = '';
            }}
          />
        </label>
      </div>
      {error && <div className="error-banner">{error}</div>}
    </div>
  );
}
