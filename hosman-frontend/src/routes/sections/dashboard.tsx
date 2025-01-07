import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard, GuestGuard } from 'src/guard';



// All Staff
const AllStaffList = lazy(() => import('src/pages/dashboard/settings/staff/all-staff'));

// Roles
const StaffRolesList = lazy(() => import('src/pages/dashboard/settings/staff/roles'));

import { LoadingScreen } from 'src/components/loading-screen';

import { DashboardLayout } from 'src/layouts/dashboard/layout';

const IndexPage = lazy(() => import('src/pages/dashboard/one'));

const UploadDocuments = lazy(() => import('src/pages/dashboard/upload-documents'));

// ----------------------------------------------------------------------
const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserSecurityPage = lazy(() => import('src/pages/dashboard/user/account-security'));
const DeviceSessionPage = lazy(() => import('src/pages/dashboard/user/device-sessions'));
// const GeneralPage = lazy(() => import('src/pages/dashboard/user/general-account'));
const WelcomePage = lazy(()=>import('src/pages/dashboard/one'))

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
    element: <GuestGuard>{layoutContent}</GuestGuard>,
    children: [
      // { element: <UserAccountPage />, index: true },
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
      {path: 'one', element: <WelcomePage/> },
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
              { element: <AllStaffList />, index: true },
              { path: 'list', element: <AllStaffList /> },
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
