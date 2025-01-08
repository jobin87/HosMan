import { SERVICE_STATUS } from "./service.constants";

export enum uploadFileFolders {
  sellerDocuments = 'seller/{sellerId}/documents/',
  productImages = 'products/images/',
  categoryLogos = 'category/logo/',
  brandLogos = 'brands/logo',
  users = 'users/{userId}/',
  sellerProfileImage = 'seller/{sellerId}/profileImage',
}

export const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

export enum DocTypes {
  CR = 'Commercial_Registration',
  TIN = 'Tax_Identification_Number',
  IdentityProof = 'Identity_Proof',
  BusinessLicense = 'Business_License',
}

export const SELLER_REQUIRED_DOCUMENTS = [
  { label: 'Commercial Registration (CR)', value: DocTypes.CR },
  { label: 'Tax Identification Number (TIN)', value: DocTypes.TIN },
  { label: 'Identity Proof (e.g., Passport, National ID)', value: DocTypes.IdentityProof },
  { label: 'Business License', value: DocTypes.BusinessLicense },
];

export const DOCUMENTS_STATUS = [
  { value: SERVICE_STATUS.ALL, label: 'All' },
  { value: SERVICE_STATUS.PENDING, label: 'Pending' },
  { value: SERVICE_STATUS.UNDERVERIFICATION, label: 'Under Verification' },
  { value: SERVICE_STATUS.DECLINED, label: 'Declined' },
  { value: SERVICE_STATUS.APPROVED, label: 'Approved' },
];
