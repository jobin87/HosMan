export const USERS_CONFIG = {
  serviceName: 'users',
  endpoints: {
    getMe: 'me',
    getAll: '',
    deleteUser: ':id',
    approveUser: ':id/approve',
  },
  summary: {
    getMe: 'Get logged in user profile',
    getAll: 'Get all registered users (Admin only)',
    deleteUser: 'Delete user account by ID (Admin only)',
    approveUser: 'Approve or unapprove user registration request (Admin only)',
  },
};
