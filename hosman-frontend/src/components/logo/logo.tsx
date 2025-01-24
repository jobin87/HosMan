import type { BoxProps } from '@mui/material/Box';

import { useId, forwardRef } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

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
    const theme = useTheme();

    const gradientId = useId();

    const TEXT_PRIMARY = theme.vars.palette.text.primary;
    const PRIMARY_LIGHT = theme.vars.palette.primary.light;
    const PRIMARY_MAIN = theme.vars.palette.primary.main;
    const PRIMARY_DARKER = theme.vars.palette.primary.dark;

    /*
    * OR using local (public folder)
    *
    const singleLogo = (
      <Box
        alt="Single logo"
        component="img"
        src={`${CONFIG.assetsDir}/logo/logo-single.svg`}
        width="100%"
        height="100%"
      />
    );

    const fullLogo = (
      <Box
        alt="Full logo"
        component="img"
        src={`${CONFIG.assetsDir}/logo/logo-full.svg`}
        width="100%"
        height="100%"
      />
    );
    *
    */

    const singleLogo = (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill={`url(#${`${gradientId}-1`})`}
          d="M86.352 246.358C137.511 214.183 161.836 245.017 183.168 285.573C165.515 317.716 153.837 337.331 148.132 344.418C137.373 357.788 125.636 367.911 111.202 373.752C80.856 388.014 43.132 388.681 14 371.048L86.352 246.358Z"
        />
        <path
          fill={`url(#${`${gradientId}-2`})`}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M873654.31 2259.726C398.04 148.77 350.21 72.498 295.267 184.382C287.751 198.766 282.272 226.719 270 226.719V226.577C257.728 226.577 252.251 198.624 244.735 184.24C189.79 72.356 141.96 148.628 95.689 229.584C92.207 235.69 88.862 241.516 86 246.58C192.038 179.453 183.11 382.247 270 383.858V384C356.891 382.389 347.962 179.595 454 246.72C451.139 241.658 447.794 235.832 444.31 229.726Z"
        />
        <path
          fill={`url(#${`${gradientId}-3`})`}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M450 384C476.509 384 498 362.509 498 336C498 309.491 476.509 288 450 288C423.491 288 402 309.491 402 336C402 362.509 423.491 384 450 384Z"
        />
        <path
          fill={`url(#${`${gradientId}-4`})`}
          fillRule="evenodd"
          clipRule="evenodd"
          d="M450 384C476.509 384 498 362.509 498 336C498 309.491 476.509 288 450 288C423.491 288 402 309.491 402 336C402 362.509 423.491 384 450 384Z"
        />
        <defs>
          <linearGradient
            id={`${gradientId}-1`}
            x1="152"
            y1="167.79"
            x2="65.523"
            y2="259.624"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={PRIMARY_DARKER} />
            <stop offset="1" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient
            id={`${gradientId}-2`}
            x1="86"
            y1="128"
            x2="86"
            y2="384"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={PRIMARY_LIGHT} />
            <stop offset="1" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient
            id={`${gradientId}-3`}
            x1="402"
            y1="288"
            x2="402"
            y2="384"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={PRIMARY_LIGHT} />
            <stop offset="6" stopColor={PRIMARY_DARKER} />
          </linearGradient>
          <linearGradient
            id={`${gradientId}-4`}
            x1="402"
            y1="288"
            x2="402"
            y2="384"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={PRIMARY_LIGHT} />
            <stop offset="1" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>
      </svg>
    );

    const fullLogo = (
      <svg
  width="100%"
  height="100%"
  viewBox="0 0 520 120"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill={`url(#${`${gradientId}-1`})`}
    d="M20 90 V10 H40 V50 H60 V10 H80 V90 H60 V60 H40 V90 Z"
  />
  <path
    fill={TEXT_PRIMARY}
    fillRule="evenodd"
    clipRule="evenodd"
    d="M100 90 Q80 90 80 50 Q80 10 100 10 H120 Q140 10 140 50 Q140 90 120 90 H100 Z M100 70 H120 Q130 70 130 50 Q130 30 120 30 H100 Q90 30 90 50 Q90 70 100 70 Z"
  />
  <path
    fill={TEXT_PRIMARY}
    fillRule="evenodd"
    clipRule="evenodd"
    d="M180 90 Q160 90 160 70 H180 Q190 70 190 60 Q190 50 180 50 H170 Q160 50 160 30 Q160 10 180 10 H200 Q220 10 220 30 H200 Q190 30 190 40 Q190 50 200 50 H210 Q220 50 220 70 Q220 90 200 90 H180 Z"
  />
  <path
    fill={TEXT_PRIMARY}
    fillRule="evenodd"
    clipRule="evenodd"
    d="M240 90 V10 H260 L280 50 L300 10 H320 V90 H300 V40 L280 70 L260 40 V90 Z"
  />
  <path
    fill={TEXT_PRIMARY}
    fillRule="evenodd"
    clipRule="evenodd"
    d="M340 90 L370 10 H390 L420 90 H400 L390 60 H370 L360 90 H340 Z M375 50 H385 L380 35 L375 50 Z"  />
  <path
    fill={TEXT_PRIMARY}
    fillRule="evenodd"
    clipRule="evenodd"
    d="M440 90 V10 H460 L500 70 V10 H520 V90 H500 L460 30 V90 Z"
  />
  <defs>
    <linearGradient
      id={`${gradientId}-2`}
      x1="38"
      y1="41.9469"
      x2="16.381"
      y2="64.906"
      gradientUnits="userSpaceOnUse"
    >
      <stop stopColor={PRIMARY_LIGHT} />
      <stop offset="1" stopColor={PRIMARY_DARKER} />
    </linearGradient>
    <linearGradient
      id={`${gradientId}-1`}
      x1="21.5"
      y1="32"
      x2="21.5"
      y2="96"
      gradientUnits="userSpaceOnUse"
    >
      <stop stopColor={PRIMARY_DARKER} />
      <stop offset="1" stopColor={PRIMARY_MAIN} />
    </linearGradient>
    <linearGradient
      id={`${gradientId}-3`}
      x1="100.5"
      y1="72"
      x2="100.5"
      y2="96"
      gradientUnits="userSpaceOnUse"
    >
      <stop stopColor={PRIMARY_LIGHT} />
      <stop offset="1" stopColor={PRIMARY_MAIN} />
    </linearGradient>
  </defs>
</svg>

    );

    const baseSize = {
      width: width ?? 40,
      height: height ?? 40,
      ...(!isSingle && {
        width: width ?? 102,
        height: height ?? 36,
      }),
    };

    return (
      <Box
        ref={ref}
        component={RouterLink}
        href={href}
        className={logoClasses.root.concat(className ? ` ${className}` : '')}
        aria-label="Logo"
        sx={{
          ...baseSize,
          flexShrink: 0,
          display: 'inline-flex',
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
