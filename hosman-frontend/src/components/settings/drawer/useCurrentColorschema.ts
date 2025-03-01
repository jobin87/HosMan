import { useEffect, useState } from 'react';

export type Mode = 'light' | 'dark' | 'system';
export type SupportedColorScheme = 'light' | 'dark';

interface UseCurrentColorSchemeOptions {
  defaultMode?: Mode;
  defaultLightColorScheme?: SupportedColorScheme;
  defaultDarkColorScheme?: SupportedColorScheme;
  supportedColorSchemes?: SupportedColorScheme[];
  modeStorageKey?: string;
  colorSchemeStorageKey?: string;
}

export default function useCurrentColorScheme({
  defaultMode = 'light',
  defaultLightColorScheme = 'light',
  defaultDarkColorScheme = 'dark',
  modeStorageKey = 'colorMode',
  colorSchemeStorageKey = 'colorScheme',
}: UseCurrentColorSchemeOptions) {
  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(modeStorageKey) as Mode) || defaultMode;
    }
    return defaultMode;
  });

  const [colorScheme, setColorScheme] = useState<SupportedColorScheme>(() => {
    if (typeof window !== 'undefined') {
      return (
        (localStorage.getItem(colorSchemeStorageKey) as SupportedColorScheme) ||
        (defaultMode === 'dark' ? defaultDarkColorScheme : defaultLightColorScheme)
      );
    }
    return defaultLightColorScheme;
  });

  useEffect(() => {
    const applyColorScheme = (scheme: SupportedColorScheme) => {
      document.body.className = scheme;
    };

    if (mode === 'system') {
      const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? defaultDarkColorScheme
        : defaultLightColorScheme;
      applyColorScheme(systemMode);
    } else {
      applyColorScheme(colorScheme);
    }

    localStorage.setItem(modeStorageKey, mode);
    localStorage.setItem(colorSchemeStorageKey, colorScheme);
  }, [mode, colorScheme, defaultDarkColorScheme, defaultLightColorScheme]);

  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    setColorScheme(newMode === 'dark' ? defaultDarkColorScheme : defaultLightColorScheme);
  };

  return { mode, colorScheme, setMode, toggleMode };
}
