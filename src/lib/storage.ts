import { supabase } from './supabase';

const BUCKET = 'journey-images';

function randomId(): string {
  return crypto.randomUUID();
}

function extensionOf(file: File): string {
  const fromName = file.name.split('.').pop();
  if (fromName && fromName.length <= 5) return fromName.toLowerCase();
  return file.type.split('/').pop() || 'jpg';
}

async function upload(path: string, file: File): Promise<string> {
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw new Error(error.message);
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

export function uploadJourneyCoverImage(file: File): Promise<string> {
  return upload(`journeys/${randomId()}.${extensionOf(file)}`, file);
}

export function uploadStopImage(file: File): Promise<string> {
  return upload(`stops/${randomId()}.${extensionOf(file)}`, file);
}

export function uploadCheckinPhoto(userId: string, stopId: string, file: File): Promise<string> {
  return upload(`checkins/${userId}/${stopId}/${randomId()}.${extensionOf(file)}`, file);
}
