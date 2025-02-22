import type { BoxProps } from "@mui/material/Box";

import { useId, forwardRef } from "react";

import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import { RouterLink } from "src/routes/components";

import { logoClasses } from "./classes";

// ----------------------------------------------------------------------

export type LogoProps = BoxProps & {
  href?: string;
  isSingle?: boolean;
  disableLink?: boolean;
};

export const Logo = forwardRef<HTMLDivElement, LogoProps>(
  (
    {
      width,
      href = "/",
      height,
      isSingle = true,
      disableLink = false,
      className,
      sx,
      ...other
    },
    ref
  ) => {
    const theme = useTheme();

    const gradientId = useId();

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
        viewBox="0 0 360 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Text Letters with Proper Spacing */}
        <text x="60" y="180" fontSize="300" fontFamily="Arial" fontWeight="bold" fill={`url(#${gradientId}-3)`}>H</text>
    
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id={`${gradientId}-1`} x1="38" y1="41.9469" x2="16.381" y2="64.906" gradientUnits="userSpaceOnUse">
            <stop stopColor={PRIMARY_DARKER} />
            <stop offset="1" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id={`${gradientId}-2`} x1="21.5" y1="32" x2="21.5" y2="96" gradientUnits="userSpaceOnUse">
            <stop stopColor={PRIMARY_DARKER} />
            <stop offset="1" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id={`${gradientId}-3`} x1="100.5" y1="72" x2="100.5" y2="96" gradientUnits="userSpaceOnUse">
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
        viewBox="0 0 360 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Text Letters with Proper Spacing */}
        <text x="20" y="80" fontSize="70" fontFamily="Arial" fill={`url(#${gradientId}-3)`}>H</text>
        <text x="76" y="80" fontSize="70" fontFamily="Arial" fill={`url(#${gradientId}-3)`}>O</text>
        <text x="131" y="80" fontSize="70" fontFamily="Arial" fill={`url(#${gradientId}-3)`}>S</text>
        <text x="178" y="80" fontSize="70" fontFamily="Arial" fill={`url(#${gradientId}-3)`}>M</text>
        <text x="240" y="80" fontSize="70" fontFamily="Arial" fill={`url(#${gradientId}-3)`}>A</text>
        <text x="290" y="80" fontSize="70" fontFamily="Arial" fill={`url(#${gradientId}-3)`}>N</text>
    
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id={`${gradientId}-1`} x1="38" y1="41.9469" x2="16.381" y2="64.906" gradientUnits="userSpaceOnUse">
            <stop stopColor={PRIMARY_DARKER} />
            <stop offset="1" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id={`${gradientId}-2`} x1="21.5" y1="32" x2="21.5" y2="96" gradientUnits="userSpaceOnUse">
            <stop stopColor={PRIMARY_DARKER} />
            <stop offset="1" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id={`${gradientId}-3`} x1="100.5" y1="72" x2="100.5" y2="96" gradientUnits="userSpaceOnUse">
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
        className={logoClasses.root.concat(className ? ` ${className}` : "")}
        aria-label="Logo"
        sx={{
          ...baseSize,
          flexShrink: 0,
          display: "inline-flex",
          verticalAlign: "middle",
          ...(disableLink && { pointerEvents: "none" }),
          ...sx,
        }}
        {...other}
      >
        {isSingle ? singleLogo : fullLogo}
      </Box>
    );
  }
);
