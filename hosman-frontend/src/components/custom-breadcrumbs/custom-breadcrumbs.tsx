import type { SxProps, Theme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export interface BreadcrumbLinkProps {
  name: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface CustomBreadcrumbsProps {
  heading?: string;
  links: BreadcrumbLinkProps[];
  action?: React.ReactNode;
  activeLast?: boolean;
  sx?: SxProps<Theme>;
}

export function CustomBreadcrumbs({
  heading,
  links,
  action,
  activeLast = false,
  sx,
}: CustomBreadcrumbsProps) {
  return (
    <Box sx={{ mb: { xs: 1.5, sm: 2 }, flexShrink: 0, ...sx }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Box sx={{ flexGrow: 1 }}>
          {/* HEADING TITLE */}
          {heading && (
            <Typography variant="h4" fontWeight={800} color="#0f172a" sx={{ mb: 0.5 }}>
              {heading}
            </Typography>
          )}

          {/* BREADCRUMBS LINKS */}
          {!!links.length && (
            <Breadcrumbs
              separator={
                <Iconify
                  icon="solar:alt-arrow-right-linear"
                  width={14}
                  sx={{ color: '#94a3b8', mx: 0.25 }}
                />
              }
              sx={{
                '& .MuiBreadcrumbs-ol': {
                  flexWrap: 'wrap',
                  alignItems: 'center',
                },
              }}
            >
              {links.map((link, index) => {
                const isLast = index === links.length - 1;

                return (
                  <BreadcrumbItem
                    key={link.name || index}
                    link={link}
                    isLast={isLast}
                    activeLast={activeLast}
                  />
                );
              })}
            </Breadcrumbs>
          )}
        </Box>

        {/* RIGHT ACTION BUTTON */}
        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Stack>
    </Box>
  );
}

// ----------------------------------------------------------------------

type BreadcrumbItemProps = {
  link: BreadcrumbLinkProps;
  isLast: boolean;
  activeLast?: boolean;
};

function BreadcrumbItem({ link, isLast, activeLast }: BreadcrumbItemProps) {
  const { name, href, icon } = link;

  const renderContent = (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.75}
      sx={{
        fontSize: 13,
        fontWeight: isLast ? 700 : 600,
        color: isLast ? '#0f172a' : '#64748b',
        transition: (theme) => theme.transitions.create(['color']),
        ...(!isLast && {
          '&:hover': {
            color: '#2563eb',
          },
        }),
      }}
    >
      {icon && (
        <Box
          component="span"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isLast ? '#2563eb' : '#64748b',
            '& svg': { width: 16, height: 16 },
          }}
        >
          {icon}
        </Box>
      )}
      <span>{name}</span>
    </Stack>
  );

  if (isLast && !activeLast) {
    return <Box component="span">{renderContent}</Box>;
  }

  if (href) {
    return (
      <Link component={RouterLink} href={href} underline="none">
        {renderContent}
      </Link>
    );
  }

  return <Box component="span">{renderContent}</Box>;
}
