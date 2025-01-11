import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';

import { SellersDetailsGeneral } from '../sellers-details-general';
import { SellersDetailsOnboarding } from '../sellers-details-onborading';

// ----------------------------------------------------------------------

const TABS = [
  { value: 'general', label: 'General', icon: <Iconify icon="solar:user-id-bold" width={24} /> },
  {
    value: 'onboarding',
    label: 'Onboarding',
    icon: <Iconify icon="solar:bill-list-bold" width={24} />,
  },
];

// ----------------------------------------------------------------------

export function SellersDetailsView() {
  const tabs = useTabs('onboarding');

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Seller Details"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Sellers', href: paths.dashboard.sellers.list },
          { name: 'Details' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Tabs value={tabs.value} onChange={tabs.onChange} sx={{ mb: { xs: 3, md: 5 } }}>
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {tabs.value === 'general' && <SellersDetailsGeneral />}

      {tabs.value === 'onboarding' && <SellersDetailsOnboarding />}
    </DashboardContent>
  );
}
