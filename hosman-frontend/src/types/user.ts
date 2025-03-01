// import { string } from 'zod';
import type { IDateValue, ISocialLink } from './common';
// import type { ISellerDetails } from './seller';

// ----------------------------------------------------------------------

export type IUserTableFilters = {
  name: string;
  role: string[];
  status: string;
};

export type IUserProfileCover = {
  name: string;
  role: string;
  coverUrl: string;
  avatarUrl: string;
};

export type IUserProfile = {
  id: string;
  role: string;
  quote: string;
  email: string;
  school: string;
  country: string;
  company: string;
  totalFollowers: number;
  totalFollowing: number;
  socialLinks: ISocialLink;
};

export type IUserProfileFollower = {
  id: string;
  name: string;
  country: string;
  avatarUrl: string;
};

export type IUserProfileGallery = {
  id: string;
  title: string;
  imageUrl: string;
  postedAt: IDateValue;
};

export type IUserProfileFriend = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
};

export type IUserProfilePost = {
  id: string;
  media: string;
  message: string;
  createdAt: IDateValue;
  personLikes: { name: string; avatarUrl: string }[];
  comments: {
    id: string;
    message: string;
    createdAt: IDateValue;
    author: { id: string; name: string; avatarUrl: string };
  }[];
};

export type IUserCard = {
  id: string;
  name: string;
  role: string;
  coverUrl: string;
  avatarUrl: string;
  totalPosts: number;
  totalFollowers: number;
  totalFollowing: number;
};

export type IUserItem = {
  id: string;
  name: string;
  city: string;
  role: string;
  email: string;
  state: string;
  status: string;
  address: string;
  country: string;
  zipCode: string;
  company: string;
  avatarUrl: string;
  phoneNumber: string;
  isVerified: boolean;
};

export type IUserAccount = {
  city: string;
  email: string;
  state: string;
  about: string;
  address: string;
  zipCode: string;
  isPublic: boolean;
  displayName: string;
  phoneNumber: string;
  country: string | null;
  photoURL: File | string | null;
};

export type IUserAccountBillingHistory = {
  id: string;
  price: number;
  invoiceNumber: string;
  createdAt: IDateValue;
};

export interface IUserSessionProps {
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
  isCurrentSession: false;
};
export type Idoctorslist= {
  doctorName: String


}

export type IUserDetails = {
  id: string;
  userLogged: boolean;
  accessToken: string | null;
  userId: string;
  sellerId: string;
  email: string;
  permissions: string[];
  isStaffSuperAdmin: boolean;
  superAdmin: boolean;
  isUserApproved: boolean;
  countryCode: string;
  phone: string;
  doctorsList: Idoctorslist[];
  defaultPassword: boolean;
  fullPhoneNumber: string;
  userDetails: IUserDetails;
  sessions?: IUserSessionProps[];
  permissionId: string;
  photoURL:string;
  currentProfile: string;
  newsAndAnnouncementsEnabled: boolean;
  weeklyUpdatesEnabled: boolean;
  generalNotificationsEnabled: boolean;
  StaffNotificationsEnabled: boolean;
  HosmanUpdatesEnabled: boolean;
  browserNotificationsEnabled: boolean;
  createdAt: IDateValue;
  updatedAt: IDateValue;
  username: string;
  role:string;
  profileImage: string;
  approvalStatus: string;
};
