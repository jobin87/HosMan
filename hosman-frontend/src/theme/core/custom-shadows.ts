import { varAlpha } from '../styles';
import { common, error, primary, secondary, info, success, warning } from './palette';

import type { ThemeColorScheme } from '../types';

// ----------------------------------------------------------------------

export interface CustomShadows {
  z1?: string;
  z4?: string;
  z8?: string;
  z12?: string;
  z16?: string;
  z20?: string;
  z24?: string;
  primary?: string;
  secondary?: string;
  info?: string;
  success?: string;
  warning?: string;
  error?: string;
  card?: string;
  dialog?: string;
  dropdown?: string;
}

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: CustomShadows;
  }
  interface ThemeOptions {
    customShadows?: CustomShadows;
  }
  interface ThemeVars {
    customShadows: CustomShadows;
  }
}

// ----------------------------------------------------------------------

export function createShadowColor(alpha: number = 0.24) {
  return `0 8px 16px 0 ${varAlpha(common.blackChannel, alpha)}`;
}

export function customShadows() {
  const blackChannel = common.blackChannel;

  return {
    z1: `0 2px 4px 0 ${varAlpha(blackChannel, 0.12)}`,
    z4: `0 4px 8px 0 ${varAlpha(blackChannel, 0.16)}`,
    z8: `0 8px 16px 0 ${varAlpha(blackChannel, 0.2)}`,
    z12: `0 12px 24px -4px ${varAlpha(blackChannel, 0.24)}`,
    z16: `0 16px 32px -4px ${varAlpha(blackChannel, 0.28)}`,
    z20: `0 20px 40px -4px ${varAlpha(blackChannel, 0.32)}`,
    z24: `0 24px 48px 0 ${varAlpha(blackChannel, 0.36)}`,
    //
    dialog: `0 40px 80px -8px ${varAlpha(blackChannel, 0.24)}`,
    card: `0 0 12px 0 ${varAlpha(blackChannel, 0.2)}, 0 12px 24px -4px ${varAlpha(blackChannel, 0.12)}`,
    dropdown: `0 0 16px 0 ${varAlpha(blackChannel, 0.24)}, -20px 20px 40px -4px ${varAlpha(blackChannel, 0.24)}`,
    //
    primary: createShadowColor(0.24),
    secondary: createShadowColor(0.18),
    info: createShadowColor(0.22),
    success: createShadowColor(0.26),
    warning: createShadowColor(0.3),
    error: createShadowColor(0.32),
  };
}
