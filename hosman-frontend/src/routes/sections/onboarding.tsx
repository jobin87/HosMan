import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AuthGuard } from "src/auth/guard/auth-guard";
import { LoadingScreen } from "src/components/loading-screen";
import { OnBoardingLayout } from "src/layouts/onboarding/layout";
import HomePage from "src/pages/onboarding/onboarding";  // Import directly

const layoutContent = (
  <OnBoardingLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </OnBoardingLayout>
);

export const onboardingRoutes = [
  {
    path: 'onboarding',
    element: <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <HomePage />, index: true }  // Use HomePage component correctly
    ],
  },
];
