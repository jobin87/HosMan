import { createTheme as muiCreateTheme } from '@mui/material/styles';
import { SettingsState } from 'src/components/settings'; // Your settings type
import { Theme } from '@mui/material/styles'; // MUI Theme type
import { updateComponentsWithSettings, updateCoreWithSettings } from './with-settings/update-theme';

export function createTheme(settings: SettingsState): Theme {
  // Define the base theme
  const baseTheme = {
    colorSchemes: { /* initial color schemes */ },
    customShadows: { /* initial shadows */ },
    // Other base theme values
  };

  // Update the base theme with settings
  const updatedTheme = updateCoreWithSettings(baseTheme, settings);

  // Apply component-level settings and create the final theme
  const finalTheme = muiCreateTheme(updatedTheme, updateComponentsWithSettings(settings));

  return finalTheme;
}
