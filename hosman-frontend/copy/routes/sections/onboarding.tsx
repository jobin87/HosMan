import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingScreen } from 'src/components/loading-screen';
import { AuthGuard } from 'src/guard';
import { AuthCenteredLayout } from 'src/layouts/auth-centered';

// ----------------------------------------------------------------------

const SellerOnboardingStatus = lazy(() => import('src/pages/onboarding/seller-onboarding-status'));

const SellerOnboarding = lazy(() => import('src/pages/onboarding/seller-onboarding'));

// ----------------------------------------------------------------------

const layoutContent = (
  <AuthCenteredLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </AuthCenteredLayout>
);

export const onboardingRoutes = [
  {
    path: 'onboarding',
    element: <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <SellerOnboardingStatus />, index: true },
      {
        path: 'form',
        element: <SellerOnboarding />,
      },
    ],
  },
];
