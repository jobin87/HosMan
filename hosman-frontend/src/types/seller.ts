import { IDateValue } from './common';

export type ISellerTableFilters = {
  type: string;
  status: string;
};

interface ISellerQuestions {
  key: string;
  label: string;
  answer: string;
}

interface ISellerBusinessAddress {
  key: string;
  label: string;
  answer: string;
  street: string;
  area: string;
  governorate: string;
  postalCode: string;
  country: string;
  buildingNumber: string;
  additionalInfo: string;
}

export type ISellerDetails = {
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
  images: string[];
  logo: string;
  referenceId: string;
  sellerUid: string;
  questions: ISellerQuestions[];
  approvalStatus: string;
  sellerActive: boolean;
  fullPhoneNumber: string;
  bankDetails: {
    accountNumber: string;
    bankName: string;
    branchName: string;
    swiftCode: string;
    iban: string;
    id: string;
  };
  defaultReturnAge: number;
  defaultCancelAge: number;
  createdAt: IDateValue;
  updatedAt: IDateValue;
  id: string;
  pickupAddress: ISellerBusinessAddress;
  returnAddress: ISellerBusinessAddress;
  lockDetails: boolean;
  storeName: string;
  isSellerApproved: boolean;
  __v: number;
  defaultPassword: boolean;
};
