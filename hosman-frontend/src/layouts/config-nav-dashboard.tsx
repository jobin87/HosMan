import { paths } from "src/routes/paths";
import { CONFIG } from "src/config-global";
import { SvgColor } from "src/components/svg-color";
import { useUser } from "src/hooks/use-user";

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  overview: icon("ic-overview"),
  appointment: icon("ic-appointment"),
  doctor: icon("ic-doctor"),
  patient: icon("ic-patient"),
  treatment: icon("ic-treatment"),
  reports: icon("ic-reports"),
  inventory: icon("ic-inventory"),
  blog: icon("ic-blog"),
  chat: icon("ic-chat"),
  mail: icon("ic-mail"),
  user: icon("ic-user"),
  file: icon("ic-file"),
  lock: icon("ic-lock"),
  tour: icon("ic-tour"),
  order: icon("ic-order"),
  label: icon("ic-label"),
  blank: icon("ic-blank"),
  kanban: icon("ic-kanban"),
  folder: icon("ic-folder"),
  course: icon("ic-course"),
  banking: icon("ic-banking"),
  booking: icon("ic-booking"),
  invoice: icon("ic-invoice"),
  product: icon("ic-product"),
  calendar: icon("ic-calendar"),
  disabled: icon("ic-disabled"),
  external: icon("ic-external"),
  menuItem: icon("ic-menu-item"),
  ecommerce: icon("ic-ecommerce"),
  analytics: icon("ic-analytics"),
  dashboard: icon("ic-dashboard"),
  parameter: icon("ic-parameter"),
};

// Role-based navigation data
export const navData = () => {
  const { role } = useUser();
  const isManager = role.toLowerCase() === "manager"; // Ensure case consistency

  return [
    /**
     * Management (Only for Managers)
     */
    ...(isManager
      ? [
          {
            items: [
              {
                title: "Overview",
                path: paths.dashboard.root,
                icon: ICONS.overview,
              },
            ],
          },
        ]
      : []),

    /**
     * General
     */
    {
      subheader: "General",
      items: [
        {
          title: "Appointment",
          path: isManager? paths.dashboard.Appointment.list: paths.dashboard.root,
          icon: ICONS.appointment,
        },
        {
          title: "Patients",
          path: paths.dashboard.patients.root,
          icon: ICONS.patient,
        },
        {
          title: "Doctors",
          path: paths.dashboard.doctors.root,
          icon: ICONS.doctor,
        },
       
        {
          title: "Treatments",
          path: paths.dashboard.Treatment.root,
          icon: ICONS.treatment,
        },
        ...(isManager
          ? [
              {
                title: "Reports",
                path: paths.dashboard.Reports.root,
                icon: ICONS.reports,
              },
            ]
          : []),
      ],
    },

    /**
     * Settings or Interactions (Depends on Role)
     */
    {
      subheader: isManager ? "Settings" : "Interactions",
      items: [
        {
          title: isManager ? "Staff Management" : "Community",
          path: isManager
            ? paths.dashboard.staff?.staffManagement || "/staff-management"
            : paths.dashboard.patients.general || "/community", // Ensure correct community path
          icon: ICONS.inventory,
        },
      ],
    },
    {
      subheader:  "user-end appointment booking",
      items: [
        {
          title: "appointment-book",
          path: paths.dashboard.Appointment.form, // Ensure correct community path
          icon: ICONS.inventory,
        },
      ],
    },
  ];
};
