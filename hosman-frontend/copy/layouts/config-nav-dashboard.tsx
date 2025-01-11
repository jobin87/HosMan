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
    subheader: 'Version 1.0',
    items: [{ title: 'Overview', path: paths.dashboard.root, icon: ICONS.dashboard }],
  },
  /*
   * Management
   */
  {
    subheader: 'Seller Hub',
    items: [
      {
        title: 'Products',
        path: paths.dashboard.product.root,
        icon: ICONS.product,
        children: [
          { title: 'List', path: paths.dashboard.product.list },
          { title: 'Category', path: paths.dashboard.product.category.list },
          { title: 'Brands', path: paths.dashboard.product.brands.list },
          { title: 'Reviews', path: paths.dashboard.product.review.list },
        ],
      },
      {
        title: 'Invoice',
        path: paths.dashboard.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: 'List', path: paths.dashboard.invoice.list },
          { title: 'Create', path: paths.dashboard.invoice.new },
        ],
      },
      {
        title: 'Sellers',
        path: paths.dashboard.sellers.root,
        icon: ICONS.user,
        children: [{ title: 'List', path: paths.dashboard.sellers.list }],
      },
      {
        title: 'File Manager',
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
            title: 'All-Staff',
            path: paths.dashboard.settings.staff.list,
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
