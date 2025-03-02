export interface IPatientParams {
  age: number;
  patientRegId: string;
  patientName: string;
  disease?: string;
  contactNumber:number;
}

// export interface ISellersRegistrationApprovalParams {
//   sellerId: string;
//   isApproved: boolean;
// }

// export interface ISellerOnboardingAddressUpdateParams {
//   pickupAddress: {
//     street: string;
//     area: string;
//     governorate: string;
//     postalCode: string;
//     country: string;
//     buildingNumber: string;
//     additionalInfo: string;
//   };
//   returnAddress: {
//     street: string;
//     area: string;
//     governorate: string;
//     postalCode: string;
//     country: string;
//     buildingNumber: string;
//     additionalInfo: string;
//   };
// }
