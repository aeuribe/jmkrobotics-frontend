/**
 * Centralized media URL helper — ready for zero-refactor migration to Cloudflare R2.
 * In local preview, NEXT_PUBLIC_MEDIA_BASE_URL is empty and serves from /public/media/...
 * In production with R2, set NEXT_PUBLIC_MEDIA_BASE_URL=https://media.jmkrobotics.com
 */
const MEDIA_BASE_URL = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL || '').replace(/\/$/, '');

export function getMediaUrl(relativePath: string): string {
  if (/^https?:\/\//i.test(relativePath)) return relativePath;
  const normalized = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
  return MEDIA_BASE_URL ? `${MEDIA_BASE_URL}${normalized}` : normalized;
}
