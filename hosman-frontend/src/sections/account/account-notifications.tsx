import LoadingButton from '@mui/lab/LoadingButton';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import FormControlLabel from '@mui/material/FormControlLabel';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { Controller, useForm } from 'react-hook-form';
import { Form } from 'src/components/hook-form';
import { useUser } from 'src/hooks/use-user';

type NotificationId =
  | 'generalNotificationsEnabled'
  | 'weeklyUpdatesEnabled'
  | 'sellerNotificationsEnabled'
  | 'kaartxUpdatesEnabled'
  | 'browserNotificationsEnabled'
  | 'newsAndAnnouncementsEnabled';

const NOTIFICATIONS: {
  subheader: string;
  caption: string;
  items: { id: NotificationId; label: string }[];
}[] = [
  {
    subheader: 'General Notifications',
    caption: 'Manage your general notifications.',
    items: [{ id: 'generalNotificationsEnabled', label: ' General notifications' }],
  },
  {
    subheader: 'Weekly Updates',
    caption: 'Receive weekly updates on new features and improvements.',
    items: [{ id: 'weeklyUpdatesEnabled', label: ' Weekly updates' }],
  },
  {
    subheader: 'Seller Notifications',
    caption: 'Notifications specific to your seller activities.',
    items: [{ id: 'sellerNotificationsEnabled', label: 'Seller notifications' }],
  },
  {
    subheader: 'Kaartx Updates',
    caption: 'Stay updated on the latest Kaartx news.',
    items: [{ id: 'kaartxUpdatesEnabled', label: ' Kaartx updates' }],
  },
  {
    subheader: 'Browser Notifications',
    caption: 'Allow notifications to appear in your browser.',
    items: [{ id: 'browserNotificationsEnabled', label: 'Browser notifications' }],
  },
  {
    subheader: 'News & Announcements',
    caption: 'Allow news and announcement updates to appear in your browser.',
    items: [{ id: 'newsAndAnnouncementsEnabled', label: 'News & announcements' }],
  },
];

export function AccountNotifications() {
  const data = useUser();


  const defaultValues = {
    browserNotificationsEnabled: data?.browserNotificationsEnabled,
    generalNotificationsEnabled: data?.generalNotificationsEnabled,
    newsAndAnnouncementsEnabled: data?.newsAndAnnouncementsEnabled,
    weeklyUpdatesEnabled: data?.weeklyUpdatesEnabled,
  };

  const methods = useForm({
    defaultValues: defaultValues,
  });


  return (
    <Form methods={methods} >
      <Card sx={{ p: 3, gap: 3, display: 'flex', flexDirection: 'column' }}>
        {NOTIFICATIONS.map((notification) => (
          <Grid key={notification.subheader} container spacing={3}>
            <Grid xs={12} md={4}>
              <ListItemText
                primary={notification.subheader}
                secondary={notification.caption}
                primaryTypographyProps={{ variant: 'h6', mb: 0.5 }}
                secondaryTypographyProps={{ component: 'span' }}
              />
            </Grid>
            <Grid xs={12} md={8}>
              <Stack spacing={1} sx={{ p: 3, borderRadius: 2, bgcolor: 'background.neutral' }}>
                {notification.items.map((item) => (
                  <Controller
                    key={item.id}
                    name={item.id}
                    render={({ field }) => (
                      <FormControlLabel
                        label={item.label}
                        labelPlacement="start"
                        control={
                          <Switch
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        }
                        sx={{ m: 0, width: 1, justifyContent: 'space-between' }}
                      />
                    )}
                  />
                ))}
              </Stack>
            </Grid>
          </Grid>
        ))}
        <LoadingButton
          type="submit"
          variant="contained"
          sx={{ ml: 'auto' }}
        >
          Save Changes
        </LoadingButton>
      </Card>
    </Form>
  );
}
