import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { GuestGuard } from 'src/guard';
import { AuthCenteredLayout } from 'src/layouts/auth-centered';
import { AuthSplitLayout } from 'src/layouts/auth-split';

import { SplashScreen } from 'src/components/loading-screen';

const SignInPage = lazy(() => import('src/pages/auth/sign-in'));
const SignUpPage = lazy(() => import('src/pages/auth/sign-up'));
const ForgotPassword = lazy(() => import('src/pages/auth/forgot-password'));
const ResetPassword = lazy(() => import('src/pages/auth/reset-password'));

export const authRoutes = [
  {
    path: 'auth',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: 'sign-in',
        element: (
          <GuestGuard>
            <AuthCenteredLayout>
              <SignInPage />
            </AuthCenteredLayout>
          </GuestGuard>
        ),
      },
      {
        path: 'sign-up',
        element: (
          <GuestGuard>
            <AuthSplitLayout
              section={{
                title: 'Welcome to Kaartx Seller Hub!',
                subtitle: 'Your gateway to a seamless and successful selling experience',
              }}
            >
              <SignUpPage />
            </AuthSplitLayout>
          </GuestGuard>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <GuestGuard>
            <AuthSplitLayout>
              <ForgotPassword />
            </AuthSplitLayout>
          </GuestGuard>
        ),
      },
      {
        path: 'reset-password',
        element: (
          <GuestGuard>
            <AuthSplitLayout>
              <ResetPassword />
            </AuthSplitLayout>
          </GuestGuard>
        ),
      },
    ],
  },
];
