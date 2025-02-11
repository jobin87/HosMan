import type { IconButtonProps } from '@mui/material/IconButton';

import { m } from 'framer-motion';

import Badge from '@mui/material/Badge';
import SvgIcon from '@mui/material/SvgIcon';
import IconButton from '@mui/material/IconButton';

import { useSettingsContext } from 'src/components/settings/context';

// ----------------------------------------------------------------------

export type SettingsButtonProps = IconButtonProps;

export function SettingsButton({ sx, ...other }: SettingsButtonProps) {
  const settings = useSettingsContext();

  return (
    <IconButton
      aria-label="settings"
      onClick={settings.onToggleDrawer}
      sx={{ p: 0, width: 40, height: 40, ...sx }}
      {...other}
    >
      <Badge color="error" variant="dot" invisible={!settings.canReset}>
        
      </Badge>
    </IconButton>
  );
}
