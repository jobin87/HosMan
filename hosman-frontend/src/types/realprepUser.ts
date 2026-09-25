export type UserRole = 'admin' | 'user';

export interface IRealPrepUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  userRegNum?: string;
  isApproved?: boolean;
  approvedBy?: string;
  createdAt?: string;
}

export interface IAuthResponse {
  token: string;
  user: IRealPrepUser;
}
