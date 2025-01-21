import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AuthGuard } from "src/auth/guard/auth-guard";
import { LoadingScreen } from "src/components/loading-screen";
import { OnBoardingLayout } from "src/layouts/onboarding/layout";

const HomePage = lazy(()=>import('src/pages/onboarding/onboarding'))

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
        { element: <HomePage />, index: true }
      ],
    },
  ];
  