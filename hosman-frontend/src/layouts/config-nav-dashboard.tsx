import { paths } from 'src/routes/paths';
import { CONFIG } from 'src/config-global';
import { SvgColor } from 'src/components/svg-color';

// Assuming the user role is available in a context or state
const userRole = 'manager'; // Example, this would be dynamic based on the logged-in user

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

// Role-based navigation data
export const navData = [
  /**
   * Management
   */
  {
    subheader: 'diagnosis-data',
    items: [
      {
        title: 'Appointment',
        path: paths.dashboard.root,
      },
      // Conditionally show Doctors based on the role
      ...(userRole === 'manager' ? [
        {
          title: 'Doctors',
          path: paths.dashboard.doctors.root,
        }
      ] : []),
      {
        title: 'patients',
        path: paths.dashboard.patients.root,
      },
      {
        title: 'treatments',
        path: paths.dashboard.Treatment.root,
      },
      {
        title: 'Reports',
        path: paths.dashboard.Reports.root,
      },
    ],
  },
  {
    subheader: 'Settings',
    items: [
      {
        title: 'Staff Management',
        path: paths.dashboard.settings.root,
      },
      {
        title: 'Hospital-files',
        path: paths.dashboard.settings.staff.list,
      },
      {
        title: 'Inventory',
        path: paths.dashboard.settings.staff.list,
      },
    ],
  },
];
