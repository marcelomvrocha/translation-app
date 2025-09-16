import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';

export const useTitleBarTheme = (): Theme => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Check initial theme preference
    const checkTheme = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    };

    // Set initial theme
    checkTheme();

    // Listen for theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    // Add event listener
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return theme;
};
