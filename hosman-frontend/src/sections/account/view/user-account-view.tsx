import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';

import { useEffect } from 'react';
import { useParams } from 'src/routes/hooks';
import { AccountChangePassword } from '../account-change-password';
import { AccountNotifications } from '../account-notifications';
import { DeviceSessionPage } from '../device-session-view';

// ----------------------------------------------------------------------

const TABS = [
  { value: 'general', label: 'General', icon: <Iconify icon="solar:user-id-bold" width={24} /> },
  {
    value: 'notifications',
    label: 'Notifications',
    icon: <Iconify icon="solar:bell-bing-bold" width={24} />,
  },
  { value: 'security', label: 'Security', icon: <Iconify icon="ic:round-vpn-key" width={24} /> },
  { value: 'devices', label: 'Devices', icon: <Iconify icon="solar:bill-list-bold" width={24} /> },
];

// ----------------------------------------------------------------------

export function AccountView() {
  const params = useParams()?.tab;
  const tabs = useTabs(params ?? 'general');

  useEffect(() => {
    tabs.setValue(params ?? 'general');
  }, [params]);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Account"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.user.profile },
          { name: 'Account' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Tabs value={tabs.value}  sx={{ mb: { xs: 3, md: 5 } }}>
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {/* Display the corresponding content based on the selected tab */}
      {tabs.value === 'security' && <AccountChangePassword />}
      {tabs.value === 'notifications' && <AccountNotifications />}
      {tabs.value === 'devices' && <DeviceSessionPage />}
    </DashboardContent>
  );
}
