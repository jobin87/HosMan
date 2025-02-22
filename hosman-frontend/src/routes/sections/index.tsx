import { Navigate, useRoutes } from 'react-router-dom';


import { authRoutes} from './auth';
import { mainRoutes } from './main';
import { CONFIG } from 'src/config-global';
import { dashboardRoutes } from './dashboard';
import { onboardingRoutes } from './onboarding';

// ----------------------------------------------------------------------

export function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={CONFIG.auth.redirectPath} replace />,
    },

    // Auth
    ...authRoutes,

    // Onboarding
    ...onboardingRoutes,

    // Dashboard
    ...dashboardRoutes(),

    // Main
    ...mainRoutes,

    // No match
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
