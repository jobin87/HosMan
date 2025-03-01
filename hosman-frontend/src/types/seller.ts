// import { IDateValue } from './common';

export type ISellerTableFilters = {
  type: string;
  status: string;
};

// interface ISellerQuestions {
//   key: string;
//   label: string;
//   answer: string;
// }

// interface ISellerBusinessAddress {
//   key: string;
//   label: string;
//   answer: string;
//   street: string;
//   area: string;
//   governorate: string;
//   postalCode: string;
//   country: string;
//   buildingNumber: string;
//   additionalInfo: string;
// }

export type IUserDetails = {
  userName: string;
  userEmail: string;
  userRegNum: string;
  userType: string;
  zipcode: string;
  contactPerson: string;
  images: string[];
  logo: string;
  
};
