import type { Theme } from '@mui/material/styles';

import { extendTheme } from '@mui/material/styles';

import { overridesTheme } from './overrides-theme';

import type { ThemeLocaleComponents } from './types';

// ----------------------------------------------------------------------

export function createTheme(
  localeComponents: ThemeLocaleComponents,
): Theme {
 

  /**
   * 1.Update values from settings before creating theme.
   */

  /**
   * 2.Create theme + add locale + update component with settings.
   */
  const theme = extendTheme(
    localeComponents,
    overridesTheme
  );

  return theme;
}

// ----------------------------------------------------------------------


/**
* createTheme without @settings and @locale components.
*
 ```jsx
export function createTheme(): Theme {
  const initialTheme = {
    colorSchemes,
    shadows: shadows('light'),
    customShadows: customShadows('light'),
    shape: { borderRadius: 8 },
    components,
    typography,
    cssVarPrefix: '',
    shouldSkipGeneratingVar,
  };

  const theme = extendTheme(initialTheme, overridesTheme);

  return theme;
}
 ```
*/
