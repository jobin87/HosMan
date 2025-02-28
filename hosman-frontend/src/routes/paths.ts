// ----------------------------------------------------------------------

const MOCK_ID: string = 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2';

// const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  ONBOARDING: '/onboarding',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  components: '/components',

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
    doctors: {
      root: `${ROOTS.DASHBOARD}/doctors`,
    },

    patients: {
      root: `${ROOTS.DASHBOARD}/patients`,
      patientForm: `${ROOTS.DASHBOARD}/patients/patient-Form`,
      security: `${ROOTS.DASHBOARD}/user/security`,
      general: `${ROOTS.DASHBOARD}/user/general`,
    },
    Appointment: {
      list:`${ROOTS.DASHBOARD}/appointment/appointmentList`,
      department: `${ROOTS.DASHBOARD}/appointment/department/:id`,
      form: `${ROOTS.DASHBOARD}/appointment/appointment-form`,

      
    
    },
    Treatment: {
      root: `${ROOTS.DASHBOARD}/treatment`,
      newTreatMents: `${ROOTS.DASHBOARD}/treatment/add-treatments`,
      edit: `${ROOTS.DASHBOARD}/treatment/edit-treatments`,
      general: `${ROOTS.DASHBOARD}/user/general`,
    },
    Reports: {
      root: `${ROOTS.DASHBOARD}/report`,
      newReports: `${ROOTS.DASHBOARD}/report/add-report`,
      details: `${ROOTS.DASHBOARD}/report/report-details/:id`,
      edit: `${ROOTS.DASHBOARD}/report/report-edit`,
    },

    Roles:{
      root:`${ROOTS.DASHBOARD}/staff-management`,
      roomAndCategory:`${ROOTS.DASHBOARD}/rooms-and-category`
    },

    staff:{
      root:`${ROOTS.DASHBOARD}/user`,
       addStaff:`${ROOTS.DASHBOARD}/staff/add-staff`,
       staffManagement:`${ROOTS.DASHBOARD}/staff/staff-management`,
       staffDetails: `${ROOTS.DASHBOARD}/staff/staff-details/:id`,


    },

    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      account: (tab: string) => `${ROOTS.DASHBOARD}/user/account/${tab}`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      security: `${ROOTS.DASHBOARD}/user/security`,
      general: `${ROOTS.DASHBOARD}/user/general`,
    },

    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      list: `${ROOTS.DASHBOARD}/product/list`,
      new: `${ROOTS.DASHBOARD}/product/new`,
      productReview: `${ROOTS.DASHBOARD}/product/productReview`,

    //   category: {
    //     list: `${ROOTS.DASHBOARD}/product/category`,
    //     subcategory: (id: string, row?: any) => `${ROOTS.DASHBOARD}/product/category/list/${id}`,
    //     create: (id?: string, row?: any) => `${ROOTS.DASHBOARD}/product/category/create/${id}`,
    //     edit: (id: string, row?: any) => `${ROOTS.DASHBOARD}/product/category/${id}/edit`,
    //   },

      brands: {
        list: `${ROOTS.DASHBOARD}/product/brands`,
        create: `${ROOTS.DASHBOARD}/product/brands/create`,
        edit: (id: string) => `${ROOTS.DASHBOARD}/product/brands/edit/${id}`,
      },
      review: {
        list: `${ROOTS.DASHBOARD}/product/review`,
        count: `${ROOTS.DASHBOARD}/product/review/count/:id`,
      },

      edit: (id: string) => `${ROOTS.DASHBOARD}/product/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/product/${MOCK_ID}/edit`,
      },
    },

    invoice: {
      root: `${ROOTS.DASHBOARD}/invoice`,
      list: `${ROOTS.DASHBOARD}/invoice/list`,
      new: `${ROOTS.DASHBOARD}/invoice/new`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/invoice/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}/edit`,
      },
    },
    sellers: {
      root: `${ROOTS.DASHBOARD}/sellers`,
      list: `${ROOTS.DASHBOARD}/sellers/list`,
      details: (id: string) => `${ROOTS.DASHBOARD}/sellers/${id}/details`,
    },
    fileManager: {
      root: `${ROOTS.DASHBOARD}/fileManager`,
      list: `${ROOTS.DASHBOARD}/fileManager/list`,
    },
    settings: {
      root: `${ROOTS.DASHBOARD}/settings`,
      staff: {
        root: `${ROOTS.DASHBOARD}/settings/staff`,
        list: `${ROOTS.DASHBOARD}/settings/staff/list`, // ALL STAFF LISTING
        create: `${ROOTS.DASHBOARD}/settings/staff/create`,
        edit: (id: string) => `${ROOTS.DASHBOARD}/settings/staff/${id}/edit`,

      },
      roles: {
        root: `${ROOTS.DASHBOARD}/settings/roles`,
        list: `${ROOTS.DASHBOARD}/settings/roles/list`,
        create: `${ROOTS.DASHBOARD}/settings/roles/create`,
        edit: (id: string) => `${ROOTS.DASHBOARD}/settings/roles/${id}/edit`,
      },
      account: `${ROOTS.DASHBOARD}/account`,
    },
  },
};
