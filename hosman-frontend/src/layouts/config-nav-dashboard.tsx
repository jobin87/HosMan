import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

import type { NavSectionProps } from 'src/components/nav-section';

export const navData = [
  {
    subheader: 'Management',
    items: [
      { title: 'Dashboard', path: paths.dashboard.root, icon: ICONS.dashboard, roles: ['admin', 'user'] },
      { title: 'Task Manager', path: paths.dashboard.tasks, icon: ICONS.kanban, roles: ['admin'] },
    ],
  },
];

/**
 * Filter navData by user role dynamically
 */
export function filterNavByRole(data: NavSectionProps['data'], userRole?: string) {
  const role = userRole || 'user';
  return data
    .map((group) => {
      const filteredItems = group.items.filter(
        (item) => !item.roles || item.roles.includes(role)
      );
      return { ...group, items: filteredItems };
    })
    .filter((group) => group.items.length > 0);
}

