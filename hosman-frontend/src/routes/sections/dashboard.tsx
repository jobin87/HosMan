import { lazy, Suspense, useMemo } from 'react';
import { Outlet } from 'react-router-dom';

import {  AuthGuard} from 'src/guard';



// Roles
// const StaffRolesList = lazy(() => import('src/pages/dashboard/settings/staff/roles'));

import { LoadingScreen } from 'src/components/loading-screen';

import { DashboardLayout } from 'src/layouts/dashboard/layout';
import { AddpatientsData } from 'src/sections/patients/addpatients';
import { AddTreatmentData } from 'src/sections/treatment/add-treatment';
import { EditTreatmentData } from 'src/sections/treatment/edit-treatment';
import ReportEditForm from 'src/sections/reports/edit-report';
import ReportFormPage from 'src/sections/reports/report-form';
import ReportDetailsPage from 'src/sections/reports/report-details';
import { StaffRegistrationForm } from 'src/sections/roomsAndStaff/add-staff';
import StaffManagement from 'src/sections/allStaff-Management/view/staff-view-page';
import { useUser } from 'src/hooks/use-user';
import { Doctors } from 'src/sections/doctors/view/doctors';
import StaffDetailsPage from 'src/sections/allStaff-Management/staff-details';

const IndexPage = lazy(() => import('src/pages/home'));

// ----------------------------------------------------------------------
const PatientsListPage = lazy(() => import('src/pages/dashboard/patients/patients-list'));
const AppointMentListPage = lazy(() => import('src/pages/dashboard/appointment/appointment-user-list'));
const TreatmentListPage = lazy(() => import('src/pages/dashboard/treatment/treatment'));
const DepartmentDetails = lazy(() => import('src/sections/appointment/appointment-department'));
const FormDetails = lazy(() => import('src/pages/dashboard/appointment/form'));


const ReportPage = lazy(() => import('src/pages/dashboard/reports/reports'));

// const GeneralPage = lazy(() => import('src/pages/dashboard/user/general-account'));

// ----------------------------------------------------------------------

// Layout wrapper with a loading fallback
const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

// Component to determine routes based on role
const DashboardRoutesWrapper = () => {
  const { role } = useUser();
  const isManager = role?.toLowerCase() === 'manager';

  // Memoize routes to avoid unnecessary recalculations
  const routes = useMemo(() => {
    return [
      {
        path: 'dashboard',
        element: <AuthGuard>{layoutContent}</AuthGuard>,
        children: [
          { element: isManager ? <IndexPage /> : <AppointMentListPage />, index: true }, // Dynamic default page
          {
            path: 'appointment',
            children: [
              { path: 'appointmentList', element: <AppointMentListPage /> },
              { path: 'department/:id', element: <DepartmentDetails /> },
              { path: 'appointment-form', element: <FormDetails /> },
            ],
          },
          {
            path: 'doctors',
            children: [
              { element: <Doctors/>, index: true },

            ],
          },
          {
            path: 'patients',
            children: [
              { element: <PatientsListPage />, index: true },
              { path: 'patient-form', element: <AddpatientsData /> },
            ],
          },
          {
            path: 'treatment',
            children: [
              { element: <TreatmentListPage />, index: true },
              { path: 'add-treatments', element: <AddTreatmentData /> },
              { path: 'edit-treatments', element: <EditTreatmentData /> },
            ],
          },
          {
            path: 'report',
            children: [
              { element: <ReportPage />, index: true },
              { path: 'add-report', element: <ReportFormPage /> },
              { path: 'report-details/:id', element: <ReportDetailsPage /> },
              { path: 'report-edit', element: <ReportEditForm /> },
            ],
          },
          {
            path: 'staff',
            children: [
              { path: 'add-staff', element: <StaffRegistrationForm /> },
              { path: 'staff-management', element: <StaffManagement /> },
              { path: 'staff-details/:id', element: <StaffDetailsPage /> },

            ],
          },
        ],
      },
    ];
  }, [isManager]);

  return routes;
};

// Export routes function
export const dashboardRoutes = DashboardRoutesWrapper;
