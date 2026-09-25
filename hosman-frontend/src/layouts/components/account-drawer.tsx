import type { IconButtonProps } from '@mui/material/IconButton';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';

import { paths } from 'src/routes/paths';
import { useRouter, usePathname } from 'src/routes/hooks';

import { varAlpha } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { AnimateAvatar } from 'src/components/animate';

import { useUser } from 'src/hooks/use-user';
import { UpgradeBlock } from './nav-upgrade';
import { AccountButton } from './account-button';
import { SignOutButton } from './sign-out-button';

// ----------------------------------------------------------------------

export type AccountDrawerProps = IconButtonProps & {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
};

export function AccountDrawer({ data = [], sx, ...other }: AccountDrawerProps) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const user = useUser();

  const displayName = user?.name || 'User';
  const email = user?.email || '';
  const role = user?.role || 'user';
  const userRegNum = user?.userRegNum || '';
  const isApproved = user?.isApproved !== undefined ? user?.isApproved : true;
  const approvedBy = user?.approvedBy || (role === 'admin' ? 'Super Admin' : 'System Admin');

  const [open, setOpen] = useState(false);

  const handleOpenDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClickItem = useCallback(
    (path: string) => {
      handleCloseDrawer();
      router.push(path);
    },
    [handleCloseDrawer, router]
  );

  const renderAvatar = (
    <AnimateAvatar
      width={96}
      slotProps={{
        avatar: { alt: displayName },
        overlay: {
          border: 2,
          spacing: 3,
          color: `linear-gradient(135deg, ${varAlpha(theme.vars.palette.primary.mainChannel, 0)} 25%, ${theme.vars.palette.primary.main} 100%)`,
        },
      }}
    >
      {displayName?.charAt(0).toUpperCase() || 'U'}
    </AnimateAvatar>
  );

  return (
    <>
      <AccountButton
        onClick={handleOpenDrawer}
        photoURL=""
        displayName={displayName}
        sx={sx}
        {...other}
      />

      <Drawer
        open={open}
        onClose={handleCloseDrawer}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: 340 } }}
      >
        <IconButton
          onClick={handleCloseDrawer}
          sx={{ top: 12, left: 12, zIndex: 9, position: 'absolute' }}
        >
          <Iconify icon="mingcute:close-line" />
        </IconButton>

        <Scrollbar>
          <Stack alignItems="center" sx={{ pt: 7, px: 2.5 }}>
            {renderAvatar}

            <Typography variant="subtitle1" noWrap sx={{ mt: 1.5, fontWeight: 800 }}>
              {displayName}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.25 }} noWrap>
              {email}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
              <Chip
                label={role.toUpperCase()}
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: 10,
                  height: 20,
                  bgcolor: role === 'admin' ? '#f3e8ff' : '#dbeafe',
                  color: role === 'admin' ? '#7c3aed' : '#2563eb',
                }}
              />
              <Chip
                icon={<Iconify icon="solar:check-circle-bold" width={12} />}
                label={isApproved ? 'Approved' : 'Pending'}
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: 10,
                  height: 20,
                  bgcolor: isApproved ? '#dcfce7' : '#ffedd5',
                  color: isApproved ? '#15803d' : '#c2410c',
                }}
              />
            </Stack>

            <Paper
              elevation={0}
              sx={{
                width: '100%',
                p: 2,
                mt: 2,
                bgcolor: '#f8fafc',
                borderRadius: 2.5,
                border: '1px solid #e2e8f0',
                textAlign: 'left',
              }}
            >
              <Stack spacing={1}>
                {userRegNum && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      License/Reg No
                    </Typography>
                    <Typography variant="caption" fontWeight={800} color="text.primary">
                      {userRegNum}
                    </Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    Approved By
                  </Typography>
                  <Typography variant="caption" fontWeight={800} color="text.primary">
                    {approvedBy}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    Account Access
                  </Typography>
                  <Typography variant="caption" fontWeight={800} color="primary.main">
                    {role === 'admin' ? 'System Administrator' : 'Standard User'}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Stack>

          {/* <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" sx={{ p: 3 }}>
            {[...Array(3)].map((_, index) => (
              <Tooltip
                key={_mock.fullName(index + 1)}
                title={`Switch to: ${_mock.fullName(index + 1)}`}
              >
                <Avatar
                  alt={_mock.fullName(index + 1)}
                  src={_mock.image.avatar(index + 1)}
                  onClick={() => {}}
                />
              </Tooltip>
            ))}

            <Tooltip title="Add account">
              <IconButton
                sx={{
                  bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
                  border: `dashed 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.32)}`,
                }}
              >
                <Iconify icon="mingcute:add-line" />
              </IconButton>
            </Tooltip>
          </Stack> */}

          {data.length > 0 && (
            <Stack
              sx={{
                py: 3,
                px: 2.5,
                borderTop: `dashed 1px ${theme.vars.palette.divider}`,
                borderBottom: `dashed 1px ${theme.vars.palette.divider}`,
              }}
            >
              {data.map((option) => {
                const rootLabel = pathname.includes('/dashboard') ? 'Home' : 'Dashboard';
                const rootHref = pathname.includes('/dashboard') ? '/' : paths.dashboard.root;

                return (
                  <MenuItem
                    key={option.label}
                    onClick={() => handleClickItem(option.label === 'Home' ? rootHref : option.href)}
                    sx={{
                      py: 1,
                      color: 'text.secondary',
                      '& svg': { width: 24, height: 24 },
                      '&:hover': { color: 'text.primary' },
                    }}
                  >
                    {option.icon}

                    <Box component="span" sx={{ ml: 2 }}>
                      {option.label === 'Home' ? rootLabel : option.label}
                    </Box>

                    {option.info && (
                      <Label color="error" sx={{ ml: 1 }}>
                        {option.info}
                      </Label>
                    )}
                  </MenuItem>
                );
              })}
            </Stack>
          )}

        </Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <SignOutButton onClose={handleCloseDrawer} />
        </Box>
      </Drawer>
    </>
  );
}
