// Deterministic pseudo-randomness seeded by a stable id (e.g. a journey's
// uuid), so the "scattered" look stays put across re-renders and reloads
// instead of jumping around every time.
function hash(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function seededRotationDeg(seed: string, maxDeg = 3.5): number {
  const normalized = (hash(`${seed}:rot`) % 1000) / 1000; // 0..1
  return (normalized * 2 - 1) * maxDeg; // -maxDeg..maxDeg
}

export function seededOffsetPx(seed: string, maxPx = 24): number {
  const normalized = (hash(`${seed}:off`) % 1000) / 1000; // 0..1
  return (normalized * 2 - 1) * maxPx; // -maxPx..maxPx
}
