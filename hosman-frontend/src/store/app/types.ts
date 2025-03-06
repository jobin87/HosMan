import type { basicInitialStateProps } from '../types';

export type SignInParams = {
  email: string;
  password: string;
  deviceId: string;
  clientIP: string;
  

};

export interface InitialStateProps {
  auth: basicInitialStateProps;
  accessToken: string | null;
  userLogged: boolean;
}

export interface UserSessionProps {
  sessionId: string;
  deviceId: string;
  browserName: string;
  browserVersion: string;
  platform: string;
  ipAddress: string;
  location: {
    range: number[];
    country: string;
    region: string;
    eu: string;
    timezone: string;
    city: string;
    ll: number[];
    metro: number;
    area: number;
  };
  userId: string;
}

interface SellerBankProps {
  accountNumber: string;
  bankName: string;
  branchName: string;
  swiftCode: string;
}

interface SellerQuestionsProps {
  key: string;
  label: string;
  answer: string;
}

interface Session {
  sessionId: string;
  deviceId: string;
  browserName: string;
  browserVersion: string;
  platform: string;
  ipAddress: string;
  location?: {
    country: string;
    region: string;
    city: string;
    timezone: string;
  } | null;
}

export interface SellerDetails {
  sellerName: string;
  sellerEmail: string;
  sellerRegNum: string;
  sellerType: string;
  address: string;
  state: string;
  zipcode: string;
  country: string;
  countryCode: string;
  phone: string;
  contactPerson: string;
  images: string;
  sellerActive: boolean;
  approvalStatus: string;
  createdAt: string;
  updatedAt: string;
  referenceId: string;
  sellerUid: string;
  fullPhoneNumber: string;
  id: string;
  sessions: Session;
  generalNotificationsEnabled: boolean | string;
  weeklyUpdatesEnabled: boolean | string;
  sellerNotificationsEnabled: boolean | string;
  kaartxUpdatesEnabled: boolean | string;
  browserNotificationsEnabled: boolean | string;
  logo: string;
  questions: SellerQuestionsProps[];
  bankDetails: SellerBankProps;
  defaultReturnAge: number;
  defaultCancelAge: number;
}

export interface UserRegistrationParams {
  role: string | null;
  userName: string;
  department: string;
  specialization: string;
  userEmail: string;
  password: string;
  userRegNum: string;
  zipCode: string;
  deviceId: string;
}

export interface UserProps {
  id: string;
  userLogged: boolean;
  accessToken: string | null;
  userId: string;
  sellerId: string;
  email: string;
  permissions: string[];
  isSellerSuperAdmin: boolean;
  superAdmin: boolean;
  isSellerApproved: boolean;
  countryCode: string;
  phone: string;
  defaultPassword: boolean;
  fullPhoneNumber: string;
  sellerDetails: SellerDetails;
  permissionId: string;
  newsAndAnnouncementsEnabled: boolean | string;
  weeklyUpdatesEnabled: boolean | string;
  generalNotificationsEnabled: boolean | string;
  sellerNotificationsEnabled: boolean | string;
  kaartxUpdatesEnabled: boolean | string;
  browserNotificationsEnabled: boolean | string;
}

export interface IForgetPassword {
  email: string;
}

export interface IResetPassword {
  token: string;
  password: string;
}

export interface docUrlUpdateProps {
  docName: string;
  docUrl: string;
  docId: string;
  docType: string;
  docSize: string;
  ownerId: string;
}

export interface fileListRequestProps {
  page?: number;
  limit?: number;
  docName?: string;
  docType?: string;
  ownerId: string;
}

export interface ISessionUpdateProps {
  userId: string;
  token: string; 
  deviceId: string;
  role: string;
  ipAddress: string;
  isActive: boolean;
  loginTime: Date;
  logoutTime?: Date | null;
}

export interface IDocumentUpdateProps {
  sellerId?: string;
  id: string;
  comment: string;
  docName: string;
  docSize: string;
  lock: boolean;
  status: string;
}

export const basicUserInitialState = {
  name: '',
  profileImage: '',
  countryCode: '',
  phone: '',
  userId: '',
};
