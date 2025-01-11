import { Box, Card, CardProps, Typography } from '@mui/material';

import { SvgColor } from 'src/components/svg-color';
import { ColorType } from 'src/theme/core';
import { varAlpha } from 'src/theme/styles';

// ----------------------------------------------------------------------

type Props = CardProps & {
  icon: string;
  title: string | any;
  documentType: string;
  color?: ColorType;
  status?: string;
};

export function DocumentWidget({
  sx,
  icon,
  title,
  documentType,
  status,
  color = 'warning',
  ...other
}: Props) {
  return (
    <Card sx={{ py: 4, pl: 3, pr: 2.5, height: 200, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ typography: 'h5' }}>{documentType}</Box>
        <Typography noWrap variant="subtitle2" component="div" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
      </Box>

      <SvgColor
        src={icon}
        sx={{
          top: 24,
          right: 20,
          width: 46,
          height: 56,
          position: 'absolute',
          background: (theme) =>
            `linear-gradient(135deg, ${theme.vars.palette[color].main} 0%, ${theme.vars.palette[color].dark} 100%)`,
        }}
      />

      <Typography display={'flex'} color={'GrayText'} mt={4} fontWeight={500} gap={1}>
        Approval Status :{' '}
        <Typography color={'goldenrod'} fontWeight={600}>
          {status}
        </Typography>
      </Typography>

      <Box
        sx={{
          top: -44,
          width: 200,
          zIndex: -1,
          height: 200,
          right: -104,
          opacity: 0.12,
          borderRadius: 3,
          position: 'absolute',
          transform: 'rotate(40deg)',
          background: (theme) =>
            `linear-gradient(to right, ${theme.vars.palette[color].main} 0%, ${varAlpha(theme.vars.palette[color].mainChannel, 0)} 100%)`,
        }}
      />
    </Card>
  );
}
