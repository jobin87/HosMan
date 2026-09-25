// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  ONBOARDING: '/onboarding',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',

  // AUTH
  auth: {
    signIn: `${ROOTS.AUTH}/sign-in`,
    signUp: `${ROOTS.AUTH}/sign-up`,
    forgotPassword: `${ROOTS.AUTH}/forgot-password`,
    resetPassword: `${ROOTS.AUTH}/reset-password`,
  },

  // ONBOARDING
  onboarding: {
    root: ROOTS.ONBOARDING,
    form: `${ROOTS.ONBOARDING}/form`,
  },

  // DASHBOARD
  dashboard: {
    root: `${ROOTS.DASHBOARD}`,
    tasks: `${ROOTS.DASHBOARD}/tasks`,
  },
};

