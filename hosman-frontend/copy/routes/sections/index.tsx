import { Navigate, useRoutes } from 'react-router-dom';

import { CONFIG } from 'src/config-global';

import { Suspense } from 'react';
import { SplashScreen } from 'src/components/loading-screen';
import { DashboardLayout } from 'src/layouts/dashboard';
import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';
import { onboardingRoutes } from './onboarding';

// ----------------------------------------------------------------------

export function Router() {
  return useRoutes([
    {
      path: '/',
      element: (
        <Suspense fallback={<SplashScreen />}>
          <DashboardLayout>
            <Navigate to={CONFIG.auth.redirectPath} replace />
          </DashboardLayout>
        </Suspense>
      ),
    },

    // Auth
    ...authRoutes,

    // Onboarding
    ...onboardingRoutes,

    // Dashboard
    ...dashboardRoutes,

    // Main
    // ...mainRoutes,

    // No match
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
