import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import FormControlLabel from '@mui/material/FormControlLabel';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Form } from 'src/components/hook-form';
import { useUser } from 'src/hooks/use-user';
import { useAppDispatch } from 'src/store';
import { requestUserDetails, updateUserNotificationSettings } from 'src/store/app/appThunk';

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

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    browserNotificationsEnabled: data?.browserNotificationsEnabled,
    generalNotificationsEnabled: data?.generalNotificationsEnabled,
    kaartxUpdatesEnabled: data?.kaartxUpdatesEnabled,
    newsAndAnnouncementsEnabled: data?.newsAndAnnouncementsEnabled,
    sellerNotificationsEnabled: data?.sellerNotificationsEnabled,
    weeklyUpdatesEnabled: data?.weeklyUpdatesEnabled,
  };

  const methods = useForm({
    defaultValues: defaultValues,
  });

  const { control, reset, handleSubmit } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [reset]);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const response = await dispatch(updateUserNotificationSettings(data)).unwrap();
      toast.success('Update success!');
      if (response?.notificationsUpdated) {
        dispatch(requestUserDetails());
      }
    } catch (error) {
      toast.error('Error updating notifications');
    } finally {
      setLoading(false);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
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
                    control={control}
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
          disabled={loading}
          loading={loading}
          sx={{ ml: 'auto' }}
        >
          Save Changes
        </LoadingButton>
      </Card>
    </Form>
  );
}
