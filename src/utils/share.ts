export type ShareResult = 'shared' | 'copied' | 'failed';

export async function shareContent(data: { title: string; text?: string; url: string }): Promise<ShareResult> {
  if (navigator.share) {
    try {
      await navigator.share(data);
      return 'shared';
    } catch (err) {
      // User cancelled the share sheet - not an error worth falling back for.
      if (err instanceof Error && err.name === 'AbortError') return 'failed';
      // Any other failure (e.g. unsupported data on this platform) - try clipboard instead.
    }
  }

  try {
    await navigator.clipboard.writeText(data.url);
    return 'copied';
  } catch {
    return 'failed';
  }
}
