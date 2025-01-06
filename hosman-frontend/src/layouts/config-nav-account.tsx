import { Iconify } from 'src/components/iconify';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export const _account = [
  {
    label: 'Security',
    href: paths.dashboard.user.account('security'),
    icon: <Iconify icon="solar:shield-keyhole-bold-duotone" />,
  },
  {
    label: 'Account settings',
    href: paths.dashboard.user.account('general'),
    icon: <Iconify icon="solar:settings-bold-duotone" />,
  },
];
