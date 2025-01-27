// Auth
export const ENDPOINT_ADMIN_LOGIN = '/api/auth/v1/login'; //
export const ENDPOINT_UPDATE_PASSWORD = '/api/admin-auth/v1/update-default-password';
export const ENDPOINT_FORGOT_PASSWORD = '/api/admin-auth/v1/forget-password';
export const ENDPOINT_RESET_PASSWORD = '/api/admin-auth/v1/forget-password-verify';

// Users Service
export const ENDPOINT_ADMIN_USER_DETAILS = '/api/admin-user/v1/user-details/'; // + userId
export const ENDPOINT_ADMIN_USER_LOGOUT_CURRENT_SESSION =
  '/api/auth/v1/logout-current-session';

//appointment 
export const ENDPOINT_ADD_APPOINTMENT = '/api/staff/v1/addappointment'; //
export const ENDPOINT_GET_APPOINTMENT = '/api/staff/v1/getAppointments'; //

//patient
export const ENDPOINT_ADD_PATIENT = '/api/staff/v1/addPatient'; //
export const ENDPOINT_GET_PATIENT = '/api/staff/v1/getPatient'; //


// Doctor Management
export const ENDPOINT_DOCTOR_LIST = '/api/staff/v1/getDoctor'; //
export const ENDPOINT_DOCTOR_ADD = '/api/staff/v1/addDoctor'; //



// /updateTreatmentById/:id
//
export const ENDPOINT_TREATMENT_ADD= '/api/staff/v1/addTreatment'; //
export const  ENDPOINT_TREATMENT_GET= '/api/staff/v1/getTreatment';//
export const  ENDPOINT_TREATMENT_DELETE= '/api/staff/v1/deleteTreatmentById/';//
export const ENDPOINT_TREATMENT_UPDATE = '/api/staff/v1/updateTreatmentById/'


// logout 
export const ENDPOINT_ADMIN_USER_LOGOUT_SESSION = '/api/admin-user/v1/logout-session/'; // + sessionId
export const ENDPOINT_ADMIN_USER_LOGOUT_ALL_SESSION = '/api/admin-user/v1/logout-all-sessions';
export const ENDPOINT_ADMIN_USER_UPDATE_PROFILE = '/api/admin-user/v1/update-profile/'; // + userId
export const ENDPOINT_ADMIN_USER_NOTIFICATION_SETTINGS = '/api/admin-user/v1/notification-settings';
export const ENDPOINT_ADMIN_USER_UPDATE_PASSWORD = '/api/admin-user/v1/update-password';

// Seller Onboarding


export const ENDPOINT_USER_ONBOARDING_REGISTRATION = '/api/auth/v1/registration'; //
export const ENDPOINT_SELLER_ONBOARDING_STATUS = '/api/seller-onboarding/v1/status/'; // + sellerId
export const ENDPOINT_SELLER_ONBOARDING_REGISTRATION_SUBMIT =
  '/api/seller-onboarding/v1/registration-submit';
export const ENDPOINT_SELLER_ONBOARDING_UPDATE_QUESTION =
  '/api/seller-onboarding/v1/update-question';
export const ENDPOINT_SELLER_ONBOARDING_UPDATE_DETAILS = '/api/seller-onboarding/v1/update-details';
export const ENDPOINT_SELLER_ONBOARDING_UPDATE_STORENAME =
  '/api/seller-onboarding/v1/store-name-logo';

// Seller
export const ENDPOINT_SELLERS_DETAILS = '/api/seller/v1/details/'; // + sellerId
export const ENDPOINT_SELLERS_LIST = '/api/seller/v1/list';
export const ENDPOINT_SELLERS_LIST_COUNT = '/api/seller/v1/list-count';
export const ENDPOINT_SELLERS_REGISTRATION_APPROVAL = '/api/seller/v1/registration-approval';
export const ENDPOINT_SELLER_UPDATE_BANK = '/api/seller/v1/bank-details';
export const ENDPOINT_SELLER_UPDATE_ADDRESS = '/api/seller/v1/address';

// Permissions
export const ENDPOINT_PERMISSION_LIST = '/api/permission/v1/permissions-list';
export const ENDPOINT_PERMISSION_CREATE = '/api/permission/v1/create';
export const ENDPOINT_PERMISSION_EDIT = '/api/permission/v1/update/';
export const ENDPOINT_PERMISSION_DELETE = '/api/permission/v1/delete/';
export const ENDPOINT_PERMISSION_DETAILS = '/api/permission/v1/details/';






export const ENDPOINT_STAFF_MANAGEMENT_CREATE = '/api/staff/v1/create';
export const ENDPOINT_STAFF_MANAGEMENT_EDIT = '/api/staff/v1/edit/';
export const ENDPOINT_STAFF_MANAGEMENT_DELETE = '/api/staff/v1/delete/';
export const ENDPOINT_STAFF_MANAGEMENT_DETAILS = '/api/staff/v1/details/';

// Document
export const ENDPOINT_DOCUMENT_LIST = '/api/document/v1/documents-list';
export const ENDPOINT_DOCUMENT_CREATE = '/api/document/v1/create';
export const ENDPOINT_DOCUMENT_UPDATE = '/api/document/v1/update/'; // + id
export const ENDPOINT_DOCUMENT_DETAILS = '/api/document/v1/details/'; // + id
export const ENDPOINT_DOCUMENT_DELETE = '/api/document/v1/delete/'; // + id

// Files
export const ENDPOINT_REQUEST_FILE_UPLOAD = '/api/files/presigned-url';
export const ENDPOINT_UPLOAD_FILE_URL = '/api/document/v1/create';
export const ENDPOINT_GET_FILE_LIST = '/api/document/v1/documents-list';
export const ENDPOINT_GET_SELLER_STATUS = '/api/seller-onboarding/v1/status';

//Device Session

// Products
export const ENDPOINT_PRODUCT_BRAND_LIST = '/api/brands/v1/brand-list';
export const ENDPOINT_PRODUCT_BRAND_CREATE = '/api/brands/v1/create';
export const ENDPOINT_PRODUCT_BRAND_UPDATE = '/api/brands/v1/update/';
export const ENDPOINT_PRODUCT_BRAND_DETAILS = '/api/brands/v1/details/';
export const ENDPOINT_PRODUCT_BRAND_DELETE = '/api/brands/v1/delete/';

export const ENDPOINT_PRODUCT_CATEGORY_CREATE = '/api/categories/v1/create';
export const ENDPOINT_PRODUCT_CATEGORY_UPDATE = '/api/categories/v1/update/';
export const ENDPOINT_PRODUCT_CATEGORY_DETAILS = '/api/categories/v1/details/';
export const ENDPOINT_PRODUCT_CATEGORY_DELETE = '/api/categories/v1/delete/';
export const ENDPOINT_PRODUCT_CATEGORY_LIST = '/api/categories/v1/categories-list';
