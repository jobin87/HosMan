import type { SettingsState } from 'src/components/settings';
import type { Theme, Components } from '@mui/material/styles';

import COLORS from '../core/colors.json';
import PRIMARY_COLOR from './primary-color.json';
import { components as coreComponents } from '../core/components';
import { hexToRgbChannel, createPaletteChannel } from '../styles';
import { primary as corePrimary, grey as coreGreyPalette } from '../core/palette';
import { createShadowColor, customShadows as coreCustomShadows } from '../core/custom-shadows';

import type { ThemeComponents, ThemeUpdateOptions } from '../types';

const PRIMARY_COLORS = {
  default: COLORS.primary,
  cyan: PRIMARY_COLOR.cyan,
  purple: PRIMARY_COLOR.purple,
  blue: PRIMARY_COLOR.blue,
  orange: PRIMARY_COLOR.orange,
  red: PRIMARY_COLOR.red,
};

/**
 * Update the core theme with settings like primaryColor and contrast
 */
export function updateCoreWithSettings(
  theme: ThemeUpdateOptions,
  settings: SettingsState
): ThemeUpdateOptions {
  const { colorSchemes, customShadows } = theme;

  // Update primary color based on the setting
  const updatedPrimary = getPalette(
    settings.primaryColor,
    corePrimary,
    PRIMARY_COLORS[settings.primaryColor]
  );

  return {
    ...theme,
    colorSchemes: {
      ...colorSchemes,
      light: {
        palette: {
          ...colorSchemes?.light?.palette,
          primary: updatedPrimary,
          background: {
            ...colorSchemes?.light?.palette?.background,
            default: getBackgroundDefault(settings.contrast),
            defaultChannel: hexToRgbChannel(getBackgroundDefault(settings.contrast)),
          },
        },
      },
      dark: {
        palette: {
          ...colorSchemes?.dark?.palette,
          primary: updatedPrimary,
        },
      },
    },
    customShadows: {
      ...customShadows,
      primary:
        settings.primaryColor === 'default'
          ? coreCustomShadows().primary
          : createShadowColor(Number(updatedPrimary.mainChannel)),
    },
  };
}

/**
 * Update component-level overrides based on settings
 */
export function updateComponentsWithSettings(settings: SettingsState) {
  const components: ThemeComponents = {};

  if (settings.contrast === 'high') {
    const MuiCard: Components<Theme>['MuiCard'] = {
      styleOverrides: {
        root: ({ theme, ownerState }) => {
          let rootStyles = {};
          if (typeof coreComponents?.MuiCard?.styleOverrides?.root === 'function') {
            rootStyles = coreComponents.MuiCard.styleOverrides.root({ ownerState, theme }) ?? {};
          }

          return {
            ...rootStyles,
            boxShadow: theme.customShadows.z1,
          };
        },
      },
    };

    components.MuiCard = MuiCard;
  }

  return { components };
}

function getPalette(
  name: SettingsState['primaryColor'],
  initialPalette: typeof corePrimary,
  updatedPalette: typeof corePrimary
) {
  return name === 'default' ? initialPalette : createPaletteChannel(updatedPalette);
}

function getBackgroundDefault(contrast: SettingsState['contrast']) {
  return contrast === 'default' ? '#FFFFFF' : coreGreyPalette[200];
}
