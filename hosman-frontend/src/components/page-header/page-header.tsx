import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { SxProps, Theme } from '@mui/material/styles';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  badgeCount?: number | string;
  badgeLabel?: string;
  action?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export function PageHeader({
  title,
  subtitle,
  badgeCount,
  badgeLabel,
  action,
  breadcrumbs,
  sx,
}: PageHeaderProps) {
  const displayBadge = badgeLabel || (badgeCount !== undefined ? `${badgeCount} Total` : null);

  return (
    <Box sx={{ mb: { xs: 2.5, sm: 3.5 }, flexShrink: 0, ...sx }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: subtitle ? 0.75 : 0 }}
      >
        {/* Left Title & Breadcrumbs */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" fontWeight={800} color="#0f172a">
            {title}
          </Typography>

          {breadcrumbs && <Box sx={{ mt: 0.5 }}>{breadcrumbs}</Box>}
        </Box>

        {/* Right Top Action Button (Always top-right on Mobile & Desktop) */}
        {action && (
          <Box sx={{ flexShrink: 0 }}>
            {action}
          </Box>
        )}
      </Stack>

      {/* Subtitle Description */}
      {subtitle && (
        <Typography variant="body2" color="#64748b" fontWeight={500} sx={{ mt: 0.75 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
