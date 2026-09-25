import type { Breakpoint, SxProps, Theme } from '@mui/material/styles';
import type { NavSectionProps } from 'src/components/nav-section';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { iconButtonClasses } from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';

import { useBoolean } from 'src/hooks/use-boolean';


import { Logo } from 'src/components/logo';

// import { DefaultPasswordChangeModal } from 'src/components/default-password-change-modal';
// import { DefaultPasswordChangeAlert } from 'src/components/default-password-change-modal/default-password-change-alert';

import { useEffect, useState, useMemo } from 'react';
import { useUser } from 'src/hooks/use-user';
import { useRouter } from 'src/routes/hooks';
import { useAppDispatch } from 'src/store';
import { layoutClasses } from '../classes';
import { AccountDrawer } from '../components/account-drawer';
import { MenuButton } from '../components/menu-button';
import { _account } from '../config-nav-account';
import { navData as dashboardNavData, filterNavByRole } from '../config-nav-dashboard';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import { Main } from './main';
import { NavHorizontal } from './nav-horizontal';
import { NavMobile } from './nav-mobile';
import { NavVertical } from './nav-vertical';
import { StyledDivider, useNavColorVars } from './styles';

// ----------------------------------------------------------------------

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  data?: {
    nav?: NavSectionProps['data'];
  };
};

export function DashboardLayout({ sx, children, header, data }: DashboardLayoutProps) {
  const userData = useUser();

  const isDefaultPasswordUpdated = userData?.defaultPassword;

  const [ setDefaultPasswordChangeAlertOpen] =
    useState<boolean>(isDefaultPasswordUpdated);

  const theme = useTheme();

  const mobileNavOpen = useBoolean();

  const router = useRouter();

  const [isNavMini, setIsNavMini] = useState(false);
  const isNavHorizontal = false;
  const isNavVertical = !isNavHorizontal;

  const navColorVars = useNavColorVars(theme);

  const layoutQuery: Breakpoint = 'lg';

  const userRole = userData?.role || 'user';
  const rawNavData = data?.nav ?? dashboardNavData;

  const navData = useMemo(() => {
    return filterNavByRole(rawNavData, userRole);
  }, [rawNavData, userRole]);



  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          disableElevation={isNavVertical}
          slotProps={{
            toolbar: {
              sx: {
                ...(isNavHorizontal && {
                  bgcolor: 'var(--layout-nav-bg)',
                  [`& .${iconButtonClasses.root}`]: {
                    color: 'var(--layout-nav-text-secondary-color)',
                  },
                  [theme.breakpoints.up(layoutQuery)]: {
                    height: 'var(--layout-nav-horizontal-height)',
                  },
                }),
              },
            },
            container: {
              maxWidth: false,
              sx: {
                ...(isNavVertical && { px: { [layoutQuery]: 5 } }),
              },
            },
          }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            bottomArea: isNavHorizontal ? (
              <NavHorizontal
                data={navData}
                layoutQuery={layoutQuery}
                cssVars={navColorVars.section}
              />
            ) : null,
            leftArea: (
              <>
                {/* -- Nav mobile -- */}
                <MenuButton
                  onClick={mobileNavOpen.onTrue}
                  sx={{
                    mr: 1,
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile
                  data={navData}
                  open={mobileNavOpen.value}
                  onClose={mobileNavOpen.onFalse}
                  cssVars={navColorVars.section}
                />
                {/* -- Logo -- */}
                {isNavHorizontal && (
                  <Logo
                    sx={{
                      display: 'none',
                      [theme.breakpoints.up(layoutQuery)]: {
                        display: 'inline-flex',
                      },
                    }}
                  />
                )}
                {/* -- Divider -- */}
                {isNavHorizontal && (
                  <StyledDivider
                    sx={{
                      [theme.breakpoints.up(layoutQuery)]: { display: 'flex' },
                    }}
                  />
                )}
                {/* -- Workspace popover -- */}
                {/* <WorkspacesPopover
                  data={_workspaces}
                  sx={{ color: 'var(--layout-nav-text-primary-color)' }}
                /> */}
              </>
            ),
            rightArea: (
              <Box display="flex" alignItems="center" gap={{ xs: 0, sm: 0.75 }}>
        
                <AccountDrawer data={_account} />
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Sidebar
       *************************************** */
      sidebarSection={
        isNavHorizontal ? null : (
          <NavVertical
            data={navData}
            isNavMini={isNavMini}
            layoutQuery={layoutQuery}
            cssVars={navColorVars.section}
            onToggleNav={() => setIsNavMini((prev) => !prev)}
          />
        )
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        ...navColorVars.layout,
        '--layout-transition-easing': 'linear',
        '--layout-transition-duration': '120ms',
        '--layout-nav-mini-width': '88px',
        '--layout-nav-vertical-width': '300px',
        '--layout-nav-horizontal-height': '64px',
        '--layout-dashboard-content-pt': theme.spacing(3),
        '--layout-dashboard-content-pb': theme.spacing(3),
        '--layout-dashboard-content-px': theme.spacing(3),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            transition: theme.transitions.create(['padding-left'], {
              easing: 'var(--layout-transition-easing)',
              duration: 'var(--layout-transition-duration)',
            }),
            pl: isNavMini ? 'var(--layout-nav-mini-width)' : 'var(--layout-nav-vertical-width)',
          },
        },
        ...sx,
      }}
    >
      {/* {isDefaultPasswordUpdated && (
        <DefaultPasswordChangeAlert action={() => setDefaultPasswordChangeAlertOpen(false)} />
      )} */}
      {/* <DefaultPasswordChangeModal
        open={defaultPasswordChangeAlertOpen}
        onClose={() => setDefaultPasswordChangeAlertOpen(false)}
      /> */}

      <Main isNavHorizontal={isNavHorizontal}>{children}</Main>
    </LayoutSection>
  );
}
