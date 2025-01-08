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

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [{ title: 'Hospital-Info', path: paths.dashboard.root, icon: ICONS.dashboard }],
  },
  /*
   * Management
   */
  {
    subheader: 'diagnosis-data',
    items: [
      {
        title: 'patients',
        path: paths.dashboard.product.root,
        icon: ICONS.product,
        children: [
          { title: 'patients-list', path: paths.dashboard.product.list },
          { title: 'Add-patient', path: paths.dashboard.product.list },

        ],
      },
      {
        title: 'Appointment',
        path: paths.dashboard.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: 'office-consoltation', path: paths.dashboard.invoice.list },
          { title: 'online-Consultation', path: paths.dashboard.invoice.new },
        ],
      },
      {
        title: 'treatments',
        path: paths.dashboard.sellers.root,
        icon: ICONS.user,
        children: [{ title: 'doctors List', path: paths.dashboard.sellers.list }],
      },
      {
        title: 'Hospital files',
        path: paths.dashboard.fileManager.root,
        icon: ICONS.folder,
        children: [{ title: 'List', path: paths.dashboard.fileManager.list }],
      },
     
    ],
  },
  {
    subheader: 'Settings',
    items: [
      {
        title: 'Staff Management',
        path: paths.dashboard.settings.root,
        icon: ICONS.kanban,
        children: [
          {
            title: 'Doctors',
            path: paths.dashboard.settings.staff.list,
          },
          {
            title: 'All-Staff',
            path: paths.dashboard.settings.staff.list,
          },
          {
            title: 'Rounds-management',
            path: paths.dashboard.fileManager.root,
            children: [{ title: 'List', path: paths.dashboard.fileManager.list }],
          },
          {
            title: 'Roles',
            path: paths.dashboard.settings.roles.list,
          },
        ],
      },
      {
        title: 'Account',
        path: paths.dashboard.settings.account,
      },
    ],
  },
];
