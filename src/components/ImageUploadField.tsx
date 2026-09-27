import { useState } from 'react';

interface ImageUploadFieldProps {
  label: string;
  value?: string;
  onChange: (url: string | undefined) => void;
  uploadFn: (file: File) => Promise<string>;
}

const MAX_SIZE_BYTES = 8 * 1024 * 1024;

export function ImageUploadField({ label, value, onChange, uploadFn }: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.');
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError('Image is too large (max 8MB).');
      return;
    }
    setUploading(true);
    try {
      const url = await uploadFn(file);
      onChange(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="field image-upload-field">
      <span>{label}</span>
      {value && (
        <div className="image-upload-preview" style={{ backgroundImage: `url(${value})` }}>
          <button type="button" className="image-remove-button" onClick={() => onChange(undefined)} aria-label="Remove image">
            ✕
          </button>
        </div>
      )}
      {!value && (
        <label className="image-upload-dropzone">
          {uploading ? 'Uploading…' : '+ Add a photo'}
          <input
            type="file"
            accept="image/*"
            hidden
            disabled={uploading}
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </label>
      )}
      {error && <div className="error-banner">{error}</div>}
    </div>
  );
}
