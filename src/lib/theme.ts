export type ThemePreference = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'pathways:theme';

export function getStoredTheme(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // localStorage unavailable - fall through to system default
  }
  return 'system';
}

export function applyTheme(theme: ThemePreference) {
  const root = document.documentElement;
  if (theme === 'system') {
    delete root.dataset.theme;
  } else {
    root.dataset.theme = theme;
  }
}

export function setTheme(theme: ThemePreference) {
  applyTheme(theme);
  try {
    if (theme === 'system') {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, theme);
    }
  } catch {
    // localStorage unavailable - the choice just won't persist across reloads
  }
}
