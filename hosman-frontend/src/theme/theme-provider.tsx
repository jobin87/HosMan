import type {} from '@mui/lab/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/material/themeCssVarsAugmentation';

import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

import { useSettingsContext } from 'src/components/settings';
import { createTheme } from './create-theme';
import { schemeConfig } from './scheme-config';
import { RTL } from './with-settings/right-to-left';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  // Fetch the settings from the context
  const settings = useSettingsContext();

  // Generate the theme based on the settings
  const theme = createTheme(settings);

  return (
    <CssVarsProvider
      theme={theme}
      defaultMode={schemeConfig.defaultMode} // Default theme mode (light or dark)
      modeStorageKey={schemeConfig.modeStorageKey} // Key to store the theme mode in localStorage
    >
      {/* Apply a global baseline for consistent styling */}
      <CssBaseline />
      
      {/* Apply RTL direction settings if applicable */}
      <RTL direction={settings.direction}>{children}</RTL>
    </CssVarsProvider>
  );
}
