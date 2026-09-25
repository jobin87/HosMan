import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard, RoleBasedGuard } from 'src/guard';
import { LoadingScreen } from 'src/components/loading-screen';
import { DashboardLayout } from 'src/layouts/dashboard/layout';

const RealPrepDashboardPage = lazy(() => import('src/pages/dashboard/realprep-dashboard'));
const TasksPage = lazy(() => import('src/pages/dashboard/tasks-page'));

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
      { element: <RealPrepDashboardPage />, index: true },
      {
        path: 'tasks',
        element: (
          <RoleBasedGuard acceptRoles={['admin']}>
            <TasksPage />
          </RoleBasedGuard>
        ),
      },
    ],
  },
];
