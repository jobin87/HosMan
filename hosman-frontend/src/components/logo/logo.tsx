import type { BoxProps } from '@mui/material/Box';

import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { paths } from 'src/routes/paths';
import { useAppSelector } from 'src/store';
import { logoClasses } from './classes';

// ----------------------------------------------------------------------

export type LogoProps = BoxProps & {
  href?: string;
  isSingle?: boolean;
  disableLink?: boolean;
};

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  (
    { width, href = '/', height, isSingle = true, disableLink = false, className, sx, ...other },
    ref
  ) => {
    const { userLogged } = useAppSelector((state) => state.app);

    const singleLogo = (
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 900,
          fontSize: 18,
          boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
          flexShrink: 0,
        }}
      >
        R
      </Box>
    );

    const fullLogo = (
      <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25 }}>
        {singleLogo}
        <Typography
          variant="h6"
          fontWeight={900}
          sx={{
            letterSpacing: '-0.03em',
            color: '#0f172a',
            fontSize: 20,
            lineHeight: 1,
            userSelect: 'none',
          }}
        >
          Result<Box component="span" sx={{ color: '#2563eb' }}>Prep</Box>
        </Typography>
      </Box>
    );

    return (
      <Box
        ref={ref}
        component={RouterLink}
        href={userLogged ? href : paths.auth.signIn}
        className={logoClasses.root.concat(className ? ` ${className}` : '')}
        aria-label="ResultPrep Logo"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          textDecoration: 'none',
          verticalAlign: 'middle',
          ...(disableLink && { pointerEvents: 'none' }),
          ...sx,
        }}
        {...other}
      >
        {isSingle ? singleLogo : fullLogo}
      </Box>
    );
  }
);

