import type { Components, Theme } from '@mui/material/styles';

import COLORS from '../core/colors.json';
import { components as coreComponents } from '../core/components';
import { customShadows as coreCustomShadows, createShadowColor } from '../core/custom-shadows';
import { grey as coreGreyPalette, primary as corePrimary } from '../core/palette';
import { createPaletteChannel, hexToRgbChannel } from '../styles';
import PRIMARY_COLOR from './primary-color.json';

import type { ThemeComponents, ThemeUpdateOptions } from '../types';

// ----------------------------------------------------------------------

type SettingsOptions = {
  primaryColor?: 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red';
  contrast?: 'default' | 'hight';
};

const PRIMARY_COLORS = {
  default: COLORS.primary,
  cyan: PRIMARY_COLOR.cyan,
  purple: PRIMARY_COLOR.purple,
  blue: PRIMARY_COLOR.blue,
  orange: PRIMARY_COLOR.orange,
  red: PRIMARY_COLOR.red,
};

// ----------------------------------------------------------------------

/**
 * [1] settings @primaryColor
 * [2] settings @contrast
 */

export function updateCoreWithSettings(
  theme: ThemeUpdateOptions,
  settings: SettingsOptions = {}
): ThemeUpdateOptions {
  const { colorSchemes, customShadows } = theme;
  const primaryColor = settings.primaryColor || 'default';
  const contrast = settings.contrast || 'default';

  const updatedPrimary = getPalette(
    primaryColor,
    corePrimary,
    PRIMARY_COLORS[primaryColor]
  );

  const lightPalette = typeof colorSchemes?.light === 'object' ? (colorSchemes.light as any).palette : {};
  const darkPalette = typeof colorSchemes?.dark === 'object' ? (colorSchemes.dark as any).palette : {};

  return {
    ...theme,
    colorSchemes: {
      ...colorSchemes,
      light: {
        palette: {
          ...lightPalette,
          /** [1] */
          primary: updatedPrimary,
          /** [2] */
          background: {
            ...lightPalette?.background,
            default: getBackgroundDefault(contrast),
            defaultChannel: hexToRgbChannel(getBackgroundDefault(contrast)),
          },
        },
      },
      dark: {
        palette: {
          ...darkPalette,
          /** [1] */
          primary: updatedPrimary,
        },
      },
    },
    customShadows: {
      ...customShadows,
      /** [1] */
      primary:
        primaryColor === 'default'
          ? coreCustomShadows('light').primary
          : createShadowColor(updatedPrimary.mainChannel),
    },
  };
}

// ----------------------------------------------------------------------

export function updateComponentsWithSettings(settings: SettingsOptions = {}) {
  const components: ThemeComponents = {};

  /** [2] */
  if (settings.contrast === 'hight') {
    const MuiCard: Components<Theme>['MuiCard'] = {
      styleOverrides: {
        root: ({ theme, ownerState }) => {
          let rootStyles = {};
          if (typeof coreComponents?.MuiCard?.styleOverrides?.root === 'function') {
            rootStyles =
              coreComponents.MuiCard.styleOverrides.root({
                ownerState,
                theme,
              }) ?? {};
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

// ----------------------------------------------------------------------

function getPalette(
  name: SettingsOptions['primaryColor'] = 'default',
  initialPalette: typeof corePrimary,
  updatedPalette: typeof corePrimary
) {
  /** [1] */
  return name === 'default' ? initialPalette : createPaletteChannel(updatedPalette);
}

function getBackgroundDefault(contrast: SettingsOptions['contrast'] = 'default') {
  /** [2] */
  return contrast === 'default' ? '#FFFFFF' : coreGreyPalette[200];
}
