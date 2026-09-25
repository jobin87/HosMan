import type {} from '@mui/lab/themeAugmentation';
import type {} from '@mui/material/themeCssVarsAugmentation';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-date-pickers/themeAugmentation';
// import type {} from '@mui/x-tree-view/themeAugmentation';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as CssVarsProvider } from '@mui/material/styles';

import { createTheme } from './create-theme';
import { schemeConfig } from './scheme-config';
import { RTL } from './with-settings/right-to-left';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const theme = createTheme();

  return (
    <CssVarsProvider
      theme={theme}
      defaultMode={schemeConfig.defaultMode}
      modeStorageKey={schemeConfig.modeStorageKey}
    >
      <CssBaseline />
      <RTL direction="ltr">{children}</RTL>
    </CssVarsProvider>
  );
}
