import { useState } from 'react';
import { getStoredTheme, setTheme, type ThemePreference } from '../lib/theme';

const NEXT: Record<ThemePreference, ThemePreference> = {
  system: 'light',
  light: 'dark',
  dark: 'system',
};

const ICON: Record<ThemePreference, string> = {
  system: '🖥️',
  light: '☀️',
  dark: '🌙',
};

const LABEL: Record<ThemePreference, string> = {
  system: 'Matching system theme',
  light: 'Light theme',
  dark: 'Dark theme',
};

export function ThemeToggle() {
  const [theme, setThemeState] = useState<ThemePreference>(getStoredTheme);

  function cycle() {
    const next = NEXT[theme];
    setTheme(next);
    setThemeState(next);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={cycle}
      aria-label={`Theme: ${LABEL[theme]}. Tap to change.`}
      title={LABEL[theme]}
    >
      {ICON[theme]}
    </button>
  );
}
