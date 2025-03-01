import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthCenteredLayout } from 'src/layouts/auth-centered';
import { AuthSplitLayout } from 'src/layouts/auth-split';

import { SplashScreen } from 'src/components/loading-screen';

const SignInPage = lazy(() => import('src/pages/auth/sign-in'));
const SignUpPage = lazy(() => import('src/pages/auth/sign-up'));
// const ForgotPassword = lazy(() => import('src/pages/auth/forgot-password'));
// const ResetPassword = lazy(() => import('src/pages/auth/reset-password'));

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
            <AuthCenteredLayout>
              <SignInPage />
            </AuthCenteredLayout>
        ),
      },
      {
        path: 'sign-up',
        element: (
            <AuthSplitLayout
              section={{
                title: 'Welcome to HosMan... For  yours!',
                subtitle: 'Your gateway to a seamless and successful health consideration journey',
              }}
            >
              <SignUpPage />
            </AuthSplitLayout>
        ),
      },
      // {
      //   path: 'forgot-password',
      //   element: (
      //     <AuthGuard>
      //       <AuthSplitLayout>
      //         <ForgotPassword />
      //       </AuthSplitLayout>
      //     </AuthGuard>
      //   ),
      // },
      // {
      //   path: 'reset-password',
      //   element: (
      //     <GuestGuard>
      //       <AuthSplitLayout>
      //         <ResetPassword />
      //       </AuthSplitLayout>
      //     </GuestGuard>
      //   ),
      // },
    ],
  },
];
