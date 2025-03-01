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
import { useUser } from 'src/hooks/use-user';



export function DeviceSessionPage(): React.ReactElement {
  const { sessions } = useUser();
  const loading= false;

 
  

  
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
                    variant="text"
                    color="primary"
                    loading={loading}
                    sx={{ marginLeft: '10px' }}
                  >
                    Logout
                  </LoadingButton>
                </Tooltip>
              ) : (
                <Button
                  variant="text"
                  color="primary"
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
            loading={loading}
          >
            Logout from All Devices
          </LoadingButton>
        </Box>
      )}
    </Card>
  );
}
