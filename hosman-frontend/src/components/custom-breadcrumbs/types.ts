import type { BoxProps } from '@mui/material/Box';
import type { BreadcrumbsProps } from '@mui/material/Breadcrumbs';
import type { SxProps, Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type BreadcrumbsLinkProps = {
  name?: string;
  href?: string;
  icon?: React.ReactElement;
};

export type CustomBreadcrumbsProps = BoxProps &
  BreadcrumbsProps & {
    heading?: string;
    moreLink?: string[];
    activeLast?: boolean;
    action?: React.ReactNode;
    links: BreadcrumbsLinkProps[];
    slotProps?: {
      action: SxProps<Theme>;
      heading: SxProps<Theme>;
      moreLink: SxProps<Theme>;
      breadcrumbs: SxProps<Theme>;
    };
  };
