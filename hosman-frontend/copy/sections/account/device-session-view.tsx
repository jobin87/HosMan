import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useUser } from 'src/hooks/use-user';
import {
  API_METHODS,
  ENDPOINT_ADMIN_USER_LOGOUT_ALL_SESSION,
  ENDPOINT_ADMIN_USER_LOGOUT_CURRENT_SESSION,
  ENDPOINT_ADMIN_USER_LOGOUT_SESSION,
  makeNetworkCall,
} from 'src/network';
import { useAppDispatch } from 'src/store';
import { requestSignOut, requestUserDetails } from 'src/store/app/appThunk';

interface Session {
  sessionId: string;
  deviceId: string;
  browserName: string;
  browserVersion: string;
  platform: string;
  ipAddress: string;
  location?: { country: string; region: string; city: string; timezone: string } | null;
}

export function DeviceSessionPage(): React.ReactElement {
  const { sessions } = useUser();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogoutSessionById = async (session: Session) => {
    try {
      setLoading(true);
      const response = await makeNetworkCall({
        method: API_METHODS.DELETE,
        url: `${ENDPOINT_ADMIN_USER_LOGOUT_SESSION}${session.sessionId}`,
      });
      if (response?.data?.data?.loggedOut) {
        toast.success(`Logged out from ${session.browserName}`);
        dispatch(requestUserDetails());
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleLogoutAllDevices = async () => {
    try {
      setLoading(true);
      const response = await makeNetworkCall({
        method: API_METHODS.DELETE,
        url: ENDPOINT_ADMIN_USER_LOGOUT_ALL_SESSION,
      });
      if (response?.data?.data?.loggedOut) {
        dispatch(requestSignOut());
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleLogoutCurrentSession = async () => {
    try {
      setLoading(true);
      const response = await makeNetworkCall({
        method: API_METHODS.DELETE,
        url: ENDPOINT_ADMIN_USER_LOGOUT_CURRENT_SESSION,
      });
      if (response?.data?.data?.loggedOut) {
        dispatch(requestSignOut());
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6">Device Sessions</Typography>
      <List>
        {sessions?.map((session) => (
          <Card sx={{ mb: 2, borderRadius: 1, p: 1 }}>
            <ListItem key={session.sessionId}>
              <ListItemText
                primary={`${session.browserName} ${session?.isCurrentSession && '(Current Session)'}`}
                secondary={`Platform: ${session.platform} | Browser Version: ${session.browserVersion} | IP: ${session.ipAddress} | Location: ${session.location?.timezone ?? 'Unknown'}`}
              />
              {session?.isCurrentSession ? (
                <Tooltip title="This will log you out of the current device.">
                  <LoadingButton
                    variant="soft"
                    color="primary"
                    onClick={() => handleLogoutCurrentSession()}
                    loading={loading}
                    sx={{ marginLeft: '10px' }}
                  >
                    Logout
                  </LoadingButton>
                </Tooltip>
              ) : (
                <Button
                  variant="soft"
                  color="primary"
                  onClick={() => handleLogoutSessionById(session)}
                  disabled={loading}
                  sx={{ marginLeft: '10px' }}
                >
                  Logout
                </Button>
              )}
            </ListItem>
          </Card>
        ))}
      </List>

      {(sessions ?? []).filter((session) => !session?.isCurrentSession).length > 0 && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <LoadingButton
            variant="contained"
            color="error"
            onClick={handleLogoutAllDevices}
            loading={loading}
          >
            Logout from All Devices
          </LoadingButton>
        </Box>
      )}
    </Card>
  );
}
