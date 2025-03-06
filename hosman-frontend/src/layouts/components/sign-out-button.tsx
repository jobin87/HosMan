import type { ButtonProps } from '@mui/material/Button';
import type { SxProps, Theme } from '@mui/material/styles';

import Button from '@mui/material/Button';
import { useCallback } from 'react';

import { Iconify } from 'src/components/iconify';
import {
  API_METHODS,
  ENDPOINT_ADMIN_USER_LOGOUT_CURRENT_SESSION,
  makeNetworkCall,
} from 'src/network';
import { useAppDispatch } from 'src/store';
import { requestSignOut } from 'src/store/app/appThunk';

type Props = ButtonProps & {
  sx?: SxProps<Theme>;
  label?: string;
  fullWidth?: boolean;
  color?: string;
  onClose?: () => void;
};

export function SignOutButton({
  onClose,
  label = 'Logout',
  fullWidth = true,
  color = 'error',
  ...other
}: Props) {
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(async () => {
    sessionStorage.removeItem("welcomeMessageShown");
    localStorage.clear();
    try {
      const response = await makeNetworkCall({
        method: API_METHODS.DELETE,
        url: ENDPOINT_ADMIN_USER_LOGOUT_CURRENT_SESSION,
      });
      console.log(response)
      if (response?.data?.loggedOut) {
        console.log("1")
        dispatch(requestSignOut(onClose));
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, onClose]);

  return (
    <Button
      fullWidth={fullWidth}
      variant={'contained'}
      size="large"
      color={color}
      onClick={handleLogout}
      {...other}
      startIcon={<Iconify icon="solar:logout-2-outline" />}
    >
      {label}
    </Button>
  );
}
