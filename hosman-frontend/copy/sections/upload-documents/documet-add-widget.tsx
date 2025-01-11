import { Box, Card, CardProps, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { Iconify } from 'src/components/iconify';

import { ColorType } from 'src/theme/core';

// ----------------------------------------------------------------------

type Props = CardProps & {
  icon: string;
  title: string;
  color?: ColorType;
};

export function DocumentAddWidget({ sx, icon, title, color = 'warning', ...other }: Props) {
  const navigate = useNavigate();

  return (
    <Card
      component={'button'}
      // onClick={() => navigate(paths.dashboard.documents.new)}
      sx={{
        py: 4,
        pl: 3,
        pr: 2.5,
        height: 200,
        '&:hover': {
          boxShadow: 6,
        },
        ...sx,
      }}
      {...other}
    >
      <Box
        sx={{
          flexGrow: 1,
          cursor: 'pointer',
        }}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        height={'100%'}
        gap={1}
      >
        <Typography noWrap variant="h6" component="div" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>

        <Iconify sx={{ height: 36, width: 36, color: 'gray' }} icon="mingcute:add-line" />
      </Box>

      {/* <SvgColor
                src={icon}
                sx={{
                    top: 24,
                    left: 20,
                    width: 56,
                    height: 56,
                    position: 'absolute',
                    background: (theme) =>
                        `linear-gradient(135deg, ${theme.vars.palette[color].main} 0%, ${theme.vars.palette[color].light} 80%)`,
                }}
            /> */}
    </Card>
  );
}
