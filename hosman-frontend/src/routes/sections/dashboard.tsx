import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import {  AuthGuard} from 'src/guard';



// Roles
const StaffRolesList = lazy(() => import('src/pages/dashboard/settings/staff/roles'));

import { LoadingScreen } from 'src/components/loading-screen';

import { DashboardLayout } from 'src/layouts/dashboard/layout';

const IndexPage = lazy(() => import('src/pages/dashboard/six'));

const UploadDocuments = lazy(() => import('src/pages/dashboard/upload-documents'));

// ----------------------------------------------------------------------
const DoctorListPage = lazy(() => import('src/pages/dashboard/doctors/doctors-list'));
const DoctorFormPage = lazy(() => import('src/sections/doctors/add-doctor'));
const PatientsListPage = lazy(() => import('src/pages/dashboard/patients/patients-list'));
const AppointMentListPage = lazy(() => import('src/pages/dashboard/appointment/appointment-user-list'));
const TreatmentListPage = lazy(() => import('src/pages/dashboard/treatment/treatment'));
const DepartmentDetails = lazy(() => import('src/sections/appointment/appointment-department'));
const FormDetails = lazy(() => import('src/pages/dashboard/appointment/form'));


const ReportPage = lazy(() => import('src/pages/dashboard/reports/reports'));





const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserSecurityPage = lazy(() => import('src/pages/dashboard/user/account-security'));
const DeviceSessionPage = lazy(() => import('src/pages/dashboard/user/device-sessions'));
// const GeneralPage = lazy(() => import('src/pages/dashboard/user/general-account'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <AppointMentListPage/>, index: true },
      {
        path: 'Appointment',
        children: [
          { path: 'department/:id', element: <DepartmentDetails/> },
          { path: 'doctor-form', element: <FormDetails/> },

        ],
      },
      {
        path: 'patients',
        children: [
          { element: <PatientsListPage/>, index: true },
          { path: 'Patients-profile', element: <UserProfilePage /> },
        ],
      },
      {
        path: 'doctor',
        children: [
          { element: <DoctorListPage/>, index: true },
          { path: 'doctor-form', element: <DoctorFormPage/> },

        ],
      },
      
      
      {
        path: 'treatment',
        children: [
          { element: <TreatmentListPage/>, index: true },
          { path: 'Patients-profile', element: <UserProfilePage /> },
        ],
      },
      {
        path: 'report',
        children: [
          { element: <ReportPage/>, index: true },
          { path: 'Patients-profile', element: <UserProfilePage /> },
        ],
      },
      {
        path: 'user',
        children: [
          { element: <UserAccountPage />, index: true },
          { path: 'account/:tab', element: <UserAccountPage /> },
          { path: 'profile', element: <UserProfilePage /> },
          { path: 'security', element: <UserSecurityPage /> },
          { path: 'device', element: <DeviceSessionPage /> },
          // { path: 'general', element: <GeneralPage /> },
        ],
      },
      {
        path: 'documents',
        children: [
          { element: <UploadDocuments />, index: true },
          { path: 'list', element: <UploadDocuments /> },
        ],
      },
      {
        path: 'settings',
        children: [
          { element: <IndexPage />, index: true },
          {
            path: 'staff',
            children: [
            ],
          },
          {
            path: 'roles',
            children: [
              { element: <StaffRolesList />, index: true },
              { path: 'list', element: <StaffRolesList /> },
            ],
          },
        ],
      },
    ],
  },
];
